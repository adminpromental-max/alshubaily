"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { MapPin, Search, X } from "lucide-react";
import {
  PROJECTS,
  REGIONS,
  getRegionClusters,
  type Project,
  type RegionId,
} from "@/data/projects";
import { useLang } from "@/contexts/lang-context";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapBottomSheet } from "./MapBottomSheet";
import dynamic from "next/dynamic";

const MapProjectCard3D = dynamic(
  () => import("./MapProjectCard3D").then((m) => m.MapProjectCard3D),
  { ssr: false },
);

const MAP_SRC = "/assets/map.png";
const MAP_DEFAULT = { w: 2000, h: 1111 };
const MAX_ZOOM_RATIO = 4.2;
const ZOOM_STEP_RATIO = 0.1;
const MOBILE_BREAKPOINT = 1024;
const MOBILE_COVER_OVERSCAN = 1.08;

type MapMode = "overview" | "region" | "project";
type Transform = { x: number; y: number; scale: number };

function clampTransform(
  t: Transform,
  vw: number,
  vh: number,
  iw: number,
  ih: number,
): Transform {
  const scaledW = iw * t.scale;
  const scaledH = ih * t.scale;
  let x = t.x;
  let y = t.y;

  if (scaledW <= vw) x = (vw - scaledW) / 2;
  else x = Math.min(0, Math.max(vw - scaledW, x));

  if (scaledH <= vh) y = (vh - scaledH) / 2;
  else y = Math.min(0, Math.max(vh - scaledH, y));

  return { x, y, scale: t.scale };
}

export function InteractiveMap() {
  const { t, lang } = useLang();
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const imgSizeRef = useRef(MAP_DEFAULT);
  const baseScaleRef = useRef(1);
  const transformRef = useRef<Transform>({ x: 0, y: 0, scale: 1 });
  const panStartRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(
    null,
  );

  const [ready, setReady] = useState(false);
  const [imgSize, setImgSize] = useState(MAP_DEFAULT);
  const [filter, setFilter] = useState<RegionId>("all");
  const [mapMode, setMapMode] = useState<MapMode>("overview");
  const [activeRegion, setActiveRegion] = useState<Exclude<RegionId, "all"> | null>(
    null,
  );
  const [activeId, setActiveId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const clusters = getRegionClusters();

  const searchFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list =
      filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.region === filter);
    if (!q) return list;
    return list.filter(
      (p) =>
        p.nameAr.includes(search.trim()) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.regionAr.includes(search.trim()) ||
        p.regionEn.toLowerCase().includes(q),
    );
  }, [filter, search]);

  const visibleMarkers = useMemo(() => {
    if (mapMode === "overview" && filter === "all" && !search.trim()) {
      return [] as Project[];
    }
    return searchFiltered;
  }, [filter, mapMode, search, searchFiltered]);

  const activeProject = activeId ? PROJECTS.find((p) => p.id === activeId) : null;
  const regionProjects = activeRegion
    ? searchFiltered.filter((p) => p.region === activeRegion)
    : [];

  const sheetOpen = Boolean(activeProject);
  const regionSheetOpen = Boolean(
    mapMode === "region" && activeRegion && !activeId,
  );

  const applyTransform = useCallback((animate = false) => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;

    const { w, h } = imgSizeRef.current;
    const clamped = clampTransform(
      transformRef.current,
      viewport.clientWidth,
      viewport.clientHeight,
      w,
      h,
    );
    transformRef.current = clamped;

    if (animate) {
      gsap.to(canvas, {
        x: clamped.x,
        y: clamped.y,
        scale: clamped.scale,
        duration: 0.75,
        ease: "power3.inOut",
        transformOrigin: "0 0",
      });
    } else {
      gsap.set(canvas, {
        x: clamped.x,
        y: clamped.y,
        scale: clamped.scale,
        transformOrigin: "0 0",
      });
    }
  }, []);

  const fitMap = useCallback(
    (animate = false) => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      const { w, h } = imgSizeRef.current;
      if (vw < 10 || vh < 10 || !w || !h) return;

      const isMobile = vw < MOBILE_BREAKPOINT;
      const nextBase = isMobile
        ? Math.max(vw / w, vh / h) * MOBILE_COVER_OVERSCAN
        : Math.min(vw / w, vh / h);
      baseScaleRef.current = nextBase;
      transformRef.current = {
        x: (vw - w * nextBase) / 2,
        y: (vh - h * nextBase) / 2,
        scale: nextBase,
      };
      applyTransform(animate);
      setReady(true);
    },
    [applyTransform],
  );

  const zoomToPoint = useCallback(
    (
      px: number,
      py: number,
      scaleMultiplier: number,
      animate = true,
      sheetOffset = 0,
    ) => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const { w, h } = imgSizeRef.current;
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      const targetScale = Math.min(
        baseScaleRef.current * scaleMultiplier,
        baseScaleRef.current * MAX_ZOOM_RATIO,
      );

      const mapX = (px / 100) * w;
      const mapY = (py / 100) * h;
      const focusY = vh / 2 - sheetOffset;

      transformRef.current = {
        scale: targetScale,
        x: vw / 2 - mapX * targetScale,
        y: focusY - mapY * targetScale,
      };
      applyTransform(animate);
    },
    [applyTransform],
  );

  const getSheetOffset = () => {
    if (typeof window === "undefined") return 0;
    return window.innerWidth < 1024
      ? (viewportRef.current?.clientHeight ?? 0) * 0.2
      : 0;
  };

  const handleImageLoad = () => {
    const img = imgRef.current;
    if (img?.naturalWidth) {
      const next = { w: img.naturalWidth, h: img.naturalHeight };
      imgSizeRef.current = next;
      setImgSize(next);
      fitMap(false);
    }
  };

  useLayoutEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth) {
      const next = {
        w: imgRef.current.naturalWidth,
        h: imgRef.current.naturalHeight,
      };
      imgSizeRef.current = next;
      setImgSize(next);
    }
    fitMap(false);
  }, [fitMap]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => fitMap(false));
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [fitMap]);

  const zoomFromCenter = (delta: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const min = baseScaleRef.current;
    const max = baseScaleRef.current * MAX_ZOOM_RATIO;
    const next = Math.min(max, Math.max(min, transformRef.current.scale + delta));
    if (next === transformRef.current.scale) return;

    const cx = viewport.clientWidth / 2;
    const cy = viewport.clientHeight / 2;
    const ratio = next / transformRef.current.scale;

    transformRef.current = {
      scale: next,
      x: cx - (cx - transformRef.current.x) * ratio,
      y: cy - (cy - transformRef.current.y) * ratio,
    };
    applyTransform(true);
  };

  const resetMap = () => {
    setActiveId(null);
    setActiveRegion(null);
    setMapMode("overview");
    setFilter("all");
    setSearch("");
    fitMap(true);
  };

  const selectRegion = (regionId: Exclude<RegionId, "all">) => {
    const cluster = clusters.find((c) => c.id === regionId);
    if (!cluster) return;

    setActiveRegion(regionId);
    setActiveId(null);
    setMapMode("region");
    setFilter(regionId);
    zoomToPoint(cluster.x, cluster.y, 2.4, true, getSheetOffset() * 0.5);
  };

  const selectProject = (project: Project) => {
    setActiveId(project.id);
    setActiveRegion(project.region);
    setMapMode("project");
    setFilter(project.region);
    zoomToPoint(project.x, project.y, 3.5, true, getSheetOffset());
  };

  const closeProject = () => {
    setActiveId(null);
    setMapMode("region");
    if (activeRegion) {
      const cluster = clusters.find((c) => c.id === activeRegion);
      if (cluster) zoomToPoint(cluster.x, cluster.y, 2.4, true, getSheetOffset() * 0.5);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const { w, h } = imgSizeRef.current;
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    const scaledW = w * transformRef.current.scale;
    const scaledH = h * transformRef.current.scale;
    const canPan = scaledW > vw + 2 || scaledH > vh + 2;

    if (!canPan && transformRef.current.scale <= baseScaleRef.current + 0.001) {
      return;
    }

    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      tx: transformRef.current.x,
      ty: transformRef.current.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const start = panStartRef.current;
    if (!start) return;
    transformRef.current = {
      ...transformRef.current,
      x: start.tx + (e.clientX - start.x),
      y: start.ty + (e.clientY - start.y),
    };
    applyTransform(false);
  };

  const onPointerUp = () => {
    panStartRef.current = null;
  };

  return (
    <section id="map" className="relative bg-[#FAFAF8] py-12 md:py-20">
      <div className="mx-auto mb-8 max-w-[1600px] px-4 md:px-6">
        <p className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
          {t("استكشف", "Explore")}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[#1A1612] md:text-5xl">
          {t("خريطة المشاريع", "Projects Map")}
        </h2>
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-4 md:px-6">
        <div
          className={cn(
            "relative w-full transition-opacity duration-300",
            "max-lg:h-[min(82vh,760px)] max-lg:min-h-[580px]",
            "lg:h-[min(82vh,780px)] lg:min-h-[520px]",
            ready ? "opacity-100" : "opacity-40",
          )}
        >
          <div
            ref={viewportRef}
            className="map-viewport relative h-full w-full overflow-hidden rounded-[1.25rem] border border-[#E0D3C2]/60 bg-[#EDE8E0] shadow-[0_24px_80px_rgba(26,22,18,0.12)] md:rounded-[1.75rem]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* Floating search + filters (Coldwell style) */}
            <div className="map-float-controls pointer-events-none absolute inset-x-0 top-0 z-40 px-3 pt-3 md:px-4 md:pt-4">
              <div className="pointer-events-auto mx-auto max-w-3xl space-y-2">
                <label className="map-search-bar">
                  <Search className="h-4 w-4 shrink-0 text-[#8A8175]" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t(
                      "ابحثي بالمنطقة أو اسم المشروع",
                      "Search by area or project name",
                    )}
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#1A1612] outline-none placeholder:text-[#8A8175]"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="text-[#8A8175]"
                      aria-label="Clear"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </label>

                <div className="map-filter-scroll flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {REGIONS.map((region) => (
                    <button
                      key={region.id}
                      type="button"
                      onClick={() => {
                        if (region.id === "all") resetMap();
                        else selectRegion(region.id);
                      }}
                      className={cn(
                        "map-filter-chip shrink-0",
                        filter === region.id && "is-active",
                      )}
                    >
                      {lang === "ar" ? region.nameAr : region.nameEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              ref={canvasRef}
              className={cn(
                "absolute top-0 left-0 touch-none will-change-transform",
                !ready && "invisible",
              )}
              style={{ width: imgSize.w, height: imgSize.h }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={MAP_SRC}
                alt="AlShubaily Projects Map"
                width={MAP_DEFAULT.w}
                height={MAP_DEFAULT.h}
                onLoad={handleImageLoad}
                draggable={false}
                className="block h-auto w-full max-w-none select-none"
              />

              <div className="absolute inset-0">
                {mapMode === "overview" &&
                  filter === "all" &&
                  !search.trim() &&
                  clusters.map((cluster) => (
                    <button
                      key={cluster.id}
                      type="button"
                      onClick={() => selectRegion(cluster.id)}
                      className="map-cluster-premium absolute -translate-x-1/2 -translate-y-full"
                      style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}
                    >
                      <span className="map-cluster-label">
                        {lang === "ar" ? cluster.nameAr : cluster.nameEn}
                      </span>
                      <span className="map-cluster-badge">{cluster.count}</span>
                    </button>
                  ))}

                {(mapMode !== "overview" || search.trim()) &&
                  visibleMarkers.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      aria-label={lang === "ar" ? project.nameAr : project.nameEn}
                      onClick={() => selectProject(project)}
                      className={cn(
                        "map-pin-premium group absolute -translate-x-1/2 -translate-y-full",
                        activeId === project.id && "is-active",
                        activeId && activeId !== project.id && "is-dimmed",
                      )}
                      style={{ left: `${project.x}%`, top: `${project.y}%` }}
                    >
                      <span
                        className={cn(
                          "map-pin-label",
                          activeId === project.id && "is-visible",
                        )}
                      >
                        {lang === "ar" ? project.nameAr : project.nameEn}
                      </span>
                      <span
                        className="map-pin-dot"
                        style={{ ["--pin-color" as string]: project.color }}
                      >
                        <Image
                          src="/assets/Alshubaily-logo.png"
                          alt=""
                          width={22}
                          height={22}
                          className="h-5 w-5 object-contain"
                          unoptimized
                        />
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Desktop side panel */}
            {activeProject && (
              <aside className="map-desktop-panel hidden lg:block">
                <ProjectCardContent
                  project={activeProject}
                  lang={lang}
                  t={t}
                  onClose={closeProject}
                  onRegionList={() => {
                    setActiveId(null);
                    setMapMode("region");
                  }}
                />
              </aside>
            )}

            {regionSheetOpen && (
              <aside className="map-desktop-panel hidden lg:block">
                <RegionListContent
                  regionProjects={regionProjects}
                  activeRegion={activeRegion!}
                  lang={lang}
                  t={t}
                  onSelect={selectProject}
                  onReset={resetMap}
                />
              </aside>
            )}

            {/* Zoom controls */}
            <div className="map-zoom-stack absolute end-3 bottom-3 z-30 md:end-4 md:bottom-4">
              <button
                type="button"
                className="map-zoom-pill"
                onClick={() => zoomFromCenter(baseScaleRef.current * ZOOM_STEP_RATIO)}
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                className="map-zoom-pill"
                onClick={() => zoomFromCenter(-baseScaleRef.current * ZOOM_STEP_RATIO)}
                aria-label="Zoom out"
              >
                −
              </button>
            </div>
          </div>

            {/* Mobile bottom sheets — slide up without covering full map */}
            <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden lg:hidden">
              <MapBottomSheet open={sheetOpen} onClose={closeProject}>
                {activeProject && (
                  <ProjectCardContent
                    project={activeProject}
                    lang={lang}
                    t={t}
                    onClose={closeProject}
                    onRegionList={() => {
                      setActiveId(null);
                      setMapMode("region");
                    }}
                    compact
                  />
                )}
              </MapBottomSheet>

              <MapBottomSheet
                open={regionSheetOpen}
                onClose={resetMap}
                maxHeight="min(40vh, 360px)"
              >
                {activeRegion && (
                  <RegionListContent
                    regionProjects={regionProjects}
                    activeRegion={activeRegion}
                    lang={lang}
                    t={t}
                    onSelect={selectProject}
                    onReset={resetMap}
                    compact
                  />
                )}
              </MapBottomSheet>
            </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCardContent({
  project,
  lang,
  t,
  onClose,
  onRegionList,
  compact = false,
}: {
  project: Project;
  lang: string;
  t: (ar: string, en: string) => string;
  onClose: () => void;
  onRegionList: () => void;
  compact?: boolean;
}) {
  return (
    <div className={cn("map-sheet-content", compact && "map-sheet-content--compact")}>
      {compact && (
        <MapProjectCard3D
          image={project.heroImage}
          active
          className="relative mb-3 h-36 overflow-hidden rounded-2xl border border-[#E0D3C2]/70 bg-[#1A1612]/5"
        />
      )}

      <div className="flex items-start gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#E0D3C2]/80 bg-white shadow-sm">
          <Image
            src={project.heroImage}
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-[#1A1612] md:text-lg">
                {lang === "ar" ? project.nameAr : project.nameEn}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#8A8175]">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {lang === "ar" ? project.regionAr : project.regionEn}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="map-sheet-close"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-xs font-medium text-[#C9A962]">
            {lang === "ar" ? project.typeAr : project.typeEn}
          </p>
        </div>
      </div>

      {!compact && (
        <p className="mt-3 text-sm leading-7 text-[#5C5348]">
          {lang === "ar" ? project.descriptionAr : project.descriptionEn}
        </p>
      )}

      {compact && (
        <div className="mt-4 border-t border-[#E0D3C2]/60 pt-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-[#8A8175]">
              {t("المشاريع المتاحة", "Available Properties")}
            </p>
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-semibold text-[#2563EB]"
            >
              {t("عرض المشروع", "View Project")}
            </Link>
          </div>
          <p className="mt-2 text-xs text-[#8A8175]/80">
            {t(
              "اضغطي للاطلاع على تفاصيل المشروع الكاملة",
              "Tap to explore full project details",
            )}
          </p>
        </div>
      )}

      <div className={cn("flex gap-2", compact ? "mt-4" : "mt-4")}>
        <Link
          href={`/projects/${project.slug}`}
          className={cn(
            buttonVariants({ size: "default" }),
            "flex-1 rounded-full bg-[#1A1612] text-white hover:bg-[#2A241E]",
          )}
        >
          {t("عرض المشروع", "View Project")}
        </Link>
        <button
          type="button"
          onClick={onRegionList}
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            "rounded-full border-[#E0D3C2] px-4",
          )}
        >
          {t("المنطقة", "Region")}
        </button>
      </div>
    </div>
  );
}

function RegionListContent({
  regionProjects,
  activeRegion,
  lang,
  t,
  onSelect,
  onReset,
  compact = false,
}: {
  regionProjects: Project[];
  activeRegion: Exclude<RegionId, "all">;
  lang: string;
  t: (ar: string, en: string) => string;
  onSelect: (p: Project) => void;
  onReset: () => void;
  compact?: boolean;
}) {
  const region = REGIONS.find((r) => r.id === activeRegion);

  return (
    <div className={cn("map-sheet-content", compact && "map-sheet-content--compact")}>
      <p className="text-[10px] tracking-[0.25em] text-[#9A7B3A] uppercase">
        {t("مواقع المنطقة", "Region Sites")}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-[#1A1612]">
        {lang === "ar" ? region?.nameAr : region?.nameEn}
      </h3>
      <p className="mt-1 text-xs text-[#8A8175]">
        {regionProjects.length} {t("مشروع", "projects")}
      </p>
      <ul className="mt-3 max-h-40 space-y-2 overflow-y-auto">
        {regionProjects.map((project) => (
          <li key={project.slug}>
            <button
              type="button"
              onClick={() => onSelect(project)}
              className="flex w-full items-center gap-3 rounded-xl border border-[#E0D3C2]/70 bg-[#FAFAF8] p-2.5 text-start transition active:scale-[0.98] hover:border-[#C9A962]/50"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: project.color }}
              >
                {String(project.id).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-[#1A1612]">
                {lang === "ar" ? project.nameAr : project.nameEn}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onReset}
        className="mt-3 text-xs text-[#9A7B3A]"
      >
        ← {t("العودة للخريطة الكاملة", "Back to full map")}
      </button>
    </div>
  );
}

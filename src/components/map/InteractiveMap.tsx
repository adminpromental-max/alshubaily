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
const MAX_ZOOM_RATIO = 3.6;
const ZOOM_STEP_RATIO = 0.1;
const MOBILE_BREAKPOINT = 1024;
const MOBILE_COVER_OVERSCAN = 1.08;
const PROJECT_ZOOM = 2.5;
const REGION_ZOOM = 2.0;

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
  const panStartRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  const [ready, setReady] = useState(false);
  const [imgSize, setImgSize] = useState(MAP_DEFAULT);
  const [filter, setFilter] = useState<RegionId>("all");
  const [mapMode, setMapMode] = useState<MapMode>("overview");
  const [activeRegion, setActiveRegion] = useState<Exclude<RegionId, "all"> | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const clusters = getRegionClusters();

  const searchFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.region === filter);
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
    if (mapMode === "overview" && filter === "all" && !search.trim()) return [] as Project[];
    return searchFiltered;
  }, [filter, mapMode, search, searchFiltered]);

  const activeProject = activeId ? PROJECTS.find((p) => p.id === activeId) ?? null : null;
  const regionProjects = activeRegion
    ? searchFiltered.filter((p) => p.region === activeRegion)
    : [];

  // Unified panel state — only one view at a time
  const panelView: "none" | "region" | "project" =
    activeProject ? "project" : mapMode === "region" && activeRegion ? "region" : "none";

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
      gsap.killTweensOf(canvas);
      gsap.to(canvas, {
        x: clamped.x,
        y: clamped.y,
        scale: clamped.scale,
        duration: 0.6,
        ease: "power3.inOut",
        transformOrigin: "0 0",
        overwrite: true,
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
    (px: number, py: number, scaleMultiplier: number, animate = true, sheetOffset = 0) => {
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
    return window.innerWidth < 1024 ? (viewportRef.current?.clientHeight ?? 0) * 0.2 : 0;
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
      const next = { w: imgRef.current.naturalWidth, h: imgRef.current.naturalHeight };
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

  const resetMap = useCallback(() => {
    setActiveId(null);
    setActiveRegion(null);
    setMapMode("overview");
    setFilter("all");
    setSearch("");
    fitMap(true);
  }, [fitMap]);

  const selectRegion = useCallback(
    (regionId: Exclude<RegionId, "all">) => {
      const cluster = clusters.find((c) => c.id === regionId);
      if (!cluster) return;
      setActiveId(null);
      setActiveRegion(regionId);
      setMapMode("region");
      setFilter(regionId);
      zoomToPoint(cluster.x, cluster.y, REGION_ZOOM, true, getSheetOffset() * 0.3);
    },
    [clusters, zoomToPoint],
  );

  const selectProject = useCallback(
    (project: Project) => {
      setActiveId(project.id);
      setActiveRegion(project.region);
      setMapMode("project");
      setFilter(project.region);
      zoomToPoint(project.x, project.y, PROJECT_ZOOM, true, getSheetOffset());
    },
    [zoomToPoint],
  );

  const closeProject = useCallback(() => {
    const region = activeRegion;
    setActiveId(null);
    setMapMode("region");
    if (region) {
      const cluster = clusters.find((c) => c.id === region);
      if (cluster) zoomToPoint(cluster.x, cluster.y, REGION_ZOOM, true, getSheetOffset() * 0.3);
    }
  }, [activeRegion, clusters, zoomToPoint]);

  const handlePanelClose = useCallback(() => {
    if (panelView === "project") closeProject();
    else resetMap();
  }, [panelView, closeProject, resetMap]);

  const onPointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, textarea")) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

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
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    // Only pan if moved enough (avoid accidental drags on click)
    if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
    transformRef.current = {
      ...transformRef.current,
      x: start.tx + dx,
      y: start.ty + dy,
    };
    applyTransform(false);
  };

  const onPointerUp = () => {
    panStartRef.current = null;
  };

  // Shared panel content renderer
  const desktopPanelContent =
    panelView === "project" && activeProject ? (
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
    ) : panelView === "region" ? (
      <RegionListContent
        regionProjects={regionProjects}
        activeRegion={activeRegion!}
        lang={lang}
        t={t}
        onSelect={selectProject}
        onReset={resetMap}
      />
    ) : null;

  const mobilePanelContent =
    panelView === "project" && activeProject ? (
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
    ) : panelView === "region" ? (
      <RegionListContent
        regionProjects={regionProjects}
        activeRegion={activeRegion!}
        lang={lang}
        t={t}
        onSelect={selectProject}
        onReset={resetMap}
        compact
      />
    ) : null;

  return (
    <section id="map" className="relative bg-[#FAFAF8] py-10 md:py-16">
      <div className="mx-auto mb-6 max-w-[1600px] px-4 md:mb-8 md:px-6">
        <p className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
          {t("استكشف", "Explore")}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[#1A1612] md:mt-3 md:text-4xl">
          {t("خريطة المشاريع", "Projects Map")}
        </h2>
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-4 md:px-6">
        <div
          className={cn(
            "relative w-full transition-opacity duration-300",
            "h-[min(75vw,560px)] min-h-[340px] md:h-[min(65vh,680px)] md:min-h-[480px]",
            ready ? "opacity-100" : "opacity-40",
          )}
        >
          {/* Map viewport */}
          <div
            ref={viewportRef}
            className="map-viewport relative h-full w-full overflow-hidden rounded-[1.25rem] border border-[#E0D3C2]/60 bg-[#EDE8E0] shadow-[0_24px_80px_rgba(26,22,18,0.12)] md:rounded-[1.75rem]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* Search + filters */}
            <div className="map-float-controls pointer-events-none absolute inset-x-0 top-0 z-40 px-3 pt-3 md:px-4 md:pt-4">
              <div className="pointer-events-auto mx-auto max-w-3xl space-y-2">
                <label className="map-search-bar">
                  <Search className="h-4 w-4 shrink-0 text-[#8A8175]" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t(
                      "ابحث بالمنطقة أو اسم المشروع",
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
                      className={cn("map-filter-chip shrink-0", filter === region.id && "is-active")}
                    >
                      {lang === "ar" ? region.nameAr : region.nameEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Map canvas */}
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
                {/* Cluster pins (overview mode) */}
                {mapMode === "overview" && filter === "all" && !search.trim() &&
                  clusters.map((cluster) => (
                    <button
                      key={cluster.id}
                      type="button"
                      onClick={() => selectRegion(cluster.id)}
                      className="map-cluster-premium absolute -translate-x-1/2 -translate-y-full"
                      data-cursor="explore"
                      style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}
                    >
                      <span className="map-cluster-label">
                        {lang === "ar" ? cluster.nameAr : cluster.nameEn}
                      </span>
                      <span className="map-cluster-badge">{cluster.count}</span>
                    </button>
                  ))}

                {/* Project pins */}
                {(mapMode !== "overview" || search.trim()) &&
                  visibleMarkers.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      aria-label={lang === "ar" ? project.nameAr : project.nameEn}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectProject(project);
                      }}
                      className={cn(
                        "map-pin-premium group absolute -translate-x-1/2 -translate-y-full",
                        activeId === project.id && "is-active",
                        activeId && activeId !== project.id && "is-dimmed",
                      )}
                      data-cursor="explore"
                      style={{ left: `${project.x}%`, top: `${project.y}%` }}
                    >
                      <span className={cn("map-pin-label", activeId === project.id && "is-visible")}>
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

            {/* Desktop panel — single panel, switches content */}
            {desktopPanelContent && (
              <aside className="map-desktop-panel hidden lg:block">
                {desktopPanelContent}
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

          {/* Mobile bottom sheet — single sheet, switches content */}
          <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden lg:hidden">
            <MapBottomSheet open={panelView !== "none"} onClose={handlePanelClose}>
              {mobilePanelContent}
            </MapBottomSheet>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

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
    <div className="flex min-h-0 flex-col px-4 pb-4 pt-1">
      {compact && (
        <MapProjectCard3D
          image={project.heroImage}
          active
          className="relative mb-3 h-32 overflow-hidden rounded-2xl border border-[#E0D3C2]/70 bg-[#1A1612]/5"
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
              <h3 className="text-base font-semibold text-[#1A1612]">
                {lang === "ar" ? project.nameAr : project.nameEn}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-[#8A8175]">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {lang === "ar" ? project.regionAr : project.regionEn}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="map-sheet-close shrink-0"
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

      <div className="mt-4 flex gap-2">
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
    <div className="flex min-h-0 flex-col px-4 pb-4 pt-1">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] tracking-[0.25em] text-[#9A7B3A] uppercase">
            {t("مواقع المنطقة", "Region Sites")}
          </p>
          <h3 className="mt-0.5 text-base font-semibold text-[#1A1612]">
            {lang === "ar" ? region?.nameAr : region?.nameEn}
          </h3>
          <p className="text-xs text-[#8A8175]">
            {regionProjects.length} {t("مشروع", "projects")}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="map-sheet-close shrink-0"
          aria-label={t("إغلاق", "Close")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ul
        className={cn(
          "map-sheet-list space-y-1.5",
          compact ? "max-h-[min(32vh,240px)]" : "max-h-72",
        )}
      >
        {regionProjects.map((project) => (
          <li key={project.slug}>
            <button
              type="button"
              onClick={() => onSelect(project)}
              className="flex w-full items-center gap-3 rounded-xl border border-[#E0D3C2]/70 bg-[#FAFAF8] p-2.5 text-start transition hover:border-[#C9A962]/50 active:scale-[0.98]"
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
    </div>
  );
}

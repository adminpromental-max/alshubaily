"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
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

const MAP_SRC = "/assets/map.png";
const MAP_DEFAULT = { w: 2000, h: 1111 };
const MAX_ZOOM_RATIO = 4.2;
const ZOOM_STEP_RATIO = 0.1;

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

  if (scaledW <= vw) {
    x = (vw - scaledW) / 2;
  } else {
    x = Math.min(0, Math.max(vw - scaledW, x));
  }

  if (scaledH <= vh) {
    y = (vh - scaledH) / 2;
  } else {
    y = Math.min(0, Math.max(vh - scaledH, y));
  }

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

  const [ready, setReady] = useState(false);
  const [imgSize, setImgSize] = useState(MAP_DEFAULT);
  const [filter, setFilter] = useState<RegionId>("all");
  const [mapMode, setMapMode] = useState<MapMode>("overview");
  const [activeRegion, setActiveRegion] = useState<Exclude<RegionId, "all"> | null>(
    null,
  );
  const [activeId, setActiveId] = useState<number | null>(null);

  const clusters = getRegionClusters();
  const filtered =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.region === filter);
  const activeProject = activeId ? PROJECTS.find((p) => p.id === activeId) : null;
  const regionProjects = activeRegion
    ? PROJECTS.filter((p) => p.region === activeRegion)
    : [];

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

      const nextBase = Math.min(vw / w, vh / h);
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
    (px: number, py: number, scaleMultiplier: number, animate = true) => {
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

      transformRef.current = {
        scale: targetScale,
        x: vw / 2 - mapX * targetScale,
        y: vh / 2 - mapY * targetScale,
      };
      applyTransform(animate);
    },
    [applyTransform],
  );

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
    fitMap(true);
  };

  const selectRegion = (regionId: Exclude<RegionId, "all">) => {
    const cluster = clusters.find((c) => c.id === regionId);
    if (!cluster) return;

    setActiveRegion(regionId);
    setActiveId(null);
    setMapMode("region");
    setFilter(regionId);
    zoomToPoint(cluster.x, cluster.y, 2.6, true);
  };

  const selectProject = (project: Project) => {
    setActiveId(project.id);
    setActiveRegion(project.region);
    setMapMode("project");
    setFilter(project.region);
    zoomToPoint(project.x, project.y, 3.8, true);
  };

  const showProjectsForRegion = () => {
    if (!activeRegion) return;
    setMapMode("region");
    setActiveId(null);
  };

  return (
    <section id="map" className="relative bg-[#FAFAF8] py-12 md:py-20">
      <div className="mx-auto mb-8 max-w-[1600px] px-4 md:px-6">
        <p className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
          {t("استكشف", "Explore")}
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-[#1A1612] md:text-5xl">
          {t("خريطة المشاريع", "Projects Map")}
        </h2>
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-4 md:px-6">
        {/* Filter bar — above map, not overlapping */}
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-[#E0D3C2]/80 bg-white p-2 shadow-sm md:p-3">
          {REGIONS.map((region) => (
            <button
              key={region.id}
              type="button"
              onClick={() => {
                if (region.id === "all") {
                  resetMap();
                } else {
                  selectRegion(region.id);
                }
              }}
              className={cn(
                "rounded-full px-4 py-2 text-xs transition md:text-sm",
                filter === region.id
                  ? "bg-[#1A1612] font-medium text-white"
                  : "text-[#5C5348] hover:bg-[#F3F0EA]",
              )}
            >
              {lang === "ar" ? region.nameAr : region.nameEn}
            </button>
          ))}
        </div>

        <div
          className={cn(
            "relative h-[min(78vh,760px)] min-h-[480px] w-full transition-opacity duration-300",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            ref={viewportRef}
            className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-[#E0D3C2]/80 bg-[#EDE8E0] shadow-[0_30px_100px_rgba(26,22,18,0.1)]"
          >
            {activeId && (
              <div className="pointer-events-none absolute inset-0 z-20 bg-white/25 backdrop-blur-[1px]" />
            )}

            <div
              ref={canvasRef}
              className={cn(
                "absolute top-0 left-0 will-change-transform",
                !ready && "invisible",
              )}
              style={{
                width: imgSize.w,
                height: imgSize.h,
              }}
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
                  clusters.map((cluster) => (
                    <button
                      key={cluster.id}
                      type="button"
                      onClick={() => selectRegion(cluster.id)}
                      className="map-cluster group absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}
                    >
                      <span className="map-cluster-pill">
                        <span className="map-cluster-name">
                          {lang === "ar" ? cluster.nameAr : cluster.nameEn}
                        </span>
                        <span className="map-cluster-count">{cluster.count}</span>
                      </span>
                    </button>
                  ))}

                {(mapMode === "region" || mapMode === "project") &&
                  filtered.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      aria-label={lang === "ar" ? project.nameAr : project.nameEn}
                      onClick={() => selectProject(project)}
                      className={cn(
                        "map-marker group absolute -translate-x-1/2 -translate-y-1/2",
                        activeId === project.id && "is-active",
                        activeId && activeId !== project.id && "is-dimmed",
                      )}
                      style={{
                        left: `${project.x}%`,
                        top: `${project.y}%`,
                        ["--pin-color" as string]: project.color,
                      }}
                    >
                      <span className="map-marker-label">
                        <span className="map-marker-type">{t("مشروع", "Project")}</span>
                        <span className="map-marker-name">
                          {lang === "ar" ? project.nameAr : project.nameEn}
                        </span>
                      </span>
                      <span className="map-marker-pin">
                        {String(project.id).padStart(2, "0")}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Region sites list panel */}
            {mapMode === "region" && activeRegion && !activeId && (
              <aside className="map-sites-panel">
                <p className="text-[10px] tracking-[0.25em] text-[#9A7B3A] uppercase">
                  {t("مواقع المنطقة", "Region Sites")}
                </p>
                <h3 className="font-heading mt-2 text-xl text-[#1A1612]">
                  {lang === "ar"
                    ? REGIONS.find((r) => r.id === activeRegion)?.nameAr
                    : REGIONS.find((r) => r.id === activeRegion)?.nameEn}
                </h3>
                <p className="mt-1 text-xs text-[#5C5348]">
                  {regionProjects.length}{" "}
                  {t("موقع — اختر مشروعاً", "sites — select a project")}
                </p>
                <ul className="mt-4 max-h-52 space-y-2 overflow-y-auto">
                  {regionProjects.map((project) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => selectProject(project)}
                        className="flex w-full items-center gap-3 rounded-xl border border-[#E0D3C2]/70 bg-[#FAFAF8] p-2 text-start transition hover:border-[#C9A962]/50 hover:bg-white"
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
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
                  onClick={resetMap}
                  className="mt-4 text-xs text-[#9A7B3A] hover:text-[#B8954A]"
                >
                  ← {t("العودة للخريطة الكاملة", "Back to full map")}
                </button>
              </aside>
            )}

            {/* Premium project card */}
            {activeProject && (
              <aside className="map-premium-panel">
                <button
                  type="button"
                  className="map-info-close"
                  onClick={() => {
                    setActiveId(null);
                    setMapMode("region");
                    if (activeRegion) {
                      const cluster = clusters.find((c) => c.id === activeRegion);
                      if (cluster) zoomToPoint(cluster.x, cluster.y, 2.6, true);
                    }
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>

                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={activeProject.heroImage}
                    alt={lang === "ar" ? activeProject.nameAr : activeProject.nameEn}
                    fill
                    className="object-cover"
                    sizes="360px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,22,18,0.55),transparent)]" />
                  <span
                    className="absolute start-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: activeProject.color }}
                  >
                    {String(activeProject.id).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] tracking-[0.25em] text-[#9A7B3A] uppercase">
                    {t("مشروع", "Project")}
                  </p>
                  <h3 className="font-heading mt-1 text-2xl text-[#1A1612]">
                    {lang === "ar" ? activeProject.nameAr : activeProject.nameEn}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-[#B8954A]">
                    {lang === "ar" ? activeProject.regionAr : activeProject.regionEn}{" "}
                    · {lang === "ar" ? activeProject.typeAr : activeProject.typeEn}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5C5348]">
                    {lang === "ar"
                      ? activeProject.descriptionAr
                      : activeProject.descriptionEn}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={`/projects/${activeProject.slug}`}
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "flex-1 rounded-full bg-[#1A1612] text-white hover:bg-[#2A241E]",
                    )}
                  >
                    {t("جولة داخل المشروع", "Enter Project Tour")}
                  </Link>
                  <button
                    type="button"
                    onClick={showProjectsForRegion}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "default" }),
                      "rounded-full border-[#E0D3C2]",
                    )}
                  >
                    {t("قائمة المنطقة", "Region List")}
                  </button>
                </div>
              </aside>
            )}

            <div className="absolute end-4 bottom-4 z-30 flex flex-col gap-1 md:end-6 md:bottom-6">
              <button
                type="button"
                className="map-zoom-btn"
                onClick={() =>
                  zoomFromCenter(baseScaleRef.current * ZOOM_STEP_RATIO)
                }
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                className="map-zoom-btn"
                onClick={() =>
                  zoomFromCenter(-baseScaleRef.current * ZOOM_STEP_RATIO)
                }
                aria-label="Zoom out"
              >
                −
              </button>
              <button
                type="button"
                className="map-zoom-btn mt-1"
                onClick={resetMap}
                aria-label="Reset"
              >
                ⟲
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-[#8A8175]">
          {mapMode === "overview"
            ? t(
                "اضغط على منطقة لعرض المواقع — ثم اختر مشروعاً للتفاصيل",
                "Tap a region to see sites — then select a project for details",
              )
            : t(
                "اضغط على مشروع للتقريب وعرض التفاصيل",
                "Tap a project to zoom in and view details",
              )}
        </p>
      </div>
    </section>
  );
}

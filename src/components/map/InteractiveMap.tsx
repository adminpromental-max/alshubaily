"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS, REGIONS, type Project, type RegionId } from "@/data/projects";
import { useLang } from "@/contexts/lang-context";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAP_SRC = "/assets/map.png";
const MAP_DEFAULT = { w: 2000, h: 1111 };
const MAX_ZOOM_RATIO = 1.4;
const ZOOM_STEP_RATIO = 0.08;

export function InteractiveMap() {
  const { t, lang } = useLang();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [imgSize, setImgSize] = useState(MAP_DEFAULT);
  const [scale, setScale] = useState(1);
  const [baseScale, setBaseScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState<RegionId>("all");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  const filtered =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.region === filter);
  const activeProject = activeId ? PROJECTS.find((p) => p.id === activeId) : null;

  const fitMap = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || !imgSize.w) return;

    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    if (vw < 10 || vh < 10) return;

    const nextBase = Math.min(vw / imgSize.w, vh / imgSize.h) * 0.94;

    setBaseScale(nextBase);
    setScale(nextBase);
    setTranslate({
      x: (vw - imgSize.w * nextBase) / 2,
      y: (vh - imgSize.h * nextBase) / 2,
    });
    setReady(true);
  }, [imgSize.h, imgSize.w]);

  useEffect(() => {
    fitMap();
  }, [fitMap]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => fitMap());
    observer.observe(viewport);
    window.addEventListener("resize", fitMap);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fitMap);
    };
  }, [fitMap]);

  const zoomFromCenter = (delta: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const min = baseScale;
    const max = baseScale * MAX_ZOOM_RATIO;
    const next = Math.min(max, Math.max(min, scale + delta));
    if (next === scale) return;

    const cx = viewport.clientWidth / 2;
    const cy = viewport.clientHeight / 2;
    const ratio = next / scale;

    setTranslate((prev) => ({
      x: cx - (cx - prev.x) * ratio,
      y: cy - (cy - prev.y) * ratio,
    }));
    setScale(next);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 0) {
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
    }
  };

  return (
    <section id="map" className="relative bg-[#FAFAF8] py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-7xl px-4 md:px-8">
        <p className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
          {t("استكشف", "Explore")}
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-[#1A1612] md:text-5xl">
          {t("خريطة المشاريع", "Projects Map")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[#5C5348] md:text-base">
          {t(
            "18 مشروعاً موزعة على 4 مناطق — اضغط على أي مشروع لاستكشاف التفاصيل",
            "18 projects across 4 regions — tap any pin to explore",
          )}
        </p>
      </div>

      <div
        className={cn(
          "relative mx-auto h-[min(72vh,680px)] w-full max-w-7xl px-4 transition-opacity duration-500 md:px-8",
          ready ? "opacity-100" : "opacity-40",
          activeId && "map-project-selected",
        )}
      >
        {activeId && (
          <div className="pointer-events-none absolute inset-4 z-20 rounded-3xl bg-white/35 backdrop-blur-[2px] md:inset-8" />
        )}

        <div
          ref={viewportRef}
          className="relative h-full w-full overflow-hidden rounded-3xl border border-[#E0D3C2]/80 bg-[#F3F0EA] shadow-[0_24px_80px_rgba(26,22,18,0.08)]"
        >
          <div
            className="absolute origin-top-left will-change-transform"
            style={{
              width: imgSize.w,
              height: imgSize.h,
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MAP_SRC}
              alt="AlShubaily Projects Map"
              width={imgSize.w}
              height={imgSize.h}
              onLoad={handleImageLoad}
              draggable={false}
              className="block h-full w-full select-none"
            />

            <div className="absolute inset-0">
              {filtered.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  aria-label={lang === "ar" ? project.nameAr : project.nameEn}
                  onClick={() => setActiveId(project.id)}
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

          <div className="absolute end-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1">
            <button
              type="button"
              className="map-zoom-btn"
              onClick={() => zoomFromCenter(baseScale * ZOOM_STEP_RATIO)}
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              className="map-zoom-btn"
              onClick={() => zoomFromCenter(-baseScale * ZOOM_STEP_RATIO)}
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              type="button"
              className="map-zoom-btn mt-2"
              onClick={() => {
                setActiveId(null);
                fitMap();
              }}
              aria-label="Reset"
            >
              ⟲
            </button>
          </div>
        </div>

        {activeProject && (
          <aside className="map-info-panel">
            <button
              type="button"
              className="map-info-close"
              onClick={() => setActiveId(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <p className="text-[10px] tracking-[0.25em] text-[#9A7B3A] uppercase">
              {t("مشروع", "Project")}
            </p>
            <h3 className="font-heading mt-2 text-2xl text-[#1A1612] md:text-3xl">
              {lang === "ar" ? activeProject.nameAr : activeProject.nameEn}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#5C5348]">
              {lang === "ar"
                ? activeProject.descriptionAr
                : activeProject.descriptionEn}
            </p>
            <p className="mt-2 text-xs font-medium text-[#B8954A]">
              {lang === "ar" ? activeProject.regionAr : activeProject.regionEn} ·{" "}
              {lang === "ar" ? activeProject.typeAr : activeProject.typeEn}
            </p>
            <Link
              href={`/projects/${activeProject.slug}`}
              className={cn(
                buttonVariants({ size: "default" }),
                "mt-6 rounded-full bg-[#C9A962] text-white hover:bg-[#B8954A]",
              )}
            >
              {t("جولة داخل المشروع", "Enter Project Tour")}
            </Link>
          </aside>
        )}
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-wrap justify-center gap-2 px-4 md:px-8">
        {REGIONS.map((region) => (
          <button
            key={region.id}
            type="button"
            onClick={() => {
              setFilter(region.id);
              setActiveId(null);
            }}
            className={cn(
              "rounded-full px-4 py-2 text-xs transition md:px-5 md:text-sm",
              filter === region.id
                ? "bg-[#1A1612] font-medium text-white shadow-md"
                : "border border-[#E0D3C2] bg-white text-[#5C5348] hover:border-[#C9A962] hover:text-[#1A1612]",
            )}
          >
            {lang === "ar" ? region.nameAr : region.nameEn}
          </button>
        ))}
      </div>
    </section>
  );
}

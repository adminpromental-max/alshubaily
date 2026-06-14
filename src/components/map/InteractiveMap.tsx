"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS, REGIONS, type Project, type RegionId } from "@/data/projects";
import { useLang } from "@/contexts/lang-context";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAP_SRC = "/assets/map.png";
const MAX_ZOOM_RATIO = 1.35;
const ZOOM_STEP_RATIO = 0.08;

export function InteractiveMap() {
  const { t, lang } = useLang();
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [imgSize, setImgSize] = useState({ w: 2000, h: 1200 });

  const [scale, setScale] = useState(1);
  const [baseScale, setBaseScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState<RegionId>("all");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.region === filter);
  const activeProject = activeId ? PROJECTS.find((p) => p.id === activeId) : null;

  const fitMap = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || !imgSize.w) return;

    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    const nextBase = Math.min(vw / imgSize.w, vh / imgSize.h) * 0.92;

    setBaseScale(nextBase);
    setScale(nextBase);
    setTranslate({
      x: (vw - imgSize.w * nextBase) / 2,
      y: (vh - imgSize.h * nextBase) / 2,
    });
    setReady(true);
  }, [imgSize.h, imgSize.w]);

  useEffect(() => {
    if (imgSize.w) fitMap();
  }, [imgSize, fitMap]);

  useEffect(() => {
    fitMap();
    window.addEventListener("resize", fitMap);
    return () => window.removeEventListener("resize", fitMap);
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

  const selectProject = (project: Project) => {
    setActiveId(project.id);
  };

  const closePanel = () => setActiveId(null);

  return (
    <section id="map" className="relative bg-[#0A0E17] py-16 md:py-24">
      <div className="mx-auto mb-8 max-w-7xl px-4 md:px-8">
        <p className="text-[11px] tracking-[0.4em] text-[#c9a962]/75 uppercase">
          {t("استكشف", "Explore")}
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-white md:text-5xl">
          {t("خريطة المشاريع", "Projects Map")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/55 md:text-base">
          {t(
            "18 مشروعاً موزعة على 4 مناطق — اضغط على أي مشروع لاستكشاف التفاصيل",
            "18 projects across 4 regions — tap any pin to explore",
          )}
        </p>
      </div>

      <div
        className={`relative mx-auto h-[min(72vh,680px)] w-full max-w-7xl overflow-hidden px-4 transition-opacity duration-700 md:px-8 ${
          ready ? "opacity-100" : "opacity-0"
        } ${activeId ? "map-project-selected" : ""}`}
      >
        {activeId && (
          <div className="pointer-events-none absolute inset-4 z-20 rounded-3xl bg-[#050810]/55 md:inset-8" />
        )}

        <div
          ref={viewportRef}
          className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0A0E17]"
        >
          <div
            ref={canvasRef}
            className="absolute origin-top-left will-change-transform"
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            }}
          >
            <Image
              src={MAP_SRC}
              alt="AlShubaily Projects Map"
              width={imgSize.w}
              height={imgSize.h}
              onLoadingComplete={(img) => {
                setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
              }}
              className="block h-auto max-w-none select-none"
              draggable={false}
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(10,14,23,0.45),rgba(10,14,23,0.25))]" />

            <div className="absolute inset-0">
              {filtered.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  aria-label={lang === "ar" ? project.nameAr : project.nameEn}
                  onClick={() => selectProject(project)}
                  className={`map-marker group absolute -translate-x-1/2 -translate-y-1/2 ${
                    activeId === project.id ? "is-active" : activeId ? "is-dimmed" : ""
                  }`}
                  style={{ left: `${project.x}%`, top: `${project.y}%`, ["--pin-color" as string]: project.color }}
                >
                  <span className="map-marker-label">
                    <span className="map-marker-type">{t("مشروع", "Project")}</span>
                    <span className="map-marker-name">
                      {lang === "ar" ? project.nameAr : project.nameEn}
                    </span>
                  </span>
                  <span className="map-marker-pin">{String(project.id).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="absolute end-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1">
            <button type="button" className="map-zoom-btn" onClick={() => zoomFromCenter(baseScale * ZOOM_STEP_RATIO)} aria-label="Zoom in">+</button>
            <button type="button" className="map-zoom-btn" onClick={() => zoomFromCenter(-baseScale * ZOOM_STEP_RATIO)} aria-label="Zoom out">−</button>
            <button
              type="button"
              className="map-zoom-btn mt-2"
              onClick={() => {
                closePanel();
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
            <button type="button" className="map-info-close" onClick={closePanel} aria-label="Close">
              ✕
            </button>
            <p className="text-[10px] tracking-[0.25em] text-[#c9a962]/70 uppercase">
              {t("مشروع", "Project")}
            </p>
            <h3 className="font-heading mt-2 text-2xl text-white md:text-3xl">
              {lang === "ar" ? activeProject.nameAr : activeProject.nameEn}
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/70">
              {lang === "ar" ? activeProject.descriptionAr : activeProject.descriptionEn}
            </p>
            <p className="mt-2 text-xs text-[#c9a962]">
              {lang === "ar" ? activeProject.regionAr : activeProject.regionEn} ·{" "}
              {lang === "ar" ? activeProject.typeAr : activeProject.typeEn}
            </p>
            <Link
              href={`/projects/${activeProject.slug}`}
              className={cn(
                buttonVariants({ size: "default" }),
                "mt-6 rounded-full border border-[#c9a962]/35 bg-[#c9a962]/10 text-[#f5ecd8] hover:bg-[#c9a962]/20",
              )}
            >
              {t("جولة داخل المشروع", "Enter Project Tour")}
            </Link>
          </aside>
        )}
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl flex-wrap justify-center gap-2 px-4 md:px-8">
        {REGIONS.map((region) => (
          <button
            key={region.id}
            type="button"
            onClick={() => {
              setFilter(region.id);
              closePanel();
            }}
            className={`rounded-full px-4 py-2 text-xs transition md:px-5 md:text-sm ${
              filter === region.id
                ? "bg-[#e0d3c2] text-[#0A0E17] font-medium"
                : "border border-white/10 text-white/60 hover:text-white"
            }`}
          >
            {lang === "ar" ? region.nameAr : region.nameEn}
          </button>
        ))}
      </div>
    </section>
  );
}

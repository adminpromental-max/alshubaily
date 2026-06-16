"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { PROJECTS, REGIONS, type RegionId } from "@/data/projects";
import { useLang } from "@/contexts/lang-context";
import { cn } from "@/lib/utils";

interface Props {
  /** When a project is highlighted from the map */
  activeProjectId?: number | null;
  onProjectClick?: (id: number) => void;
}

export function MapProjectListPanel({ activeProjectId, onProjectClick }: Props) {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<RegionId>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.region === filter);
  }, [filter]);

  return (
    <div className="map-panel flex h-full flex-col">
      {/* Header */}
      <div className="map-panel-header">
        <p className="text-[10px] tracking-[0.35em] text-[#9A7B3A] uppercase">
          {t("جميع المشاريع", "All Projects")}
        </p>
        <span className="map-panel-count">{filtered.length}</span>
      </div>

      {/* Region filter chips */}
      <div className="map-panel-filters">
        {REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setFilter(r.id)}
            className={cn("map-panel-chip", filter === r.id && "is-active")}
          >
            {lang === "ar" ? r.nameAr : r.nameEn}
          </button>
        ))}
      </div>

      {/* Scrollable project list */}
      <div className="map-panel-list">
        {filtered.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onProjectClick?.(project.id)}
            className={cn(
              "map-panel-card group",
              activeProjectId === project.id && "is-active",
            )}
          >
            {/* Thumbnail */}
            <div className="map-panel-card-thumb">
              <Image
                src={project.heroImage}
                alt={lang === "ar" ? project.nameAr : project.nameEn}
                fill
                unoptimized
                sizes="80px"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="map-panel-card-info">
              <p className="map-panel-card-name">
                {lang === "ar" ? project.nameAr : project.nameEn}
              </p>
              <p className="map-panel-card-meta">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: project.color }}
                />
                {lang === "ar" ? project.regionAr : project.regionEn}
                {" · "}
                {lang === "ar" ? project.typeAr : project.typeEn}
              </p>
            </div>

            {/* Arrow */}
            <Link
              href={`/projects/${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="map-panel-card-link"
              aria-label={lang === "ar" ? project.nameAr : project.nameEn}
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
}

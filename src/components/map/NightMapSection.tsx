"use client";

import { NightMap } from "./NightMap";
import { GEO_REGIONS, GEO_PROJECTS } from "@/data/map-geo";

// Stats bar above the map
function RegionStat({ nameAr, count, color }: { nameAr: string; count: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span
        className="text-xl font-bold md:text-2xl"
        style={{ color }}
      >
        {count}
      </span>
      <span className="text-[10px] tracking-wider text-white/40 md:text-xs">{nameAr}</span>
    </div>
  );
}

export function NightMapSection() {
  const totalProjects = GEO_PROJECTS.length;
  const totalRegions = GEO_REGIONS.length;

  return (
    <section className="about-map-section">
      {/* Stats row */}
      <div className="about-map-stats">
        <div className="about-map-stat-item">
          <span className="about-map-stat-num text-[#C9A962]">{totalProjects}+</span>
          <span className="about-map-stat-label">مشروع</span>
        </div>
        <div className="about-map-stat-divider" />
        {GEO_REGIONS.map((region) => (
          <RegionStat
            key={region.id}
            nameAr={region.nameAr}
            count={GEO_PROJECTS.filter((p) => p.region === region.id).length}
            color={region.color}
          />
        ))}
        <div className="about-map-stat-divider" />
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xl font-bold text-white/80 md:text-2xl">{totalRegions}</span>
          <span className="text-[10px] tracking-wider text-white/40 md:text-xs">منطقة</span>
        </div>
      </div>

      {/* Map */}
      <NightMap />
    </section>
  );
}

"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroChairmanSequence } from "@/components/home/HeroChairmanSequence";
import { StatsBanner } from "@/components/home/StatsBanner";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { ProjectTypesSection } from "@/components/home/ProjectTypesSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TaglineSection } from "@/components/home/TaglineSection";
import { LogoMarqueeBanner } from "@/components/home/LogoMarqueeBanner";
import { AmbientLight } from "@/components/effects/AmbientLight";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { usePageParallax } from "@/hooks/usePageParallax";

export function HomePage() {
  usePageParallax();
  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-[#1A1612]">
      <AmbientLight />
      <CustomCursor />
      <SiteHeader />
      <main className="relative z-[2] isolate">
        {/* 1 — Hero + Chairman/Vision */}
        <div className="relative bg-[#0A0A0A]">
          <HeroChairmanSequence />
          <StatsBanner />
        </div>

        {/* 2 — Logo marquee banner (video bg, taller) */}
        <LogoMarqueeBanner />

        {/* 3 — Project type cards (light) */}
        <div className="relative bg-[#FAFAF8]">
          <ProjectTypesSection />
        </div>

        {/* 4 — Showcase slider */}
        <FeaturedProjects />

        {/* 5 — Tagline 3D billboard */}
        <TaglineSection />

        {/* 6 — Interactive map (wider) */}
        <InteractiveMap />
      </main>
      <SiteFooter />
    </div>
  );
}

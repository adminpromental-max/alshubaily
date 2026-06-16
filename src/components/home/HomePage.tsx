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
        {/* Dark block: Hero → Vision & Message → Stats */}
        <div className="relative bg-[#0A0A0A]">
          <HeroChairmanSequence />
          <StatsBanner />
        </div>

        {/* Light block: Map → Project Types */}
        <div className="section-overlap section-overlap--light relative z-10 bg-[#FAFAF8]">
          <InteractiveMap />
          <ProjectTypesSection />
        </div>

        {/* Dark showcase slider */}
        <FeaturedProjects />

        {/* Cream tagline break — portrait frame, Cairo headline */}
        <TaglineSection />

        {/* Logo marquee banner */}
        <LogoMarqueeBanner />
      </main>
      <SiteFooter />
    </div>
  );
}

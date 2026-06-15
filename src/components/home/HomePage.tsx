"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroChairmanSequence } from "@/components/home/HeroChairmanSequence";
import { StatsBanner } from "@/components/home/StatsBanner";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { ProjectTypesSection } from "@/components/home/ProjectTypesSection";
import { CinematicStackSlider } from "@/components/home/CinematicStackSlider";
import { GroupSection } from "@/components/home/GroupSection";
import { AmbientLight } from "@/components/effects/AmbientLight";
import { CustomCursor } from "@/components/effects/CustomCursor";

export function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-[#1A1612]">
      <AmbientLight />
      <CustomCursor />
      <SiteHeader />
      <main className="relative z-[2]">
        <HeroChairmanSequence />
        <StatsBanner />
        <InteractiveMap />
        <ProjectTypesSection />
        <CinematicStackSlider />
        <GroupSection />
      </main>
      <SiteFooter />
    </div>
  );
}

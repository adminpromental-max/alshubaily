"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBanner } from "@/components/home/StatsBanner";
import { ProjectTypesSection } from "@/components/home/ProjectTypesSection";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutSection } from "@/components/home/AboutSection";
import { GroupSection } from "@/components/home/GroupSection";

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1612]">
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsBanner />
        <ProjectTypesSection />
        <InteractiveMap />
        <FeaturedProjects />
        <AboutSection />
        <GroupSection />
      </main>
      <SiteFooter />
    </div>
  );
}

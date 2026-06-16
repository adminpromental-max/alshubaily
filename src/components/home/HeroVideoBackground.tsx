"use client";

import { FilmGrain } from "./FilmGrain";
import { BANNER_VIDEO } from "@/data/group-logos";

/**
 * Full-screen video background for the Hero section.
 * The Cloudinary video (formerly the banner bg) becomes the Hero.
 */
export function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A0A0A]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        poster="/assets/hero/Hero-1.jpg"
      >
        <source src={BANNER_VIDEO} type="video/mp4" />
        <source
          src="https://res.cloudinary.com/dfzaghfsv/video/upload/v1781615121/banner-video_ciymr0.mov"
          type="video/quicktime"
        />
      </video>

      {/* Cinematic grade overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.18)_0%,rgba(10,10,10,0.08)_40%,rgba(10,10,10,0.45)_100%)]" />
      <FilmGrain />
    </div>
  );
}

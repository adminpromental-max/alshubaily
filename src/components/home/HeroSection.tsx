"use client";

import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { HeroLetterReveal } from "./HeroLetterReveal";

const HeroCinematic = dynamic(
  () => import("./HeroCinematic").then((m) => m.HeroCinematic),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 animate-pulse bg-[#1A1612]" />
    ),
  },
);

export function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#1A1612]">
      <HeroCinematic />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-28 pt-24 md:pb-32">
        <HeroLetterReveal />
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a
          href="#intro"
          className="flex h-11 w-11 animate-bounce items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#C9A962] backdrop-blur-md transition hover:bg-white/20"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

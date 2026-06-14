"use client";

import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";

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

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a
          href="#stats"
          className="flex h-11 w-11 animate-bounce items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#C9A962] backdrop-blur-md transition hover:bg-white/20"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

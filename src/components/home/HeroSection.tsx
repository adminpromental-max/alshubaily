"use client";

import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";

const HeroCinematic = dynamic(
  () => import("./HeroCinematic").then((m) => m.HeroCinematic),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 animate-pulse bg-[#F3F0EA]" />
    ),
  },
);

export function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-[#FAFAF8]">
      <HeroCinematic />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-8">
        <a
          href="#intro"
          className="pointer-events-auto flex h-11 w-11 animate-bounce items-center justify-center rounded-full border border-[#E0D3C2]/80 bg-white/80 text-[#C9A962] shadow-lg backdrop-blur-sm"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

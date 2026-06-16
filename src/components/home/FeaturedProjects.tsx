"use client";

import { useCallback, useEffect, useState } from "react";
import { SHOWCASE_IMAGES } from "@/data/showcase-images";
import { useLang } from "@/contexts/lang-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const TOTAL = SHOWCASE_IMAGES.length;
const AUTOPLAY_MS = 4800;

function wrap(index: number) {
  return ((index % TOTAL) + TOTAL) % TOTAL;
}

export function FeaturedProjects() {
  const { t } = useLang();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40, stagger: 0.1 });
  const [index, setIndex] = useState(0);
  const [playing] = useState(true);

  const go = useCallback((delta: number) => {
    setIndex((current) => wrap(current + delta));
  }, []);

  // Preload images
  useEffect(() => {
    SHOWCASE_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Autoplay
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [go, playing]);

  const prev = wrap(index - 1);
  const next = wrap(index + 1);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080605] py-8 md:py-12"
    >
      <div className="section-gradient-showcase pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/30 to-transparent" />
      {/* Bottom fade (subtle, CTASection handles the hard transition above) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-[#080605]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div data-reveal className="mx-auto mb-6 max-w-3xl text-center md:mb-8">
          <p className="text-[11px] tracking-[0.4em] text-[#C9A962] uppercase">
            {t("رؤية بصرية", "Visual Journey")}
          </p>
          <h2 className="font-heading mt-2 text-xl font-semibold text-white md:text-3xl">
            {t("مشاريع مجموعة الشبيلي العقارية", "AlShubaily Real Estate Group Projects")}
          </h2>
        </div>

        {/* Spotlight slider — side panels clickable */}
        <div className="showcase-spotlight mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => go(-1)}
            className="showcase-spotlight-side showcase-spotlight-side--prev"
            aria-label={t("السابق", "Previous")}
          >
            <img
              src={SHOWCASE_IMAGES[prev]}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </button>

          <div className="showcase-spotlight-main">
            <img
              key={SHOWCASE_IMAGES[index]}
              src={SHOWCASE_IMAGES[index]}
              alt=""
              className="showcase-spotlight-main-img"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.22),transparent_50%)]" />
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            className="showcase-spotlight-side showcase-spotlight-side--next"
            aria-label={t("التالي", "Next")}
          >
            <img
              src={SHOWCASE_IMAGES[next]}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </button>
        </div>

        {/* Dot nav */}
        <div className="mt-4 flex justify-center gap-1.5">
          {SHOWCASE_IMAGES.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Slide ${dotIndex + 1}`}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                dotIndex === index
                  ? "w-6 bg-[#C9A962]"
                  : "w-1 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

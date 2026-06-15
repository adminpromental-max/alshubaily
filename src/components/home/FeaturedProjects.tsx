"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { SHOWCASE_IMAGES } from "@/data/showcase-images";
import { useLang } from "@/contexts/lang-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const TOTAL = SHOWCASE_IMAGES.length;
const AUTOPLAY_MS = 4500;

function wrap(index: number) {
  return ((index % TOTAL) + TOTAL) % TOTAL;
}

export function FeaturedProjects() {
  const { t } = useLang();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40, stagger: 0.1, flip: true });
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const go = useCallback((delta: number) => {
    setIndex((current) => wrap(current + delta));
  }, []);

  useEffect(() => {
    SHOWCASE_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [go, playing]);

  const prev = wrap(index - 1);
  const next = wrap(index + 1);
  const progress = ((index + 1) / TOTAL) * 100;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-overlap section-overlap--flip section-flip-source relative z-50 overflow-hidden py-12 md:py-16"
    >
      <div className="section-gradient-showcase pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/35 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] tracking-[0.4em] text-[#C9A962] uppercase">
            {t("رؤية بصرية", "Visual Journey")}
          </p>
          <h2 className="font-heading mt-3 text-2xl font-semibold text-white md:text-5xl">
            {t(
              "مشاريع مجموعة الشبيلي العقارية",
              "AlShubaily Real Estate Group Projects",
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/45 md:text-base">
            {t(
              "جولة بصرية عبر أبرز وجهاتنا — تصميم، جودة، وتميز في كل لقطة.",
              "A cinematic glimpse across our destinations — design, quality, and distinction in every frame.",
            )}
          </p>
        </div>

        <div className="relative mt-8 md:mt-12">
          <div className="mb-6 flex items-center justify-between gap-4 px-1">
            <p className="text-xs tracking-[0.25em] text-white/40 uppercase">
              {String(index + 1).padStart(2, "0")}{" "}
              <span className="text-white/20">/</span>{" "}
              {String(TOTAL).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C9A962]/40 hover:text-[#C9A962]"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => go(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C9A962]/40 hover:text-[#C9A962]"
                aria-label="Previous"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C9A962]/40 hover:text-[#C9A962]"
                aria-label="Next"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="showcase-spotlight mx-auto max-w-6xl">
            <button
              type="button"
              onClick={() => go(-1)}
              className="showcase-spotlight-side showcase-spotlight-side--prev"
              aria-label="Previous slide"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SHOWCASE_IMAGES[prev]}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </button>

            <div className="showcase-spotlight-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={SHOWCASE_IMAGES[index]}
                src={SHOWCASE_IMAGES[index]}
                alt=""
                className="showcase-spotlight-main-img"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.28),transparent_48%)]" />
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="showcase-spotlight-side showcase-spotlight-side--next"
              aria-label="Next slide"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SHOWCASE_IMAGES[next]}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </button>
          </div>

          <div className="mt-5 flex justify-center gap-1.5 px-2">
            {SHOWCASE_IMAGES.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={() => setIndex(dotIndex)}
                aria-label={`Slide ${dotIndex + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  dotIndex === index
                    ? "w-7 bg-[#C9A962]"
                    : "w-1.5 bg-white/20 hover:bg-white/40",
                )}
              />
            ))}
          </div>

          <div className="mx-auto mt-6 h-1 max-w-md overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SHOWCASE_IMAGES } from "@/data/showcase-images";
import { useLang } from "@/contexts/lang-context";

gsap.registerPlugin(ScrollTrigger);

/** Curated stack — images without text overlays */
const STACK_IMAGES = SHOWCASE_IMAGES.slice(0, 10);

export function CinematicStackSlider() {
  const { t } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return;

    const slides = gsap.utils.toArray<HTMLElement>(".stack-slide", pin);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${slides.length * window.innerHeight * 0.85}`,
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      slides.forEach((slide, index) => {
        if (index === 0) return;

        const img = slide.querySelector(".stack-slide-img");
        const label = slide.querySelector(".stack-slide-label");

        tl.fromTo(
          slide,
          { yPercent: 100 },
          { yPercent: 0, ease: "none", duration: 1 },
          index - 1,
        );

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.12 },
            { scale: 1, ease: "none", duration: 1 },
            index - 1,
          );
        }

        if (label) {
          tl.fromTo(
            label,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.35 },
            index - 0.55,
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={rootRef} className="relative bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 md:px-8 md:pt-28">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.4em] text-[#C9A962] uppercase">
            {t("رؤية بصرية", "Visual Journey")}
          </p>
          <h2 className="font-heading mt-3 text-2xl font-semibold text-white md:text-5xl">
            {t(
              "مشاريع مجموعة الشبيلي العقارية",
              "AlShubaily Real Estate Group Projects",
            )}
          </h2>
        </div>
      </div>

      <div ref={pinRef} className="stack-pin relative h-[100svh] w-full overflow-hidden">
        {STACK_IMAGES.map((src, index) => (
          <div
            key={src}
            className="stack-slide absolute inset-0 overflow-hidden bg-[#0A0A0A]"
            style={{ zIndex: index + 1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="stack-slide-img absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.55),transparent_42%,rgba(10,10,10,0.2))]" />
            <p className="stack-slide-label pointer-events-none absolute bottom-[18%] left-1/2 w-[min(90%,640px)] -translate-x-1/2 text-center font-heading text-2xl font-semibold text-white/90 md:text-4xl">
              {t("مجموعة الشبيلي العقارية", "AlShubaily Real Estate Group")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HERO_SLIDES } from "@/data/projects";
import { FilmGrain } from "./FilmGrain";

export function HeroCinematic() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const slides = gsap.utils.toArray<HTMLElement>(".hero-slide", root);
    const inners = gsap.utils.toArray<HTMLElement>(".hero-slide-inner", root);
    if (!slides.length) return;

    gsap.set(slides, { opacity: 0, zIndex: 0 });
    gsap.set(inners, { scale: 1.06, xPercent: 0, yPercent: 0 });
    gsap.set(slides[0], { opacity: 1, zIndex: 1 });

    const hold = 7;
    const fade = 2.4;
    const segment = hold + fade;

    const master = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut" },
    });

    slides.forEach((slide, index) => {
      const inner = inners[index];
      const start = index * segment;
      const panX = index % 2 === 0 ? -3 : 3;
      const panY = index % 3 === 0 ? -2 : 1.5;
      const zoomEnd = index % 2 === 0 ? 1.16 : 1.12;

      master.set(slide, { opacity: 1, zIndex: 2 }, start);
      master.fromTo(
        inner,
        { scale: 1.06, xPercent: 0, yPercent: 0 },
        {
          scale: zoomEnd,
          xPercent: panX,
          yPercent: panY,
          duration: segment,
          ease: "sine.inOut",
        },
        start,
      );
      master.to(slide, { opacity: 0, duration: fade, ease: "power2.inOut" }, start + hold);
      master.set(slide, { zIndex: 0 }, start + segment);
    });

    return () => {
      master.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-[#1A1612]">
      {HERO_SLIDES.map((slide) => (
        <div key={slide.src} className="hero-slide absolute inset-0 opacity-0">
          <div
            className="hero-slide-inner absolute inset-[-10%] bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(26,22,18,0.15)_0%,rgba(26,22,18,0.45)_55%,rgba(26,22,18,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(26,22,18,0.35)_100%)]" />
      <FilmGrain />
    </div>
  );
}

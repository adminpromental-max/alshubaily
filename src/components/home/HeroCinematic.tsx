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

    const hold = 3.8;
    const crossfade = 1.1;
    const step = hold - crossfade * 0.35;

    gsap.set(slides, { opacity: 0, zIndex: 0 });
    gsap.set(inners, { scale: 1.05, xPercent: 0, yPercent: 0 });
    gsap.set(slides[0], { opacity: 1, zIndex: 1 });

    const master = gsap.timeline({ repeat: -1 });

    slides.forEach((slide, index) => {
      const inner = inners[index];
      const next = slides[(index + 1) % slides.length];
      const start = index * step;
      const panX = index % 2 === 0 ? -2.2 : 2.2;
      const panY = index % 3 === 0 ? -1.4 : 1.2;

      master.fromTo(
        inner,
        { scale: 1.05, xPercent: 0, yPercent: 0 },
        {
          scale: 1.14,
          xPercent: panX,
          yPercent: panY,
          duration: hold + crossfade,
          ease: "sine.inOut",
        },
        start,
      );

      master.to(
        slide,
        { opacity: 1, duration: crossfade * 0.6, ease: "power1.inOut" },
        start,
      );

      master.to(
        slide,
        { opacity: 0, duration: crossfade, ease: "power2.inOut" },
        start + hold,
      );

      master.to(
        next,
        { opacity: 1, duration: crossfade, ease: "power2.inOut" },
        start + hold - crossfade * 0.45,
      );

      master.set(slide, { zIndex: 0 }, start + hold + crossfade);
      master.set(next, { zIndex: 2 }, start + hold - crossfade * 0.45);
    });

    return () => {
      master.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-[#0A0A0A]">
      {HERO_SLIDES.map((slide) => (
        <div key={slide.src} className="hero-slide absolute inset-0 opacity-0">
          <div
            className="hero-slide-inner absolute inset-[-10%] bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(10,10,10,0.08)_0%,rgba(10,10,10,0.25)_100%)]" />
      <FilmGrain />
    </div>
  );
}

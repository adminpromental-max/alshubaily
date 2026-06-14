"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HERO_SLIDES } from "@/data/projects";

export function HeroCinematic() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const slides = gsap.utils.toArray<HTMLElement>(".hero-slide", root);
    const inners = gsap.utils.toArray<HTMLElement>(".hero-slide-inner", root);
    if (!slides.length) return;

    gsap.set(slides, { opacity: 0, zIndex: 0 });
    gsap.set(inners, { scale: 1.04, xPercent: 0, yPercent: 0 });
    gsap.set(slides[0], { opacity: 1, zIndex: 1 });

    const master = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });
    const hold = 6.5;
    const fade = 2;

    slides.forEach((slide, index) => {
      const inner = inners[index];
      const start = index * (hold + fade);

      master.set(slide, { opacity: 1, zIndex: 2 }, start);
      master.fromTo(
        inner,
        {
          scale: 1.04,
          xPercent: index % 2 === 0 ? 0 : 1,
          yPercent: index % 2 === 0 ? 0 : -0.5,
        },
        {
          scale: 1.14,
          xPercent: index % 2 === 0 ? -2.5 : 2.5,
          yPercent: index % 2 === 0 ? -1.5 : 1.5,
          duration: hold + fade,
          ease: "none",
        },
        start,
      );
      master.to(slide, { opacity: 0, duration: fade }, start + hold);
      master.set(slide, { zIndex: 0 }, start + hold + fade);
    });

    return () => {
      master.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-[#FAFAF8]">
      {HERO_SLIDES.map((slide) => (
        <div key={slide.src} className="hero-slide absolute inset-0 opacity-0">
          <div
            className="hero-slide-inner absolute inset-[-8%] bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(250,250,248,0.05)_0%,rgba(250,250,248,0.55)_72%,rgba(250,250,248,0.95)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,169,98,0.12),transparent_45%)]" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  stagger?: number;
  start?: string;
  flip?: boolean;
};

export function useScrollReveal<T extends HTMLElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T>(null);
  const { y = 48, stagger = 0.12, start = "top 85%", flip = false } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll("[data-reveal]");
    const ctx = gsap.context(() => {
      if (flip) {
        gsap.fromTo(
          el,
          { y: 56, rotateX: 8, opacity: 0.88, transformPerspective: 900 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (!items.length) return;

      gsap.set(items, { opacity: 0, y });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          scroller: document.documentElement,
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, stagger, start, flip]);

  return ref;
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  stagger?: number;
  start?: string;
};

export function useScrollReveal<T extends HTMLElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T>(null);
  const { y = 48, stagger = 0.12, start = "top 85%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, stagger, start]);

  return ref;
}

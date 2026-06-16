"use client";

/**
 * usePageParallax — GSAP ScrollTrigger parallax.
 * Works with the Lenis + ScrollTrigger proxy setup in SmoothScrollProvider.
 *
 * data-parallax="bg"    → slow background drift (videos, large bgs)
 * data-parallax="mid"   → medium depth (frames, decorative blocks)
 * data-parallax="fg"    → foreground (icons, labels)
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePageParallax() {
  useEffect(() => {
    // Defer until after Lenis + ScrollTrigger proxy are ready
    const timer = setTimeout(() => {
      const scroller = document.documentElement;

      const ctx = gsap.context(() => {

        // ── Slow background layer ──────────────────────────────
        gsap.utils.toArray<HTMLElement>('[data-parallax="bg"]').forEach((el) => {
          const section =
            el.closest("[data-parallax-section]") ?? el.parentElement;
          gsap.fromTo(
            el,
            { y: "-10%" },
            {
              y: "10%",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
                scroller,
              },
            },
          );
        });

        // ── Mid layer ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>('[data-parallax="mid"]').forEach((el) => {
          const section =
            el.closest("[data-parallax-section]") ?? el.parentElement;
          gsap.fromTo(
            el,
            { y: "-6%" },
            {
              y: "6%",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
                scroller,
              },
            },
          );
        });

        // ── Foreground layer ──────────────────────────────────
        gsap.utils.toArray<HTMLElement>('[data-parallax="fg"]').forEach((el) => {
          const section =
            el.closest("[data-parallax-section]") ?? el.parentElement;
          gsap.fromTo(
            el,
            { y: "4%" },
            {
              y: "-4%",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                scroller,
              },
            },
          );
        });

        // Refresh after setup
        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 500);

    return () => clearTimeout(timer);
  }, []);
}

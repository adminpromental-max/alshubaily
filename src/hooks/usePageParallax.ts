"use client";

/**
 * usePageParallax — GSAP ScrollTrigger parallax for the homepage.
 *
 * Usage: call once in HomePage (or any page root).
 * Elements are selected by data attributes, so no prop drilling needed.
 *
 * Parallax layers:
 *   data-parallax="bg"      → slow background drift (videos, images)  –25% → +25%
 *   data-parallax="mid"     → medium depth (section titles, frames)   –15% → +15%
 *   data-parallax="fg"      → foreground drift (text, badges)         –8%  → +8%
 *   data-parallax="float"   → upward float as section enters          starts below
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePageParallax() {
  useEffect(() => {
    // Wait a tick for DOM to settle
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // ── Background layer (videos, large section bgs) ────────────────
        gsap.utils.toArray<HTMLElement>('[data-parallax="bg"]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: "-12%" },
            {
              y: "12%",
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("[data-parallax-section]") ?? el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });

        // ── Mid layer (section frames, decorative blocks) ───────────────
        gsap.utils.toArray<HTMLElement>('[data-parallax="mid"]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: "-8%" },
            {
              y: "8%",
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("[data-parallax-section]") ?? el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            },
          );
        });

        // ── Foreground layer (headlines, eyebrows) ──────────────────────
        gsap.utils.toArray<HTMLElement>('[data-parallax="fg"]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: "5%" },
            {
              y: "-5%",
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("[data-parallax-section]") ?? el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.4,
              },
            },
          );
        });

        // ── Float-in on enter (section titles, stats) ───────────────────
        gsap.utils.toArray<HTMLElement>('[data-parallax="float"]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);
}

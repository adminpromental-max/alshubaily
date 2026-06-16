"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/lang-context";
import { CHAIRMAN_CONTENT } from "@/data/site-content";
import { GROUP_HERO_LOGO } from "@/data/group-logos";

gsap.registerPlugin(ScrollTrigger);

const HeroCinematic = dynamic(
  () => import("./HeroCinematic").then((m) => m.HeroCinematic),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0A0A0A]" />,
  },
);

export function HeroChairmanSequence() {
  const { t, lang } = useLang();
  const chairmanRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const quote =
    lang === "ar" ? CHAIRMAN_CONTENT.quoteAr : CHAIRMAN_CONTENT.quoteEn;
  const words = quote.split(/\s+/);

  useEffect(() => {
    const chairman = chairmanRef.current;
    const wordsEl = wordsRef.current;
    if (!chairman) return;

    const wordSpans = wordsEl?.querySelectorAll(".chairman-word");

    const ctx = gsap.context(() => {
      // Arrow pulse animation
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: "sine.inOut",
        });
      }

      // Word reveal on scroll
      if (wordSpans?.length) {
        gsap.set(wordSpans, { opacity: 0, y: 14, filter: "blur(3px)" });
        gsap.to(wordSpans, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.028,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chairman,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Logo fade-in
      if (logoRef.current) {
        gsap.set(logoRef.current, { opacity: 0, y: 20 });
        gsap.to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chairman,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Eyebrow
      const eyebrow = chairman.querySelector(".chairman-eyebrow");
      if (eyebrow) {
        gsap.set(eyebrow, { opacity: 0, y: 10 });
        gsap.to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chairman,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, chairman);

    return () => ctx.revert();
  }, [lang]);

  return (
    <>
      {/* ── Hero — full viewport height ──────────────────────── */}
      <div
        data-parallax-section
        className="hero-full-screen relative w-full bg-[#0A0A0A]"
      >
        {/* Cinematic video — oversized for parallax headroom */}
        <div className="absolute inset-[-8%] overflow-hidden" data-parallax="bg">
          <HeroCinematic />
        </div>

        {/* Bottom gradient fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
          style={{ height: "35%" }}
          aria-hidden
        >
          <div className="h-full w-full bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
        </div>

        {/* Scroll arrow */}
        <div
          ref={arrowRef}
          className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2"
          aria-hidden
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/8 backdrop-blur-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="text-white/70"
            >
              <path
                d="M9 3.5v11M9 14.5l-4-4M9 14.5l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Vision & Message ─────────────────────────────────── */}
      <section
        ref={chairmanRef}
        id="chairman"
        data-parallax-section
        className="relative bg-[#0A0A0A] px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="chairman-eyebrow text-[11px] tracking-[0.45em] text-[#C9A962] uppercase">
            {t(CHAIRMAN_CONTENT.eyebrowAr, CHAIRMAN_CONTENT.eyebrowEn)}
          </p>

          <div ref={logoRef} className="mx-auto mt-6 w-full max-w-[340px] md:mt-8 md:max-w-[420px]">
            <Image
              src={GROUP_HERO_LOGO}
              alt={t("مجموعة الشبيلي العقارية", "AlShubaily Group")}
              width={800}
              height={320}
              unoptimized
              className="mx-auto h-auto w-full object-contain drop-shadow-[0_8px_28px_rgba(201,169,98,0.3)]"
              priority
            />
          </div>

          <p
            ref={wordsRef}
            className="mt-6 text-[15px] leading-[1.95] text-white/72 md:mt-8 md:text-lg md:leading-[2.05]"
          >
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="chairman-word inline-block">
                {word}&nbsp;
              </span>
            ))}
          </p>

          <div className="mt-8 md:mt-10">
            <p className="font-heading text-xl font-semibold text-white md:text-2xl">
              {t(CHAIRMAN_CONTENT.nameAr, CHAIRMAN_CONTENT.nameEn)}
            </p>
            <p className="mt-2 text-xs tracking-wide text-[#C9A962]/85 md:text-sm">
              {t(CHAIRMAN_CONTENT.roleAr, CHAIRMAN_CONTENT.roleEn)}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

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
    loading: () => (
      <div className="absolute inset-0 animate-pulse bg-[#1A1612]" />
    ),
  },
);

export function HeroChairmanSequence() {
  const { t, lang } = useLang();
  const chairmanRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);

  const quote =
    lang === "ar" ? CHAIRMAN_CONTENT.quoteAr : CHAIRMAN_CONTENT.quoteEn;
  const words = quote.split(/\s+/);

  useEffect(() => {
    const chairman = chairmanRef.current;
    const wordsEl = wordsRef.current;
    if (!chairman) return;

    const wordSpans = wordsEl?.querySelectorAll(".chairman-word");

    const ctx = gsap.context(() => {
      if (wordSpans?.length) {
        gsap.set(wordSpans, { opacity: 0, y: 14, filter: "blur(3px)" });
        gsap.to(wordSpans, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chairman,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (logoRef.current) {
        gsap.set(logoRef.current, { opacity: 0, y: 24 });
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

      // Eyebrow line reveal
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
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative w-full bg-[#0A0A0A]" style={{ height: "min(88svh, 860px)" }}>
        <div className="hero-cinematic-frame absolute inset-0 overflow-hidden">
          <HeroCinematic />
        </div>
        {/* Bottom fade into chairman section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
          style={{ height: "30%" }}
          aria-hidden
        >
          <div className="h-full w-full bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        </div>
      </div>

      {/* ── Chairman / Vision & Message ─────────────────────── */}
      <section
        ref={chairmanRef}
        id="chairman"
        className="relative bg-[#0A0A0A] px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="chairman-eyebrow text-[11px] tracking-[0.45em] text-[#C9A962] uppercase">
            {t(CHAIRMAN_CONTENT.eyebrowAr, CHAIRMAN_CONTENT.eyebrowEn)}
          </p>

          <div ref={logoRef} className="mx-auto mt-6 max-w-[260px] md:mt-8 md:max-w-[300px]">
            <Image
              src={GROUP_HERO_LOGO}
              alt={t("مجموعة الشبيلي العقارية", "AlShubaily Group")}
              width={800}
              height={320}
              unoptimized
              className="mx-auto h-auto w-full object-contain drop-shadow-[0_8px_24px_rgba(201,169,98,0.25)]"
              priority
            />
          </div>

          <p
            ref={wordsRef}
            className="mt-6 text-base leading-[1.9] text-white/75 md:mt-8 md:text-lg md:leading-[2]"
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
            <p className="mt-2 text-xs tracking-wide text-[#C9A962]/90 md:text-sm">
              {t(CHAIRMAN_CONTENT.roleAr, CHAIRMAN_CONTENT.roleEn)}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

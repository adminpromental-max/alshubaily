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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const chairmanRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);

  const quote =
    lang === "ar" ? CHAIRMAN_CONTENT.quoteAr : CHAIRMAN_CONTENT.quoteEn;
  const words = quote.split(/\s+/);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const hero = heroRef.current;
    const frame = frameRef.current;
    const chairman = chairmanRef.current;
    const wordsEl = wordsRef.current;
    if (!wrapper || !hero || !frame || !chairman) return;

    const wordSpans = wordsEl?.querySelectorAll(".chairman-word");

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=40%",
          pin: hero,
          scrub: 0.9,
          anticipatePin: 1,
        },
      });

      heroTl.fromTo(
        frame,
        {
          scale: 1,
          borderRadius: 0,
          borderColor: "rgba(201,169,98,0)",
          boxShadow: "0 0 0 rgba(201,169,98,0)",
        },
        {
          scale: 0.72,
          borderRadius: 22,
          borderColor: "rgba(201, 169, 98, 0.5)",
          boxShadow: "0 32px 80px rgba(201, 169, 98, 0.2)",
          ease: "power2.inOut",
        },
        0,
      );

      heroTl.to(frame, { opacity: 0.15, y: -48, ease: "power2.in" }, 0.55);

      if (wordSpans?.length) {
        gsap.fromTo(
          wordSpans,
          { opacity: 0, y: 18, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.035,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chairman,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chairman,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, wrapper);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={wrapperRef} className="hero-chairman-wrapper">
      <div
        ref={heroRef}
        className="relative flex h-[min(68svh,620px)] min-h-[380px] w-full items-center justify-center overflow-hidden bg-[#0A0A0A] max-lg:h-[min(58svh,480px)] max-lg:min-h-[340px]"
      >
        <div
          ref={frameRef}
          className="hero-cinematic-frame absolute inset-3 overflow-hidden border border-solid border-transparent bg-[#1A1612] will-change-transform md:inset-5"
        >
          <HeroCinematic />
        </div>
      </div>

      <section
        ref={chairmanRef}
        id="chairman"
        className="section-overlap section-overlap--dark relative z-10 bg-[#0A0A0A] px-5 py-12 md:px-8 md:py-16"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] tracking-[0.45em] text-[#C9A962] uppercase">
            {t(CHAIRMAN_CONTENT.eyebrowAr, CHAIRMAN_CONTENT.eyebrowEn)}
          </p>

          <div ref={logoRef} className="mx-auto mt-6 max-w-[240px] md:mt-8 md:max-w-xs">
            <Image
              src={GROUP_HERO_LOGO}
              alt={t("مجموعة الشبيلي العقارية", "AlShubaily Group")}
              width={800}
              height={320}
              unoptimized
              className="mx-auto h-auto w-full object-contain"
              priority
            />
          </div>

          <p
            ref={wordsRef}
            className="mt-6 text-base leading-[1.95] text-white/78 md:mt-8 md:text-lg md:leading-[2]"
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
    </div>
  );
}

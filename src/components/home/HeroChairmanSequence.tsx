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
      gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=22%",
          pin: hero,
          scrub: 0.65,
          anticipatePin: 1,
        },
      })
        .fromTo(
          frame,
          {
            scale: 1,
            borderRadius: 0,
            borderColor: "rgba(201,169,98,0)",
            boxShadow: "0 0 0 rgba(201,169,98,0)",
          },
          {
            scale: 0.78,
            borderRadius: 20,
            borderColor: "rgba(201, 169, 98, 0.45)",
            boxShadow: "0 24px 64px rgba(201, 169, 98, 0.18)",
            ease: "power2.inOut",
          },
          0,
        )
        .to(frame, { opacity: 0.2, y: -36, ease: "power2.in" }, 0.5);

      if (wordSpans?.length) {
        gsap.fromTo(
          wordSpans,
          { opacity: 0, y: 14, filter: "blur(3px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chairman,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chairman,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, wrapper);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div
      ref={wrapperRef}
      className="hero-chairman-wrapper relative overflow-hidden bg-[#0A0A0A]"
    >
      <div
        ref={heroRef}
        className="relative z-[1] h-[min(52svh,520px)] w-full max-lg:h-[min(46svh,420px)]"
      >
        <div
          ref={frameRef}
          className="hero-cinematic-frame absolute inset-2 overflow-hidden border border-solid border-transparent bg-[#1A1612] will-change-transform md:inset-4"
        >
          <HeroCinematic />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      <section
        ref={chairmanRef}
        id="chairman"
        className="section-overlap section-overlap--tight relative z-10 -mt-14 bg-[#0A0A0A] px-5 pb-10 pt-2 md:-mt-20 md:pb-14 md:pt-4"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] tracking-[0.45em] text-[#C9A962] uppercase">
            {t(CHAIRMAN_CONTENT.eyebrowAr, CHAIRMAN_CONTENT.eyebrowEn)}
          </p>

          <div ref={logoRef} className="mx-auto mt-5 max-w-[260px] md:mt-6 md:max-w-[300px]">
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
            className="mt-5 text-base leading-[1.9] text-white/78 md:mt-6 md:text-lg md:leading-[2]"
          >
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="chairman-word inline-block">
                {word}&nbsp;
              </span>
            ))}
          </p>

          <div className="mt-7 md:mt-8">
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

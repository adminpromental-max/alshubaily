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
  const sequenceRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const chairmanRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);

  const quote =
    lang === "ar" ? CHAIRMAN_CONTENT.quoteAr : CHAIRMAN_CONTENT.quoteEn;
  const words = quote.split(/\s+/);

  useEffect(() => {
    const sequence = sequenceRef.current;
    const pin = pinRef.current;
    const frame = frameRef.current;
    const chairman = chairmanRef.current;
    const logo = logoRef.current;
    const wordsEl = wordsRef.current;
    if (!sequence || !pin || !frame || !chairman) return;

    const wordSpans = wordsEl?.querySelectorAll(".chairman-word");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sequence,
          start: "top top",
          end: "+=130%",
          pin: pin,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        frame,
        {
          scale: 1,
          borderRadius: 0,
          borderWidth: 0,
          boxShadow: "0 0 0 rgba(201,169,98,0)",
        },
        {
          scale: 0.78,
          borderRadius: 28,
          borderWidth: 2,
          borderColor: "rgba(201, 169, 98, 0.55)",
          boxShadow: "0 40px 120px rgba(201, 169, 98, 0.22)",
          ease: "power2.inOut",
        },
        0,
      );

      tl.fromTo(
        chairman,
        { opacity: 0, y: 120 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.15,
      );

      if (logo) {
        tl.fromTo(
          logo,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out" },
          0.35,
        );
      }

      if (wordSpans?.length) {
        tl.fromTo(
          wordSpans,
          { opacity: 0, x: 36, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            ease: "power3.out",
          },
          0.4,
        );
      }

      if (logo) {
        gsap.to(logo, {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: sequence,
            start: "top top",
            end: "+=130%",
            scrub: 1.5,
          },
        });
      }
    }, sequence);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={sequenceRef} className="hero-chairman-sequence relative">
      <div
        ref={pinRef}
        className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-[#0A0A0A]"
      >
        <div
          ref={chairmanRef}
          id="chairman"
          className="chairman-layer absolute inset-0 z-0 flex items-center justify-center px-6 pb-24 pt-28 opacity-0 md:px-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] tracking-[0.45em] text-[#C9A962] uppercase">
              {t(CHAIRMAN_CONTENT.eyebrowAr, CHAIRMAN_CONTENT.eyebrowEn)}
            </p>

            <div ref={logoRef} className="mx-auto mt-8 max-w-xs md:max-w-sm">
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
              className="mt-8 text-lg leading-[2] text-white/75 md:text-xl md:leading-[2.1]"
            >
              {words.map((word, i) => (
                <span key={`${word}-${i}`} className="chairman-word inline-block">
                  {word}&nbsp;
                </span>
              ))}
            </p>

            <div className="mt-10">
              <p className="font-heading text-2xl font-semibold text-white md:text-3xl">
                {t(CHAIRMAN_CONTENT.nameAr, CHAIRMAN_CONTENT.nameEn)}
              </p>
              <p className="mt-2 text-sm tracking-wide text-[#C9A962]/90">
                {t(CHAIRMAN_CONTENT.roleAr, CHAIRMAN_CONTENT.roleEn)}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 md:p-8">
          <div
            ref={frameRef}
            className="hero-cinematic-frame relative h-full w-full max-w-[1600px] overflow-hidden border border-solid border-transparent bg-[#1A1612] will-change-transform"
          >
            <HeroCinematic />
          </div>
        </div>
      </div>
    </div>
  );
}

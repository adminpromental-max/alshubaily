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
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=18%",
            pin: hero,
            scrub: 0.55,
            anticipatePin: 1,
          },
        })
          .fromTo(
            frame,
            {
              scale: 1,
              borderRadius: 0,
              borderColor: "rgba(201,169,98,0)",
            },
            {
              scale: 0.84,
              borderRadius: 18,
              borderColor: "rgba(201, 169, 98, 0.4)",
              ease: "power2.inOut",
            },
            0,
          )
          .to(frame, { opacity: 0.35, ease: "power2.in" }, 0.55);
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          frame,
          { scale: 1, opacity: 1 },
          {
            scale: 0.96,
            opacity: 0.92,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.35,
            },
          },
        );
      });

      if (wordSpans?.length) {
        gsap.fromTo(
          wordSpans,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.025,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chairman,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chairman,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, wrapper);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={wrapperRef} className="hero-chairman-wrapper bg-[#0A0A0A]">
      <div
        ref={heroRef}
        className="relative z-[1] h-[58svh] min-h-[400px] w-full lg:h-[min(72svh,720px)] lg:min-h-[520px]"
      >
        <div
          ref={frameRef}
          className="hero-cinematic-frame absolute inset-0 overflow-hidden bg-[#1A1612] will-change-transform lg:inset-3 lg:rounded-xl"
        >
          <HeroCinematic />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-16 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent lg:h-20" />
      </div>

      <section
        ref={chairmanRef}
        id="chairman"
        className="relative z-10 bg-[#0A0A0A] px-4 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8 lg:-mt-10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] tracking-[0.4em] text-[#C9A962] uppercase md:text-[11px] md:tracking-[0.45em]">
            {t(CHAIRMAN_CONTENT.eyebrowAr, CHAIRMAN_CONTENT.eyebrowEn)}
          </p>

          <div ref={logoRef} className="mx-auto mt-5 max-w-[220px] md:mt-6 md:max-w-[280px]">
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
            className="mt-5 text-[15px] leading-[1.85] text-white/78 md:mt-6 md:text-lg md:leading-[2]"
          >
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="chairman-word inline-block">
                {word}&nbsp;
              </span>
            ))}
          </p>

          <div className="mt-6 md:mt-8">
            <p className="font-heading text-lg font-semibold text-white md:text-2xl">
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

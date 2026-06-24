"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Target } from "lucide-react";
import { useLang } from "@/contexts/lang-context";
import { CHAIRMAN_CONTENT, VISION_MISSION } from "@/data/site-content";

gsap.registerPlugin(ScrollTrigger);

const HeroVideoBackground = dynamic(
  () => import("./HeroVideoBackground").then((m) => m.HeroVideoBackground),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0A0A0A]" />,
  },
);

export function HeroChairmanSequence() {
  const { t, lang } = useLang();
  const chairmanRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const quote =
    lang === "ar" ? CHAIRMAN_CONTENT.quoteAr : CHAIRMAN_CONTENT.quoteEn;
  const words = quote.split(/\s+/);
  const isRTL = lang === "ar";

  useEffect(() => {
    const chairman = chairmanRef.current;
    const wordsEl = wordsRef.current;
    if (!chairman) return;

    const wordSpans = wordsEl?.querySelectorAll(".chairman-word");
    const cards = chairman.querySelectorAll<HTMLElement>(".vm-glass-card");
    const signature = signatureRef.current;

    const ctx = gsap.context(() => {
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: "sine.inOut",
        });
      }

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

      if (signature) {
        gsap.set(signature, { opacity: 0, y: 16 });
        gsap.to(signature, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chairman,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 28, scale: 0.97 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chairman,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, chairman);

    return () => ctx.revert();
  }, [lang]);

  return (
    <>
      <div
        data-parallax-section
        className="hero-full-screen relative w-full overflow-hidden bg-[#0A0A0A]"
      >
        <div
          data-parallax="bg"
          className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
        >
          <HeroVideoBackground />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
          style={{ height: "35%" }}
          aria-hidden
        >
          <div className="h-full w-full bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
        </div>

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

      <section
        ref={chairmanRef}
        id="chairman"
        data-parallax-section
        className="relative bg-[#0A0A0A] px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p
            ref={wordsRef}
            className="text-[15px] leading-[1.95] text-white/72 md:text-lg md:leading-[2.05]"
          >
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="chairman-word inline-block">
                {word}&nbsp;
              </span>
            ))}
          </p>

          <div ref={signatureRef} className="mt-8 md:mt-10">
            <p
              className="text-xl font-semibold italic text-white md:text-2xl"
              style={{ fontFamily: '"Cairo", "Brush Script MT", cursive' }}
            >
              {t(
                CHAIRMAN_CONTENT.signatureNameAr,
                CHAIRMAN_CONTENT.signatureNameEn,
              )}
            </p>
            <div className="mx-auto mt-3 h-px w-32 bg-gradient-to-r from-transparent via-[#C9A962]/60 to-transparent" />
            <p className="mt-3 text-xs tracking-wide text-[#C9A962]/85 md:text-sm">
              {t(CHAIRMAN_CONTENT.roleAr, CHAIRMAN_CONTENT.roleEn)}
            </p>
            <p className="mt-1 font-heading text-lg font-semibold text-white md:text-xl">
              {t(CHAIRMAN_CONTENT.nameAr, CHAIRMAN_CONTENT.nameEn)}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
            <div className="vm-glass-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-start backdrop-blur-2xl transition-all duration-500 hover:border-[#C9A962]/40 hover:bg-white/[0.09] md:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C9A962]/30 bg-[#C9A962]/10 text-[#C9A962]">
                  <Eye className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {t(VISION_MISSION.visionTitleAr, VISION_MISSION.visionTitleEn)}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                    {t(VISION_MISSION.visionAr, VISION_MISSION.visionEn)}
                  </p>
                </div>
              </div>
            </div>

            <div className="vm-glass-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-start backdrop-blur-2xl transition-all duration-500 hover:border-[#C9A962]/40 hover:bg-white/[0.09] md:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C9A962]/30 bg-[#C9A962]/10 text-[#C9A962]">
                  <Target className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {t(
                      VISION_MISSION.missionTitleAr,
                      VISION_MISSION.missionTitleEn,
                    )}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                    {t(VISION_MISSION.missionAr, VISION_MISSION.missionEn)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

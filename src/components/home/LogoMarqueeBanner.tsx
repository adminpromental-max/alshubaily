"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLang } from "@/contexts/lang-context";
import { GROUP_HERO_LOGO, GROUP_SUBSIDIARIES } from "@/data/group-logos";

// Triple for seamless infinite loop
const MARQUEE_ITEMS = [
  ...GROUP_SUBSIDIARIES,
  ...GROUP_SUBSIDIARIES,
  ...GROUP_SUBSIDIARIES,
];

// Fallback icon path — replaced once user uploads Icon.png
const GROUP_ICON = GROUP_HERO_LOGO;

export function LogoMarqueeBanner() {
  const { t, lang } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resume = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <section
      id="group"
      className="section-overlap section-overlap--dark relative overflow-hidden"
    >
      {/* ── Background video ─────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          aria-hidden
          poster="/assets/hero/Hero-1.jpg"
        >
          {/* swap to /assets/banner-bg.mp4 once uploaded */}
          <source src="/assets/intro/intro.mp4" type="video/mp4" />
        </video>

        {/* Heavy dark overlay so logos are readable */}
        <div className="absolute inset-0 bg-[#060504]/75" />

        {/* Top & bottom vignette to blend with adjacent sections */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 py-7 md:py-10">

        {/* Icon + 2-word label (compact header) */}
        <div className="mx-auto mb-5 flex flex-col items-center gap-2 px-5 text-center md:mb-7">
          <div className="banner-icon-wrap">
            <Image
              src={GROUP_ICON}
              alt={t("مجموعة الشبيلي", "AlShubaily Group")}
              width={160}
              height={160}
              unoptimized
              priority
              className="h-full w-full object-contain drop-shadow-[0_4px_16px_rgba(201,169,98,0.4)]"
            />
          </div>
          <p className="text-[11px] font-semibold tracking-[0.35em] text-white/70 uppercase">
            {t("مجموعة الشبيلي", "AlShubaily Group")}
          </p>
        </div>

        {/* ── Marquee ──────────────────────────────────── */}
        <div
          className="marquee-viewport"
          onMouseEnter={pause}
          onMouseLeave={resume}
          aria-label={t("شركات مجموعة الشبيلي", "AlShubaily Group Companies")}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#060504]/85 to-transparent md:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#060504]/85 to-transparent md:w-36" />

          <div ref={trackRef} className="marquee-track">
            {MARQUEE_ITEMS.map((company, idx) => (
              <div
                key={`${company.id}-${idx}`}
                className="glass-logo-card group"
                title={lang === "ar" ? company.nameAr : company.nameEn}
              >
                {/* Glass frame layers */}
                <div className="glass-logo-shine" aria-hidden />
                <div className="glass-logo-border" aria-hidden />

                {/* Logo image */}
                <div className="glass-logo-inner">
                  <Image
                    src={company.logo}
                    alt={lang === "ar" ? company.nameAr : company.nameEn}
                    width={360}
                    height={140}
                    unoptimized
                    className="glass-logo-img"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

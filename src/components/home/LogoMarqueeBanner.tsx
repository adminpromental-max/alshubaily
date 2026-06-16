"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { useLang } from "@/contexts/lang-context";
import { GROUP_ICON, GROUP_SUBSIDIARIES } from "@/data/group-logos";

// Banner now uses the cinematic image slideshow (swapped from hero)
const HeroCinematic = dynamic(
  () => import("./HeroCinematic").then((m) => m.HeroCinematic),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#080605]" /> },
);

const MARQUEE_ITEMS = [
  ...GROUP_SUBSIDIARIES,
  ...GROUP_SUBSIDIARIES,
  ...GROUP_SUBSIDIARIES,
];

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
      data-parallax-section
      className="relative overflow-hidden bg-[#050402]"
    >
      {/* ── Cinematic slideshow bg ────────────────────────────────── */}
      <div
        data-parallax="bg"
        className="absolute inset-x-0 -top-[14%] -bottom-[14%] z-0"
        aria-hidden
      >
        <HeroCinematic />
      </div>

      {/* Overlay — reduced opacity so cinematic slideshow shines through */}
      <div className="absolute inset-0 z-[1] bg-[#050402]/38" />
      {/* Vignettes */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-[#0A0A0A]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 py-14 md:py-20 lg:py-28">

        {/* Icon + label */}
        <div data-parallax="fg" className="mx-auto mb-6 flex flex-col items-center gap-2 px-5 text-center md:mb-8">
          <div className="banner-icon-wrap">
            <Image
              src={GROUP_ICON}
              alt={t("مجموعة الشبيلي", "AlShubaily Group")}
              width={160}
              height={160}
              unoptimized
              priority
              className="h-full w-full object-contain drop-shadow-[0_4px_20px_rgba(201,169,98,0.5)]"
            />
          </div>
          <p className="text-[10px] font-semibold tracking-[0.4em] text-white/60 uppercase">
            {t("مجموعة الشبيلي", "AlShubaily Group")}
          </p>
        </div>

        {/* ── Marquee ──────────────────────────────────────────── */}
        <div
          className="marquee-viewport"
          onMouseEnter={pause}
          onMouseLeave={resume}
          aria-label={t("شركات مجموعة الشبيلي", "AlShubaily Group Companies")}
        >
          <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-20 bg-gradient-to-r from-[#050402]/90 to-transparent md:w-36" />
          <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-20 bg-gradient-to-l from-[#050402]/90 to-transparent md:w-36" />

          <div ref={trackRef} className="marquee-track">
            {MARQUEE_ITEMS.map((company, idx) => (
              <div
                key={`${company.id}-${idx}`}
                className="marquee-logo-pill"
                title={lang === "ar" ? company.nameAr : company.nameEn}
              >
                <Image
                  src={company.logo}
                  alt={lang === "ar" ? company.nameAr : company.nameEn}
                  width={360}
                  height={140}
                  unoptimized
                  className="marquee-logo-bare"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

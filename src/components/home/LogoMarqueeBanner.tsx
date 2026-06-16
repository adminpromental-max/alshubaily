"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLang } from "@/contexts/lang-context";
import { GROUP_ICON, BANNER_VIDEO, GROUP_SUBSIDIARIES } from "@/data/group-logos";

// Triple the list for a seamless infinite loop
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
      className="relative overflow-hidden bg-[#050402]"
    >
      {/* ── Background video — full width, no skew ─────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          aria-hidden
          poster="/assets/hero/Hero-1.jpg"
          style={{ display: "block" }}
        >
          {/* MP4 via Cloudinary auto-convert */}
          <source src={BANNER_VIDEO} type="video/mp4" />
          {/* Original .mov fallback */}
          <source
            src="https://res.cloudinary.com/dfzaghfsv/video/upload/v1781615121/banner-video_ciymr0.mov"
            type="video/quicktime"
          />
        </video>

        {/* Dark overlay so logos pop */}
        <div className="absolute inset-0 bg-[#050402]/78" />

        {/* Bottom vignette */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 py-10 md:py-14">

        {/* Icon + label */}
        <div className="mx-auto mb-6 flex flex-col items-center gap-2 px-5 text-center md:mb-8">
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

        {/* ── Marquee track ──────────────────────────────────────── */}
        <div
          className="marquee-viewport"
          onMouseEnter={pause}
          onMouseLeave={resume}
          aria-label={t("شركات مجموعة الشبيلي", "AlShubaily Group Companies")}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-20 bg-gradient-to-r from-[#050402]/90 to-transparent md:w-36" />
          <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-20 bg-gradient-to-l from-[#050402]/90 to-transparent md:w-36" />

          <div ref={trackRef} className="marquee-track">
            {MARQUEE_ITEMS.map((company, idx) => (
              <div
                key={`${company.id}-${idx}`}
                className="glass-logo-card group"
                title={lang === "ar" ? company.nameAr : company.nameEn}
              >
                <div className="glass-logo-shine" aria-hidden />
                <div className="glass-logo-border" aria-hidden />
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

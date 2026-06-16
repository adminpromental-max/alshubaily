"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLang } from "@/contexts/lang-context";
import { GROUP_HERO_LOGO, GROUP_SUBSIDIARIES } from "@/data/group-logos";
import { cn } from "@/lib/utils";

// Triple the logos so the marquee loop looks seamless at all speeds
const MARQUEE_ITEMS = [
  ...GROUP_SUBSIDIARIES,
  ...GROUP_SUBSIDIARIES,
  ...GROUP_SUBSIDIARIES,
];

export function LogoMarqueeBanner() {
  const { t, lang } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);

  // Pause on hover
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
      {/* ── Background video ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          aria-hidden
          /* fallback to first hero image if video fails */
          poster="/assets/hero/Hero-1.jpg"
        >
          <source src="/assets/intro/intro.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay — heavier so logos are clearly visible */}
        <div className="absolute inset-0 bg-[#060504]/72" />

        {/* Subtle noise/grain texture */}
        <div
          className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />

        {/* Top + bottom vignette */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative z-10 py-14 md:py-18">
        {/* Section label + hero logo */}
        <div className="mx-auto mb-10 max-w-4xl px-5 text-center md:mb-12 md:px-8">
          <p className="text-[11px] tracking-[0.45em] text-[#C9A962] uppercase">
            {t("هيكل المجموعة", "Group Structure")}
          </p>
          <div className="mx-auto mt-5 w-full max-w-[300px] md:mt-6 md:max-w-[380px]">
            <Image
              src={GROUP_HERO_LOGO}
              alt={t("مجموعة الشبيلي العقارية", "AlShubaily Real Estate Group")}
              width={800}
              height={320}
              unoptimized
              priority
              className="h-auto w-full object-contain drop-shadow-[0_4px_20px_rgba(201,169,98,0.35)]"
            />
          </div>
          <p className="mt-3 text-sm text-white/40 md:text-base">
            {t(
              "منظومة متكاملة من الشركات التابعة تحت مظلة واحدة",
              "An integrated ecosystem of subsidiaries under one umbrella",
            )}
          </p>
        </div>

        {/* ── Marquee track ─────────────────────────────────── */}
        <div
          className="marquee-viewport"
          onMouseEnter={pause}
          onMouseLeave={resume}
          aria-label={t("شركات مجموعة الشبيلي", "AlShubaily Group Companies")}
        >
          {/* Left + right edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#060504]/80 to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#060504]/80 to-transparent md:w-32" />

          <div ref={trackRef} className="marquee-track">
            {MARQUEE_ITEMS.map((company, idx) => (
              <div
                key={`${company.id}-${idx}`}
                className="marquee-logo-item group"
                title={lang === "ar" ? company.nameAr : company.nameEn}
              >
                <Image
                  src={company.logo}
                  alt={lang === "ar" ? company.nameAr : company.nameEn}
                  width={480}
                  height={160}
                  unoptimized
                  className={cn(
                    "marquee-logo-img",
                    "transition-all duration-300",
                    "brightness-75 group-hover:brightness-110 group-hover:scale-110",
                    "filter group-hover:drop-shadow-[0_0_18px_rgba(201,169,98,0.6)]",
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

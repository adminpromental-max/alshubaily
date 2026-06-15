"use client";

import Image from "next/image";
import { useLang } from "@/contexts/lang-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  GROUP_HERO_LOGO,
  GROUP_SUBSIDIARIES,
} from "@/data/group-logos";
import { cn } from "@/lib/utils";

export function GroupSection() {
  const { t, lang } = useLang();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 36, stagger: 0.08 });

  const rows = [
    GROUP_SUBSIDIARIES.slice(0, 3),
    GROUP_SUBSIDIARIES.slice(3, 6),
  ];

  return (
    <section
      ref={sectionRef}
      className="section-overlap section-overlap--dark group-metallic relative overflow-hidden py-14 md:py-20"
    >
      <div className="group-metallic-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="group-metallic-shine pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] tracking-[0.4em] text-[#C9A962] uppercase">
            {t("هيكل المجموعة", "Group Structure")}
          </p>
          <h2 className="font-heading mt-3 text-2xl font-semibold text-white md:text-4xl">
            {t("مجموعة الشبيلي العقارية", "AlShubaily Real Estate Group")}
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/45 md:text-base">
            {t(
              "منظومة متكاملة من الشركات التابعة تحت مظلة واحدة",
              "An integrated ecosystem of subsidiaries under one umbrella",
            )}
          </p>
        </div>

        <div data-reveal className="relative mx-auto mt-10 flex justify-center md:mt-12">
          <div className="logo-frame logo-frame--hero logo-frame--dark group">
            <div className="logo-frame-glow logo-frame-glow--dark" aria-hidden />
            <div className="logo-frame-inner logo-frame-inner--hero logo-frame-inner--dark">
              <Image
                src={GROUP_HERO_LOGO}
                alt={t("مجموعة الشبيلي العقارية", "AlShubaily Real Estate Group")}
                width={800}
                height={320}
                unoptimized
                className="relative z-[1] h-auto w-full max-w-[240px] object-contain md:max-w-[300px]"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-5 md:mt-10 md:space-y-6">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              data-reveal
              className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
            >
              {row.map((company) => (
                <div key={company.id} className="flex justify-center">
                  <div className="logo-frame logo-frame--sub logo-frame--dark group w-full max-w-[240px]">
                    <div
                      className="logo-frame-glow logo-frame-glow--sub logo-frame-glow--dark"
                      aria-hidden
                    />
                    <div className="logo-frame-inner logo-frame-inner--sub logo-frame-inner--dark">
                      <Image
                        src={company.logo}
                        alt={lang === "ar" ? company.nameAr : company.nameEn}
                        width={480}
                        height={192}
                        unoptimized
                        className="relative z-[1] h-14 w-full object-contain md:h-16"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-2 md:mt-10 md:gap-2.5"
        >
          {GROUP_SUBSIDIARIES.map((company) => (
            <span
              key={company.id}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wide transition duration-300 md:text-[11px]",
                "border-[#C9A962]/30 bg-[#C9A962]/10 text-[#E8D5A3] hover:bg-[#C9A962]/18",
              )}
            >
              {lang === "ar" ? company.nameAr : company.nameEn}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

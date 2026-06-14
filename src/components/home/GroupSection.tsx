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
    <section ref={sectionRef} className="bg-[#FAFAF8] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
            {t("هيكل المجموعة", "Group Structure")}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold text-[#1A1612] md:text-5xl">
            {t("مجموعة الشبيلي العقارية", "AlShubaily Real Estate Group")}
          </h2>
          <p className="mt-4 text-sm leading-8 text-[#5C5348] md:text-base">
            {t(
              "منظومة متكاملة من الشركات التابعة تحت مظلة واحدة",
              "An integrated ecosystem of subsidiaries under one umbrella",
            )}
          </p>
        </div>

        <div data-reveal className="relative mx-auto mt-12 flex justify-center">
          <div className="logo-frame logo-frame--hero group">
            <div className="logo-frame-glow" aria-hidden />
            <div className="logo-frame-inner logo-frame-inner--hero">
              <Image
                src={GROUP_HERO_LOGO}
                alt={t("مجموعة الشبيلي العقارية", "AlShubaily Real Estate Group")}
                width={800}
                height={320}
                unoptimized
                className="relative z-[1] h-auto w-full max-w-[280px] object-contain md:max-w-[340px]"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-6 md:mt-12 md:space-y-8">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              data-reveal
              className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4 md:gap-5"
            >
              {row.map((company) => (
                <div key={company.id} className="flex justify-center">
                  <div className="logo-frame logo-frame--sub group w-full max-w-[260px]">
                    <div className="logo-frame-glow logo-frame-glow--sub" aria-hidden />
                    <div className="logo-frame-inner logo-frame-inner--sub">
                      <Image
                        src={company.logo}
                        alt={lang === "ar" ? company.nameAr : company.nameEn}
                        width={480}
                        height={192}
                        unoptimized
                        className="relative z-[1] h-[72px] w-full object-contain md:h-[84px]"
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
          className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-2 md:mt-12 md:gap-3"
        >
          {GROUP_SUBSIDIARIES.map((company) => (
            <span
              key={company.id}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-wide transition duration-300 md:px-4 md:text-[11px]",
                company.chipClass,
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

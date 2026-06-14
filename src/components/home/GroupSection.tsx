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

        <div data-reveal className="relative mx-auto mt-12 max-w-3xl">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_40%,rgba(201,169,98,0.18),transparent_65%)] blur-2xl" />

          <div className="group-hero-logo mx-auto flex max-w-sm flex-col items-center">
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#C9A962]/30 bg-white p-8 shadow-[0_24px_80px_rgba(201,169,98,0.18)] md:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,169,98,0.12),transparent_70%)]" />
              <div className="pointer-events-none absolute -inset-px rounded-[2rem] ring-1 ring-inset ring-[#C9A962]/20" />
              <Image
                src={GROUP_HERO_LOGO}
                alt={t("مجموعة الشبيلي العقارية", "AlShubaily Real Estate Group")}
                width={480}
                height={240}
                unoptimized
                className="relative mx-auto h-auto w-full max-w-[280px] object-contain md:max-w-[320px]"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-8 md:mt-12">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              data-reveal
              className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5"
            >
              {row.map((company) => (
                <div
                  key={company.id}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative w-full max-w-[220px] overflow-hidden rounded-2xl border border-[#E0D3C2]/70 bg-white p-5 shadow-[0_12px_40px_rgba(26,22,18,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#C9A962]/40 hover:shadow-[0_20px_50px_rgba(201,169,98,0.15)] md:p-6">
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_40%,rgba(201,169,98,0.14),transparent_70%)]" />
                    <Image
                      src={company.logo}
                      alt={lang === "ar" ? company.nameAr : company.nameEn}
                      width={200}
                      height={120}
                      unoptimized
                      className="relative mx-auto h-16 w-full object-contain md:h-20"
                    />
                  </div>

                  <span
                    className={cn(
                      "mt-3 inline-flex max-w-full items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-wide transition duration-300 md:text-[11px]",
                      company.chipClass,
                    )}
                  >
                    {lang === "ar" ? company.nameAr : company.nameEn}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

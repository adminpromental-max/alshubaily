"use client";

import Image from "next/image";
import { useLang } from "@/contexts/lang-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const COMPANIES = [
  { ar: "الشبيلي للتطوير العقاري", en: "AlShubaily Real Estate Development" },
  { ar: "الشبيلي للمقاولات", en: "AlShubaily Contracting" },
  { ar: "الشبيلي للاستثمار", en: "AlShubaily Investment" },
  { ar: "الشبيلي للضيافة", en: "AlShubaily Hospitality" },
  { ar: "الشبيلي للتجارة", en: "AlShubaily Trading" },
  { ar: "الشبيلي للخدمات", en: "AlShubaily Services" },
];

export function GroupSection() {
  const { t } = useLang();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 36, stagger: 0.08 });

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
            {t("هيكل المجموعة", "Group Structure")}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold text-[#1A1612] md:text-5xl">
            {t("6 شركات تابعة", "6 Subsidiary Companies")}
          </h2>
          <p className="mt-4 text-sm leading-8 text-[#5C5348] md:text-base">
            {t(
              "منظومة متكاملة من الشركات التابعة تدعم التطوير والتنفيذ والاستثمار",
              "An integrated ecosystem of subsidiaries supporting development, execution, and investment",
            )}
          </p>
        </div>

        <div
          data-reveal
          className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-[2rem] border border-[#E0D3C2]/70 bg-[#FAFAF8] p-6 shadow-[0_20px_70px_rgba(26,22,18,0.08)] md:p-10"
        >
          <Image
            src="/assets/logos.png"
            alt={t("شعارات الشركات التابعة", "Subsidiary logos")}
            width={1200}
            height={400}
            className="mx-auto h-auto w-full max-w-3xl object-contain"
          />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANIES.map((company, index) => (
            <div
              key={company.en}
              data-reveal
              className="group rounded-2xl border border-[#E0D3C2]/60 bg-[#FAFAF8] p-5 transition hover:border-[#C9A962]/50 hover:bg-white hover:shadow-lg"
            >
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#C9A962]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-heading mt-2 text-lg text-[#1A1612]">
                {t(company.ar, company.en)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

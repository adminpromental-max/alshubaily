"use client";

import Image from "next/image";
import { useLang } from "@/contexts/lang-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STATS = [
  { n: "18", ar: "مشروعاً", en: "Projects" },
  { n: "4", ar: "مناطق", en: "Regions" },
  { n: "6", ar: "شركات تابعة", en: "Subsidiaries" },
  { n: "1", ar: "رؤية وطنية", en: "National Vision" },
];

export function AboutSection() {
  const { t } = useLang();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40, stagger: 0.14 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-[#E0D3C2]/60 bg-[#F3F0EA] py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8">
        <div className="relative">
          <div data-reveal className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_90px_rgba(26,22,18,0.12)]">
            <Image
              src="/assets/hero/slide-3.png"
              alt={t("مجموعة الشبيلي", "AlShubaily Group")}
              width={900}
              height={1100}
              className="h-auto w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,169,98,0.15),transparent_50%)]" />
          </div>

          <div
            data-reveal
            className="absolute -bottom-6 -start-4 max-w-[220px] rounded-2xl border border-[#E0D3C2] bg-white p-4 shadow-xl md:-start-8"
          >
            <p className="font-heading text-3xl text-[#C9A962]">18+</p>
            <p className="mt-1 text-xs leading-6 text-[#5C5348]">
              {t(
                "مشروعاً عبر المملكة بتجربة رقمية فاخرة",
                "Projects across the Kingdom with a premium digital experience",
              )}
            </p>
          </div>
        </div>

        <div>
          <p data-reveal className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
            {t("من نحن", "About Us")}
          </p>
          <h2
            data-reveal
            className="font-heading mt-4 text-3xl leading-[1.15] font-semibold text-[#1A1612] md:text-5xl"
          >
            {t(
              "مجموعة خالد سعود الشبيلي للاستثمارات العقارية",
              "Khalid Saud AlShubaily Real Estate Investment Group",
            )}
          </h2>
          <p data-reveal className="mt-6 text-base leading-8 text-[#5C5348]">
            {t(
              "محفظة وطنية من مشاريع نوعية في مكة وحائل والرياض والمنطقة الشرقية — نقدّمها بتجربة رقمية فاخرة تعكس طموح المجموعة وجودة تنفيذها.",
              "A national portfolio of landmark projects in Mecca, Hail, Riyadh, and the Eastern Region — presented through a premium digital experience that reflects our ambition and execution quality.",
            )}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {STATS.map((stat) => (
              <div
                key={stat.en}
                data-reveal
                className="min-w-[140px] flex-1 rounded-2xl border border-white/80 bg-white/70 px-5 py-4 backdrop-blur-sm"
              >
                <p className="font-heading text-3xl text-[#C9A962]">{stat.n}</p>
                <p className="mt-1 text-xs text-[#5C5348]">{t(stat.ar, stat.en)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

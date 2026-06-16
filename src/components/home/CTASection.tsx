"use client";

import Link from "next/link";
import { useLang } from "@/contexts/lang-context";

export function CTASection() {
  const { t } = useLang();

  return (
    <section className="cta-section relative overflow-hidden py-16 md:py-20">
      {/* Subtle arabesque SVG tile pattern */}
      <div className="cta-arabesque-bg pointer-events-none absolute inset-0" aria-hidden />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8 px-6 text-center">
        <div>
          <p className="text-[10px] tracking-[0.45em] text-[#9A7B3A] uppercase">
            {t("مجموعة الشبيلي", "AlShubaily Group")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#1A1612] md:text-3xl">
            {t("وجهتك إلى عالم الاستثمار والعقارات", "Your Gateway to Investment & Real Estate")}
          </h2>
          <p className="mt-3 text-sm text-[#6B5B3E]/80 md:text-base">
            {t("في المملكة العربية السعودية", "in the Kingdom of Saudi Arabia")}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/about" className="cta-glass-btn">
            {t("عن المجموعة", "About Us")}
          </Link>
          <Link href="/contact" className="cta-glass-btn cta-glass-btn--gold">
            {t("تواصل معنا", "Contact Us")}
          </Link>
        </div>
      </div>
    </section>
  );
}

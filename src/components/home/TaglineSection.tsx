"use client";

import { useLang } from "@/contexts/lang-context";

export function TaglineSection() {
  const { t } = useLang();

  return (
    <section
      data-parallax-section
      className="tagline-section relative overflow-hidden bg-[#0e0b08]"
    >
      {/* Ambient golden radial behind billboard */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_55%,rgba(201,169,98,0.07),transparent_70%)]"
      />

      {/* Top bridge from FeaturedProjects (dark) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#080605] to-transparent"
      />

      <div className="relative z-10 mx-auto flex min-h-[320px] max-w-5xl items-center justify-center px-6 py-16 md:min-h-[360px] md:py-20">

        {/* 3D Billboard */}
        <div data-parallax="mid" className="tagline-billboard group w-full">

          {/* Corner bolts */}
          <span className="billboard-bolt billboard-bolt--tl" aria-hidden />
          <span className="billboard-bolt billboard-bolt--tr" aria-hidden />
          <span className="billboard-bolt billboard-bolt--bl" aria-hidden />
          <span className="billboard-bolt billboard-bolt--br" aria-hidden />

          {/* Horizontal rule lines (top & bottom of panel) */}
          <div className="billboard-rule billboard-rule--top" aria-hidden />
          <div className="billboard-rule billboard-rule--bottom" aria-hidden />

          {/* Content */}
          <div className="relative z-10 px-8 py-10 text-center md:px-16 md:py-12">
            <p className="billboard-eyebrow">
              {t("مجموعة الشبيلي", "AlShubaily Group")}
            </p>
            <h2 className="billboard-headline">
              <span className="billboard-line billboard-line--main">
                {t(
                  "وجهتك إلى عالم الاستثمار والعقارات",
                  "Your Gateway to Investment & Real Estate",
                )}
              </span>
              <span className="billboard-line billboard-line--sub">
                {t(
                  "في المملكة العربية السعودية",
                  "in the Kingdom of Saudi Arabia",
                )}
              </span>
            </h2>
          </div>

          {/* Glass shine streak */}
          <div className="billboard-glass-shine" aria-hidden />
        </div>

      </div>

      {/* Bottom gradient to cream/light Map section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#FAFAF8]"
      />
    </section>
  );
}

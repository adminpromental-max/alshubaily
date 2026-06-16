"use client";

import { useLang } from "@/contexts/lang-context";

export function TaglineSection() {
  const { t } = useLang();

  return (
    <section className="relative bg-[#FAF8F4]">
      {/* Seamless blend from dark FeaturedProjects above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF8F4] to-[#FAF8F4]"
      />
      {/* Seamless blend to dark LogoMarqueeBanner below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#050402]"
      />

      <div className="relative z-10 mx-auto flex min-h-[320px] max-w-5xl items-center justify-center px-6 py-16 md:min-h-[360px] md:py-20">

        {/* Portrait frame */}
        <div className="tagline-frame group">
          {/* Corner ornaments */}
          <span className="tl-corner" aria-hidden />
          <span className="tr-corner" aria-hidden />
          <span className="bl-corner" aria-hidden />
          <span className="br-corner" aria-hidden />

          {/* Inner decorative border */}
          <div className="tagline-frame-inner" aria-hidden />

          {/* Text */}
          <div className="relative z-10 px-8 py-10 text-center md:px-16 md:py-12">
            {/* Group name — big golden */}
            <p className="tagline-group-name">
              {t("مجموعة الشبيلي", "AlShubaily Group")}
            </p>

            {/* Main headline — 2 lines */}
            <h2 className="tagline-headline">
              <span className="tagline-line">
                {t(
                  "وجهتك إلى عالم الاستثمار والعقارات",
                  "Your Gateway to the World of Investment & Real Estate",
                )}
              </span>
              <span className="tagline-line">
                {t(
                  "في المملكة العربية السعودية",
                  "in the Kingdom of Saudi Arabia",
                )}
              </span>
            </h2>

            <div className="tagline-divider" aria-hidden />
          </div>
        </div>

      </div>
    </section>
  );
}

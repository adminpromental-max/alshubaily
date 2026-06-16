"use client";

import { useLang } from "@/contexts/lang-context";

export function TaglineSection() {
  const { t } = useLang();

  return (
    <section className="tagline-section section-overlap section-overlap--light relative bg-[#FAF8F4]">
      <div className="mx-auto flex min-h-[300px] max-w-5xl items-center justify-center px-6 py-16 md:min-h-[340px] md:py-20">

        {/* Portrait frame */}
        <div className="tagline-frame group">
          {/* Corner ornaments */}
          <span className="tl-corner" aria-hidden />
          <span className="tr-corner" aria-hidden />
          <span className="bl-corner" aria-hidden />
          <span className="br-corner" aria-hidden />

          {/* Inner decorative line */}
          <div className="tagline-frame-inner" aria-hidden />

          {/* Text content */}
          <div className="relative z-10 px-8 py-10 text-center md:px-14 md:py-12">
            <p className="tagline-eyebrow">
              {t("مجموعة الشبيلي", "AlShubaily Group")}
            </p>
            <h2 className="tagline-headline">
              {t(
                "الشبيلي وجهتك إلى عالم الاستثمار",
                "AlShubaily — Your Gateway to Investment",
              )}
              <br />
              {t(
                "والعقارات في المملكة العربية السعودية",
                "and Real Estate in Saudi Arabia",
              )}
            </h2>
            <div className="tagline-divider" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

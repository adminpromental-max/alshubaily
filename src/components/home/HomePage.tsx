"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/home/HeroSection";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { useLang } from "@/contexts/lang-context";

export function HomePage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <InteractiveMap />

        <section id="about" className="border-y border-white/5 bg-[#080b12] px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-[11px] tracking-[0.4em] text-[#c9a962]/75 uppercase">
                {t("من نحن", "About Us")}
              </p>
              <h2 className="font-heading mt-4 text-3xl font-semibold md:text-4xl">
                {t(
                  "مجموعة خالد سعود الشبيلي للاستثمارات العقارية",
                  "Khalid Saud AlShubaily Real Estate Investment Group",
                )}
              </h2>
              <p className="mt-5 leading-8 text-white/60">
                {t(
                  "محفظة وطنية من 18 مشروعاً في 4 مناطق — من مكة إلى الشرقية — بتجربة رقمية فاخرة تعكس طموح المجموعة.",
                  "A national portfolio of 18 projects across 4 regions — from Mecca to the Eastern Province — presented through a premium digital experience.",
                )}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "18", l: t("مشروع", "Projects") },
                { n: "4", l: t("مناطق", "Regions") },
                { n: "6", l: t("شركات تابعة", "Subsidiaries") },
                { n: "1", l: t("رؤية", "Vision") },
              ].map((stat) => (
                <div
                  key={stat.l}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
                >
                  <p className="font-heading text-3xl text-[#c9a962] md:text-4xl">{stat.n}</p>
                  <p className="mt-2 text-xs text-white/50">{stat.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

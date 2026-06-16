"use client";

import dynamic from "next/dynamic";
import { LangProvider } from "@/contexts/lang-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

// Leaflet must not run on SSR
const NightMapSection = dynamic(
  () => import("@/components/map/NightMapSection").then((m) => m.NightMapSection),
  { ssr: false },
);

export function AboutPageClient() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAF8]">
        <SiteHeader />

        <main className="mx-auto max-w-[1600px] px-4 pb-24 pt-28 md:px-8 md:pt-32">
          {/* Page title */}
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#C9A962]">
              من نحن
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-5xl">
              خريطة مشاريع
              <br />
              <span className="text-[#C9A962]">مجموعة الشبيلي</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/50 md:text-base">
              استكشف مشاريعنا في مختلف مناطق المملكة العربية السعودية — اضغط على
              أي منطقة لتكتشف مشاريعنا فيها.
            </p>
          </div>

          {/* Interactive night map */}
          <NightMapSection />
        </main>

        <SiteFooter />
      </div>
    </LangProvider>
  );
}

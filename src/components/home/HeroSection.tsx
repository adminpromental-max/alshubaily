"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/lang-context";

const HeroDroneCanvas = dynamic(
  () => import("./HeroDroneScene").then((m) => m.HeroDroneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 animate-pulse bg-[#0A0E17]" />
    ),
  },
);

export function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#0A0E17]">
      <HeroDroneCanvas />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,14,23,0.15)_0%,rgba(10,14,23,0.55)_55%,rgba(10,14,23,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(10,14,23,0.45)_100%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-28 pt-24 text-center md:pb-32">
        <p className="mb-4 text-[11px] tracking-[0.45em] text-[#c9a962]/85 uppercase">
          {t("مجموعة خالد سعود الشبيلي", "Khalid Saud AlShubaily Group")}
        </p>
        <h1 className="font-heading max-w-4xl text-4xl leading-[1.1] font-semibold text-white md:text-6xl lg:text-7xl">
          {t("مشاريع الشبيلي", "AlShubaily Projects")}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
          {t(
            "18 مشروع · 4 مناطق · تجربة استكشاف تفاعلية على مستوى عالمي",
            "18 projects · 4 regions · A world-class interactive exploration",
          )}
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#map"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full border border-[#c9a962]/35 bg-[#c9a962]/10 px-8 text-[#f5ecd8] hover:bg-[#c9a962]/20",
            )}
          >
            {t("استكشف الخريطة", "Explore the Map")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-[#c9a962]/60">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/lang-context";

const HeroCinematic = dynamic(
  () => import("./HeroCinematic").then((m) => m.HeroCinematic),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 animate-pulse bg-[#F3F0EA]" />
    ),
  },
);

export function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#FAFAF8]">
      <HeroCinematic />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-28 pt-24 text-center md:pb-32">
        <p className="mb-4 text-[11px] tracking-[0.45em] text-[#9A7B3A] uppercase">
          {t("مجموعة خالد سعود الشبيلي", "Khalid Saud AlShubaily Group")}
        </p>
        <h1 className="font-heading max-w-4xl text-4xl leading-[1.08] font-semibold text-[#1A1612] md:text-6xl lg:text-7xl">
          {t("مشاريع الشبيلي", "AlShubaily Projects")}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-[#5C5348] md:text-base">
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
              "rounded-full border border-[#C9A962]/40 bg-[#C9A962] px-8 text-white shadow-[0_12px_40px_rgba(201,169,98,0.35)] hover:bg-[#B8954A]",
            )}
          >
            {t("استكشف الخريطة", "Explore the Map")}
          </Link>
          <Link
            href="#projects"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full border-[#E0D3C2] bg-white/70 px-8 text-[#1A1612] backdrop-blur-sm hover:bg-white",
            )}
          >
            {t("المشاريع المميزة", "Featured Projects")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-[#C9A962]">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}

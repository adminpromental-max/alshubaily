"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/lang-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ProjectsIntroSection() {
  const { t } = useLang();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40, stagger: 0.12 });

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="pointer-events-none absolute -end-20 top-0 h-80 w-80 rounded-full bg-[#E0D3C2]/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8">
        <p
          data-reveal
          className="text-[11px] tracking-[0.45em] text-[#9A7B3A] uppercase"
        >
          {t("مجموعة خالد سعود الشبيلي", "Khalid Saud AlShubaily Group")}
        </p>
        <h1
          data-reveal
          className="font-heading mx-auto mt-5 max-w-4xl text-4xl leading-[1.08] font-semibold text-[#1A1612] md:text-6xl lg:text-7xl"
        >
          {t("مشاريع الشبيلي", "AlShubaily Projects")}
        </h1>
        <p
          data-reveal
          className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#5C5348] md:text-base"
        >
          {t(
            "18 مشروع · 4 مناطق · تجربة استكشاف تفاعلية على مستوى عالمي",
            "18 projects · 4 regions · A world-class interactive exploration",
          )}
        </p>
        <div
          data-reveal
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
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
              "rounded-full border-[#E0D3C2] bg-[#FAFAF8] px-8 text-[#1A1612] hover:bg-white",
            )}
          >
            {t("المشاريع المميزة", "Featured Projects")}
          </Link>
        </div>
      </div>
    </section>
  );
}

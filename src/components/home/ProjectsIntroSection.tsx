"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/lang-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ProjectsIntroSection() {
  const { t } = useLang();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 36, stagger: 0.1 });

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAFAF8] py-16 md:py-20"
    >
      <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8">
        <p
          data-reveal
          className="mx-auto max-w-2xl text-sm leading-8 text-[#5C5348] md:text-base"
        >
          {t(
            "استكشفي محفظة المشاريع عبر خريطة تفاعلية وتجربة ثلاثية الأبعاد فاخرة",
            "Explore our portfolio through an interactive map and premium 3D experience",
          )}
        </p>
        <div
          data-reveal
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
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
              "rounded-full border-[#E0D3C2] bg-white px-8 text-[#1A1612] hover:bg-[#F3F0EA]",
            )}
          >
            {t("المشاريع المميزة", "Featured Projects")}
          </Link>
        </div>
      </div>
    </section>
  );
}

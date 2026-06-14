"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { useLang } from "@/contexts/lang-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FEATURED = PROJECTS.slice(0, 6);

export function FeaturedProjects() {
  const { t, lang } = useLang();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 56, stagger: 0.1 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="pointer-events-none absolute -start-24 top-20 h-72 w-72 rounded-full bg-[#E0D3C2]/35 blur-3xl" />
      <div className="pointer-events-none absolute -end-16 bottom-10 h-64 w-64 rounded-full bg-[#C9A962]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div data-reveal className="max-w-2xl">
          <p className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
            {t("محفظة المشاريع", "Project Portfolio")}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold text-[#1A1612] md:text-5xl">
            {t("مشاريع مميزة", "Featured Projects")}
          </h2>
          <p className="mt-4 text-sm leading-8 text-[#5C5348] md:text-base">
            {t(
              "لمحة فاخرة من محفظتنا — كل بطاقة تفتح جولة تفاعلية داخل المشروع",
              "A curated glimpse of our portfolio — each card opens an immersive project tour",
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-reveal
              className="group relative overflow-hidden rounded-[1.75rem] border border-[#E0D3C2]/70 bg-[#FAFAF8] shadow-[0_16px_50px_rgba(26,22,18,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(201,169,98,0.18)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.heroImage}
                  alt={lang === "ar" ? project.nameAr : project.nameEn}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,22,18,0.72),transparent_55%)]" />
                <span className="absolute start-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-[#9A7B3A] uppercase backdrop-blur-sm">
                  {String(project.id).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="text-[11px] text-[#B8954A]">
                    {lang === "ar" ? project.regionAr : project.regionEn}
                  </p>
                  <h3 className="font-heading mt-1 text-xl text-[#1A1612]">
                    {lang === "ar" ? project.nameAr : project.nameEn}
                  </h3>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E0D3C2] bg-white text-[#C9A962] transition group-hover:bg-[#C9A962] group-hover:text-white">
                  <ArrowUpLeft className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

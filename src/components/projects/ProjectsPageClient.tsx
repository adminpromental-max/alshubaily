"use client";

import Link from "next/link";
import Image from "next/image";
import { LangProvider } from "@/contexts/lang-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useLang } from "@/contexts/lang-context";
import { PROJECTS } from "@/data/projects";

function ProjectsContent() {
  const { t, lang } = useLang();

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 md:px-8 md:pt-32">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#C9A962]">
            {t("محفظة المشاريع", "Project Portfolio")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-5xl">
            {t("مشاريع مجموعة الشبيلي", "AlShubaily Group Projects")}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/50 md:text-base">
            {t(
              "استكشف مشاريعنا في مختلف مناطق المملكة — سيتم تطوير هذه الصفحة قريباً.",
              "Explore our projects across the Kingdom — this page will be enhanced soon.",
            )}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-[#C9A962]/35 hover:bg-white/[0.07]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.heroImage}
                  alt={lang === "ar" ? project.nameAr : project.nameEn}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-[11px] tracking-wide text-[#C9A962]">
                  {lang === "ar" ? project.regionAr : project.regionEn}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">
                  {lang === "ar" ? project.nameAr : project.nameEn}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/55">
                  {lang === "ar" ? project.descriptionAr : project.descriptionEn}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

export function ProjectsPageClient() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAF8]">
        <ProjectsContent />
      </div>
    </LangProvider>
  );
}

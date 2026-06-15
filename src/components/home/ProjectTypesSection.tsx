"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/data/projects";
import {
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_BY_SLUG,
  type ProjectCategory,
  type ProjectCategoryId,
} from "@/data/site-content";
import { useLang } from "@/contexts/lang-context";
import { cn } from "@/lib/utils";
import { ArrowUpLeft, X } from "lucide-react";

function countByCategory(id: ProjectCategoryId) {
  return PROJECTS.filter((p) => PROJECT_CATEGORY_BY_SLUG[p.slug] === id).length;
}

function projectsByCategory(id: ProjectCategoryId) {
  return PROJECTS.filter((p) => PROJECT_CATEGORY_BY_SLUG[p.slug] === id);
}

function CategoryModal({
  category,
  onClose,
}: {
  category: ProjectCategory;
  onClose: () => void;
}) {
  const { t, lang } = useLang();
  const projects = projectsByCategory(category.id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[#1A1612]/55 backdrop-blur-md"
      />
      <div
        className="relative z-[1] max-h-[min(88vh,720px)] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] border border-[#C9A962]/35 bg-[linear-gradient(165deg,#ffffff_0%,#faf7f2_100%)] p-6 shadow-[0_40px_100px_rgba(26,22,18,0.22)] md:p-8"
        data-lenis-prevent
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#E0D3C2] bg-white text-[#5C5348]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-[11px] tracking-[0.35em] text-[#9A7B3A] uppercase">
          {lang === "ar" ? category.nameAr : category.nameEn}
        </p>
        <p className="mt-3 text-sm leading-8 text-[#5C5348] md:text-base">
          {lang === "ar" ? category.bioAr : category.bioEn}
        </p>
        <p className="mt-2 text-sm font-medium text-[#C9A962]">
          {projects.length} {t("مشروع في هذا التصنيف", "projects in this category")}
        </p>

        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#E0D3C2]/60 bg-[#FAFAF8] px-4 py-3 text-sm text-[#1A1612] transition hover:border-[#C9A962]/50 hover:bg-white"
              >
                <span>{lang === "ar" ? project.nameAr : project.nameEn}</span>
                <ArrowUpLeft className="h-4 w-4 shrink-0 text-[#C9A962]" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProjectTypesSection() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<ProjectCategory | null>(null);

  const activeCategory = active;

  return (
    <section id="types" className="bg-[#FAFAF8] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
            {t("تصنيفاتنا", "Our Categories")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#1A1612] md:text-4xl">
            {t("أنواع المشاريع", "Project Types")}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              data-cursor="explore"
              onClick={() => setActive(cat)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border text-start transition duration-300",
                "border-[#E0D3C2]/70 hover:border-[#C9A962]/50 hover:shadow-lg",
              )}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={lang === "ar" ? cat.nameAr : cat.nameEn}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.82),rgba(10,10,10,0.15))]" />
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                  <p className="text-sm font-semibold text-white md:text-base">
                    {lang === "ar" ? cat.nameAr : cat.nameEn}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#C9A962] md:text-xs">
                    {countByCategory(cat.id)} {t("مشروع", "projects")}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeCategory && (
        <CategoryModal category={activeCategory} onClose={() => setActive(null)} />
      )}
    </section>
  );
}

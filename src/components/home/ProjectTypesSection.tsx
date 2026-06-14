"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import {
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_BY_SLUG,
  type ProjectCategoryId,
} from "@/data/site-content";
import { useLang } from "@/contexts/lang-context";
import { cn } from "@/lib/utils";
import { ArrowUpLeft } from "lucide-react";

function countByCategory(id: ProjectCategoryId) {
  return PROJECTS.filter((p) => PROJECT_CATEGORY_BY_SLUG[p.slug] === id).length;
}

function projectsByCategory(id: ProjectCategoryId) {
  return PROJECTS.filter((p) => PROJECT_CATEGORY_BY_SLUG[p.slug] === id);
}

export function ProjectTypesSection() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<ProjectCategoryId | null>(null);

  const activeCategory = active
    ? PROJECT_CATEGORIES.find((c) => c.id === active)
    : null;
  const activeProjects = active ? projectsByCategory(active) : [];

  return (
    <section id="types" className="bg-[#FAFAF8] py-16 md:py-22">
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
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(isActive ? null : cat.id)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border text-start transition duration-300",
                  isActive
                    ? "border-[#C9A962] shadow-[0_16px_50px_rgba(201,169,98,0.2)]"
                    : "border-[#E0D3C2]/70 hover:border-[#C9A962]/50 hover:shadow-lg",
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
            );
          })}
        </div>

        {activeCategory && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E0D3C2]/80 bg-white p-5 shadow-[0_20px_60px_rgba(26,22,18,0.08)] md:p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] tracking-[0.3em] text-[#9A7B3A] uppercase">
                  {lang === "ar" ? activeCategory.nameAr : activeCategory.nameEn}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#5C5348] md:text-base">
                  {lang === "ar" ? activeCategory.bioAr : activeCategory.bioEn}
                </p>
                <p className="mt-3 text-sm font-medium text-[#C9A962]">
                  {activeProjects.length}{" "}
                  {t("مشروع في هذا التصنيف", "projects in this category")}
                </p>
              </div>
            </div>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {activeProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#E0D3C2]/60 bg-[#FAFAF8] px-4 py-3 text-sm text-[#1A1612] transition hover:border-[#C9A962]/50 hover:bg-white"
                  >
                    <span>
                      {lang === "ar" ? project.nameAr : project.nameEn}
                    </span>
                    <ArrowUpLeft className="h-4 w-4 shrink-0 text-[#C9A962]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

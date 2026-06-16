"use client";

import Image from "next/image";
import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import {
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_BY_SLUG,
  type ProjectCategoryId,
} from "@/data/site-content";
import { useLang } from "@/contexts/lang-context";

function countByCategory(id: ProjectCategoryId) {
  return PROJECTS.filter((p) => PROJECT_CATEGORY_BY_SLUG[p.slug] === id).length;
}

// Glass eye SVG icon
function GlassEyeIcon() {
  return (
    <svg
      viewBox="0 0 48 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flip-eye-icon"
      aria-hidden
    >
      {/* Outer eye shape */}
      <path
        d="M2 15C2 15 10 2 24 2C38 2 46 15 46 15C46 15 38 28 24 28C10 28 2 15 2 15Z"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        fill="rgba(255,255,255,0.08)"
      />
      {/* Iris */}
      <circle cx="24" cy="15" r="6.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
      {/* Pupil */}
      <circle cx="24" cy="15" r="2.5" fill="rgba(255,255,255,0.5)" />
      {/* Shine */}
      <circle cx="26.5" cy="13" r="1.2" fill="rgba(255,255,255,0.7)" />
    </svg>
  );
}

export function ProjectTypesSection() {
  const { t, lang } = useLang();
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="relative bg-[#FAFAF8] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
            {t("قطاعاتنا", "Our Sectors")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#1A1612] md:text-3xl">
            {t("أنواع المشاريع", "Project Types")}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {PROJECT_CATEGORIES.map((cat) => {
            const count = countByCategory(cat.id);
            const isFlipped = flipped[cat.id] ?? false;

            return (
              <button
                key={cat.id}
                type="button"
                aria-label={lang === "ar" ? cat.nameAr : cat.nameEn}
                onClick={() => toggle(cat.id)}
                className={`flip-card ${isFlipped ? "is-flipped" : ""}`}
              >
                <div className="flip-card-inner">
                  {/* ── FRONT ── */}
                  <div className="flip-card-face flip-card-front">
                    <Image
                      src={cat.image}
                      alt={lang === "ar" ? cat.nameAr : cat.nameEn}
                      fill
                      unoptimized
                      className="object-cover transition duration-500"
                      sizes="(max-width:768px) 50vw, 25vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.82),rgba(10,10,10,0.15))]" />

                    {/* Glass eye icon — center */}
                    <div className="flip-eye-wrap">
                      <GlassEyeIcon />
                    </div>

                    {/* Bottom label */}
                    <div className="absolute inset-x-0 bottom-0 p-3 text-start md:p-4">
                      <p className="text-sm font-semibold text-white md:text-base">
                        {lang === "ar" ? cat.nameAr : cat.nameEn}
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#C9A962] md:text-xs">
                        {count} {t("مشروع", "projects")}
                      </p>
                    </div>
                  </div>

                  {/* ── BACK ── */}
                  <div className="flip-card-face flip-card-back">
                    <div className="flip-back-content">
                      <p className="flip-back-eyebrow">
                        {count} {t("مشروع", "projects")}
                      </p>
                      <h3 className="flip-back-title">
                        {lang === "ar" ? cat.nameAr : cat.nameEn}
                      </h3>
                      <p className="flip-back-bio">
                        {lang === "ar" ? cat.bioAr : cat.bioEn}
                      </p>
                      {/* Tap again hint */}
                      <span className="flip-back-hint">
                        {t("اضغط للرجوع", "Tap to flip back")}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

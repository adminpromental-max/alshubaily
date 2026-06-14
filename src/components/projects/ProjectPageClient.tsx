"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";
import { useLang } from "@/contexts/lang-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ImmersiveTour = dynamic(
  () => import("@/components/tour/ImmersiveTour").then((m) => m.ImmersiveTour),
  { ssr: false },
);

export function ProjectPageClient({ project }: { project: Project }) {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <SiteHeader />

      <section className="relative flex min-h-[50vh] items-end px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#0A0E17,transparent_60%)]" />

        <div className="relative z-10 max-w-4xl">
          <Link href="/#map" className="text-xs text-[#c9a962]/80 hover:text-[#c9a962]">
            ← {t("العودة للخريطة", "Back to map")}
          </Link>
          <p className="mt-6 text-[11px] tracking-[0.35em] text-[#c9a962]/75 uppercase">
            {t(project.regionAr, project.regionEn)} · {t(project.typeAr, project.typeEn)}
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold md:text-6xl">
            {t(project.nameAr, project.nameEn)}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
            {t(project.descriptionAr, project.descriptionEn)}
          </p>
        </div>
      </section>

      <ImmersiveTour
        images={project.gallery}
        titleAr={project.nameAr}
        titleEn={project.nameEn}
      />

      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
        <h2 className="font-heading text-2xl md:text-3xl">{t("عن المشروع", "About the Project")}</h2>
        <p className="mt-4 leading-8 text-white/65">
          {t(project.descriptionAr, project.descriptionEn)}
        </p>
        <Link
          href="/#contact"
          className={cn(
            buttonVariants({ size: "default" }),
            "mt-8 rounded-full bg-[#c9a962]/15 text-[#f5ecd8] hover:bg-[#c9a962]/25",
          )}
        >
          {t("تواصل معنا", "Contact Us")}
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}

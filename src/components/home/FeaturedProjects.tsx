"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { FEATURED_SLUGS } from "@/data/project-assets";
import { useLang } from "@/contexts/lang-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const FEATURED = [
  ...FEATURED_SLUGS.map((slug) => getProjectBySlug(slug)!),
  ...PROJECTS.filter((p) => !FEATURED_SLUGS.includes(p.slug)).slice(0, 5),
];

export function FeaturedProjects() {
  const { t, lang } = useLang();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 48, stagger: 0.1 });
  const [selected, setSelected] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    dragFree: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAFAF8] py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] tracking-[0.4em] text-[#9A7B3A] uppercase">
            {t("محفظة المشاريع", "Project Portfolio")}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold text-[#1A1612] md:text-5xl">
            {t("مشاريع مميزة", "Featured Projects")}
          </h2>
        </div>

        <div data-reveal className="relative mt-14">
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute start-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0D3C2] bg-white text-[#1A1612] shadow-lg transition hover:border-[#C9A962] hover:text-[#B8954A] md:flex"
            aria-label="Previous"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute end-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0D3C2] bg-white text-[#1A1612] shadow-lg transition hover:border-[#C9A962] hover:text-[#B8954A] md:flex"
            aria-label="Next"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div ref={emblaRef} className="overflow-hidden px-2 md:px-16">
            <div className="flex touch-pan-y">
              {FEATURED.map((project, index) => {
                const isActive = index === selected;
                return (
                  <div
                    key={project.slug}
                    className="min-w-0 flex-[0_0_82%] px-2 sm:flex-[0_0_68%] md:flex-[0_0_52%] lg:flex-[0_0_44%]"
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className={cn(
                        "group block overflow-hidden rounded-[2rem] border bg-white transition duration-500 ease-out",
                        isActive
                          ? "scale-100 border-[#C9A962]/50 shadow-[0_28px_80px_rgba(201,169,98,0.22)]"
                          : "scale-[0.88] border-[#E0D3C2]/60 opacity-55 shadow-md",
                      )}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={project.heroImage}
                          alt={lang === "ar" ? project.nameAr : project.nameEn}
                          fill
                          unoptimized
                          className="object-cover transition duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 85vw, 45vw"
                          priority={index < 2}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,22,18,0.75),transparent_50%)]" />
                        <span className="absolute start-5 top-5 rounded-full bg-[#1A1612]/85 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-[#C9A962] uppercase">
                          {String(project.id).padStart(2, "0")}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <p className="text-[11px] text-[#E0D3C2]">
                            {lang === "ar" ? project.regionAr : project.regionEn}
                          </p>
                          <h3 className="font-heading mt-1 text-2xl md:text-3xl">
                            {lang === "ar" ? project.nameAr : project.nameEn}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {FEATURED.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === selected
                    ? "w-8 bg-[#C9A962]"
                    : "w-2 bg-[#E0D3C2] hover:bg-[#C9A962]/50",
                )}
                aria-label={`Go to ${project.nameEn}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

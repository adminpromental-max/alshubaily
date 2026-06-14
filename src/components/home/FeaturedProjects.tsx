"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { SHOWCASE_IMAGES } from "@/data/showcase-images";
import { useLang } from "@/contexts/lang-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const TILT_STRENGTH = 14;

export function FeaturedProjects() {
  const { t } = useLang();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 48, stagger: 0.1 });
  const stageRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const autoplay = useRef(
    Autoplay({
      delay: 4200,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: false,
      skipSnaps: false,
    },
    [autoplay.current],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    const plugin = autoplay.current;
    if (!plugin) return;
    if (playing) plugin.stop();
    else plugin.play();
    setPlaying(!playing);
  }, [playing]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    const setTiltOnSlides = () => {
      const slides = emblaApi.slideNodes();
      const scrollProgress = emblaApi.scrollProgress();
      const snapList = emblaApi.scrollSnapList();

      slides.forEach((slide, index) => {
        const snap = snapList[index] ?? 0;
        const distance = snap - scrollProgress;
        const wrapped =
          Math.abs(distance) > 0.5
            ? distance - Math.sign(distance)
            : distance;
        const abs = Math.abs(wrapped);
        const rotateY = wrapped * -38;
        const translateZ = -abs * 140;
        const scale = 1 - abs * 0.14;
        const opacity = 1 - abs * 0.55;

        slide.style.setProperty("--slide-rotate", `${rotateY}deg`);
        slide.style.setProperty("--slide-z", `${translateZ}px`);
        slide.style.setProperty("--slide-scale", `${Math.max(scale, 0.72)}`);
        slide.style.setProperty("--slide-opacity", `${Math.max(opacity, 0.35)}`);
      });
    };

    emblaApi.on("scroll", setTiltOnSlides);
    emblaApi.on("reInit", setTiltOnSlides);
    setTiltOnSlides();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", setTiltOnSlides);
      emblaApi.off("reInit", setTiltOnSlides);
    };
  }, [emblaApi]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-orbit",
        { opacity: 0, y: 40, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 82%",
          },
        },
      );
    }, stage);

    return () => ctx.revert();
  }, []);

  const onStageMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: x * TILT_STRENGTH, y: y * -TILT_STRENGTH });
  };

  const onStageLeave = () => setTilt({ x: 0, y: 0 });

  const progress = ((selected + 1) / SHOWCASE_IMAGES.length) * 100;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,169,98,0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/35 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] tracking-[0.4em] text-[#C9A962] uppercase">
            {t("رؤية بصرية", "Visual Journey")}
          </p>
          <h2 className="font-heading mt-3 text-2xl font-semibold text-white md:text-5xl">
            {t(
              "مشاريع مجموعة الشبيلي العقارية",
              "AlShubaily Real Estate Group Projects",
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/45 md:text-base">
            {t(
              "جولة بصرية عبر أبرز وجهاتنا — تصميم، جودة، وتميز في كل لقطة.",
              "A cinematic glimpse across our destinations — design, quality, and distinction in every frame.",
            )}
          </p>
        </div>

        <div
          ref={stageRef}
          data-reveal
          className="showcase-orbit relative mt-12 md:mt-16"
          onMouseMove={onStageMove}
          onMouseLeave={onStageLeave}
          style={{
            perspective: "1400px",
            transform: `rotateX(${tilt.y * 0.35}deg) rotateY(${tilt.x * 0.35}deg)`,
          }}
        >
          <div className="mb-6 flex items-center justify-between gap-4 px-1">
            <p className="text-xs tracking-[0.25em] text-white/40 uppercase">
              {String(selected + 1).padStart(2, "0")}{" "}
              <span className="text-white/20">/</span>{" "}
              {String(SHOWCASE_IMAGES.length).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleAutoplay}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C9A962]/40 hover:text-[#C9A962]"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={scrollPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C9A962]/40 hover:text-[#C9A962]"
                aria-label="Previous"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C9A962]/40 hover:text-[#C9A962]"
                aria-label="Next"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden px-1 md:px-10" ref={emblaRef}>
            <div className="showcase-track flex touch-pan-y">
              {SHOWCASE_IMAGES.map((src, index) => {
                const isActive = index === selected;
                return (
                  <div
                    key={`${src}-${index}`}
                    className="showcase-slide min-w-0 flex-[0_0_78%] px-2 sm:flex-[0_0_62%] md:flex-[0_0_48%] lg:flex-[0_0_40%]"
                  >
                    <div
                      className={cn(
                        "showcase-card relative overflow-hidden rounded-[1.75rem] border transition-[box-shadow,border-color] duration-500",
                        isActive
                          ? "border-[#C9A962]/45 shadow-[0_30px_90px_rgba(201,169,98,0.22)]"
                          : "border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.35)]",
                      )}
                    >
                      <div className="relative aspect-[4/5] max-lg:aspect-[3/4] overflow-hidden">
                        <Image
                          src={src}
                          alt=""
                          fill
                          unoptimized
                          className={cn(
                            "object-cover transition duration-[1.4s] ease-out",
                            isActive && "scale-105",
                          )}
                          sizes="(max-width: 768px) 78vw, 40vw"
                          priority={index < 3}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.55),transparent_45%,rgba(10,10,10,0.12))]" />
                        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(201,169,98,0.35),transparent_55%)]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-8 h-1 max-w-md overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

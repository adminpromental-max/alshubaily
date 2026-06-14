"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLang } from "@/contexts/lang-context";

type Line = {
  id: string;
  ar: string;
  en: string;
  className?: string;
};

const LINES: Line[] = [
  {
    id: "eyebrow",
    ar: "مجموعة خالد سعود الشبيلي",
    en: "Khalid Saud AlShubaily Group",
    className:
      "mb-5 text-[11px] tracking-[0.45em] text-[#E0D3C2]/90 uppercase",
  },
  {
    id: "title",
    ar: "مشاريع الشبيلي",
    en: "AlShubaily Projects",
    className:
      "font-heading text-4xl leading-[1.08] font-semibold text-white md:text-6xl lg:text-7xl",
  },
  {
    id: "tagline",
    ar: "18 مشروع · 4 مناطق · تجربة استكشاف تفاعلية",
    en: "18 projects · 4 regions · Interactive exploration",
    className: "mt-5 max-w-2xl text-sm leading-8 text-white/75 md:text-base",
  },
];

function splitChars(text: string, lineId: string) {
  return [...text].map((char, index) => (
    <span
      key={`${lineId}-${index}`}
      className="hero-char inline-block overflow-hidden align-bottom"
    >
      <span className="hero-char-inner inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));
}

export function HeroLetterReveal() {
  const { lang, t } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const inners = root.querySelectorAll(".hero-char-inner");
    gsap.set(inners, { yPercent: 115, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.35 });
    tl.to(inners, {
      yPercent: 0,
      opacity: 1,
      duration: 1.05,
      stagger: 0.022,
      ease: "power4.out",
    });

    return () => {
      tl.kill();
    };
  }, [lang]);

  return (
    <div ref={rootRef} className="mx-auto max-w-4xl text-center">
      {LINES.map((line) => (
        <div key={line.id} className={line.className}>
          {splitChars(t(line.ar, line.en), line.id)}
        </div>
      ))}
    </div>
  );
}

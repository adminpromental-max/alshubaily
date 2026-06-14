"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/lang-context";
import { SITE_STATS } from "@/data/site-content";

gsap.registerPlugin(ScrollTrigger);

type StatItem = {
  key: keyof typeof SITE_STATS;
  labelAr: string;
  labelEn: string;
  suffixAr?: string;
  suffixEn?: string;
};

const STATS: StatItem[] = [
  {
    key: "projects",
    labelAr: "عدد المشاريع",
    labelEn: "Projects",
  },
  {
    key: "investors",
    labelAr: "عدد المستثمرين",
    labelEn: "Investors",
    suffixAr: "+",
    suffixEn: "+",
  },
  {
    key: "requests",
    labelAr: "عدد الطلبات",
    labelEn: "Requests",
    suffixAr: "+",
    suffixEn: "+",
  },
];

function CountUp({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix?: string;
  active: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${Math.round(obj.val)}${suffix ?? ""}`;
      },
    });

    return () => {
      tween.kill();
    };
  }, [active, suffix, target]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix ?? ""}
    </span>
  );
}

export function StatsBanner() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const triggeredRef = useRef(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      scroller: document.documentElement,
      onEnter: () => {
        if (!triggeredRef.current) {
          triggeredRef.current = true;
          setActive(true);
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,169,98,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/40 to-transparent" />

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 md:grid-cols-3 md:gap-6">
        {STATS.map((stat) => (
          <div key={stat.key} className="text-center">
            <p className="text-5xl font-semibold text-[#C9A962] md:text-6xl lg:text-7xl">
              <CountUp
                target={SITE_STATS[stat.key]}
                suffix={
                  stat.suffixAr
                    ? t(stat.suffixAr, stat.suffixEn ?? "")
                    : undefined
                }
                active={active}
              />
            </p>
            <p className="mt-3 text-sm tracking-wide text-white/55 md:text-base">
              {t(stat.labelAr, stat.labelEn)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

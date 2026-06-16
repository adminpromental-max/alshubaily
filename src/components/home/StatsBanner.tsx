"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, FileText, Users } from "lucide-react";
import { useLang } from "@/contexts/lang-context";
import { SITE_STATS } from "@/data/site-content";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type StatItem = {
  key: keyof typeof SITE_STATS;
  labelAr: string;
  labelEn: string;
  suffixAr?: string;
  suffixEn?: string;
  icon: typeof Building2;
};

const STATS: StatItem[] = [
  {
    key: "projects",
    labelAr: "عدد المشاريع",
    labelEn: "Projects",
    icon: Building2,
  },
  {
    key: "investors",
    labelAr: "عدد المستثمرين",
    labelEn: "Investors",
    suffixAr: "+",
    suffixEn: "+",
    icon: Users,
  },
  {
    key: "requests",
    labelAr: "عدد الطلبات",
    labelEn: "Requests",
    suffixAr: "+",
    suffixEn: "+",
    icon: FileText,
  },
];

function CountUp({
  target,
  suffix,
  active,
  onSettled,
}: {
  target: number;
  suffix?: string;
  active: boolean;
  onSettled?: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${Math.round(obj.val)}${suffix ?? ""}`;
      },
      onComplete: onSettled,
    });

    return () => {
      tween.kill();
    };
  }, [active, onSettled, suffix, target]);

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
  const [glow, setGlow] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      onEnter: () => {
        if (!triggeredRef.current) {
          triggeredRef.current = true;
          setActive(true);
        }
      },
    });

    return () => trigger.kill();
  }, []);

  const markGlow = (key: string) => {
    setGlow((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <section
      id="stats"
      ref={sectionRef}
      data-parallax-section
      className="relative overflow-hidden border-t border-[#C9A962]/12 bg-[#0A0A0A] py-8 md:py-12"
    >
      <div
        data-parallax="bg"
        className="pointer-events-none absolute inset-[-15%] bg-[radial-gradient(circle_at_50%_0%,rgba(201,169,98,0.1),transparent_50%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/35 to-transparent" />

      <div className="relative mx-auto grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 px-5 md:grid-cols-3 md:gap-6 md:px-8">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.key}
              className={cn(
                "stat-card group text-center",
                index === 2 && "col-span-2 mx-auto w-full max-w-[200px] md:col-span-1 md:max-w-none",
              )}
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#C9A962]/25 bg-[#C9A962]/8 text-[#C9A962] md:mb-4 md:h-12 md:w-12 md:rounded-2xl">
                <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
              </div>
              <div
                className={cn(
                  "stat-glow relative inline-block",
                  glow[stat.key] && "is-active",
                )}
              >
                <p className="text-4xl font-semibold text-[#C9A962] md:text-5xl lg:text-6xl">
                  <CountUp
                    target={SITE_STATS[stat.key]}
                    suffix={
                      stat.suffixAr
                        ? t(stat.suffixAr, stat.suffixEn ?? "")
                        : undefined
                    }
                    active={active}
                    onSettled={() => markGlow(stat.key)}
                  />
                </p>
              </div>
              <p className="mt-2 text-xs tracking-wide text-white/55 md:mt-2.5 md:text-sm">
                {t(stat.labelAr, stat.labelEn)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

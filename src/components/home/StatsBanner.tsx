"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, FileText, Users } from "lucide-react";
import { useLang } from "@/contexts/lang-context";
import { SITE_STATS } from "@/data/site-content";

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
      duration: 2.2,
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
      start: "top 80%",
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
      className="relative overflow-hidden bg-[#0A0A0A] py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,169,98,0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/40 to-transparent" />

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 md:grid-cols-3 md:gap-8">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.key} className="stat-card group text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A962]/25 bg-[#C9A962]/8 text-[#C9A962] transition group-hover:border-[#C9A962]/45 group-hover:bg-[#C9A962]/14">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div
                className={`stat-glow relative inline-block ${glow[stat.key] ? "is-active" : ""}`}
              >
                <p className="text-5xl font-semibold text-[#C9A962] md:text-6xl lg:text-7xl">
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
              <p className="mt-3 text-sm tracking-wide text-white/55 md:text-base">
                {t(stat.labelAr, stat.labelEn)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

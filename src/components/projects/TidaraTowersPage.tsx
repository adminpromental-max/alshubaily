"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/lang-context";

gsap.registerPlugin(ScrollTrigger);

// ── Asset paths ────────────────────────────────────────────────
const BASE = "/assets/projects/tidara-tower";
const HERO = `${BASE}/Hero.png`;
const TOWER_3D = `${BASE}/3D-Tower.png`;
const MASTERPLAN = `${BASE}/masterplan.png`;
const ELEVATION = `${BASE}/elevation-facade.png`;
const INTERIOR_1 = `${BASE}/interior-1.png`;
const INTERIOR_2 = `${BASE}/interior-2.png`;
const WALKTHROUGHS = [
  { src: `${BASE}/walkthrough-1.png`, labelAr: "المدخل الرئيسي",      labelEn: "Main Entrance" },
  { src: `${BASE}/walkthrough-2.png`, labelAr: "الواجهة البحرية",     labelEn: "Waterfront Façade" },
  { src: `${BASE}/walkthrough-3.png`, labelAr: "المشهد الخارجي",      labelEn: "Exterior View" },
  { src: `${BASE}/walkthrough-4.png`, labelAr: "المشاة والميناء",     labelEn: "Promenade & Marina" },
  { src: `${BASE}/walkthrough-5.png`, labelAr: "الليل والإضاءة",      labelEn: "Night Illumination" },
  { src: `${BASE}/walkthrough-6.png`, labelAr: "التفاصيل المعمارية",  labelEn: "Architectural Detail" },
];

// ── Data ───────────────────────────────────────────────────────
const HERO_STATS = [
  { value: "3",     labelAr: "مبانٍ",       labelEn: "Buildings" },
  { value: "G+29",  labelAr: "طوابق",       labelEn: "Floors" },
  { value: "116",   labelAr: "مكتب",        labelEn: "Offices" },
  { value: "63+",   labelAr: "وحدة سكنية", labelEn: "Units" },
];

const FACTS = [
  { num: 30000, suffix: "m²",  labelAr: "مساحة الأرض الكلية",    labelEn: "Total Plot Area" },
  { num: 29,    suffix: "+",   labelAr: "طابقًا للبرج الإداري", labelEn: "Admin Tower Floors" },
  { num: 116,   suffix: "",    labelAr: "مكتبًا إداريًا",        labelEn: "Office Units" },
  { num: 63,    suffix: "+",   labelAr: "وحدة سكنية",            labelEn: "Residential Units" },
  { num: 3,     suffix: "",    labelAr: "مبانٍ مترابطة",         labelEn: "Connected Buildings" },
  { num: 360,   suffix: "°",   labelAr: "إطلالة بانورامية",      labelEn: "Panoramic View" },
];

const VISION_FACTS = [
  {
    icon: "◈",
    gradient: "linear-gradient(135deg, rgba(184,148,31,0.55) 0%, rgba(100,70,10,0.7) 100%)",
    titleAr: "الفكرة المحورية",
    titleEn: "Core Concept",
    bodyAr: "مشروع ساحلي ديناميكي يذوب فيه المبنى في المشهد الطبيعي، ليخلق انتقالاً سلساً من المدينة إلى البحر.",
    bodyEn: "A fluid waterfront development where architecture dissolves into landscape — a seamless transition from city to sea.",
  },
  {
    icon: "⬡",
    gradient: "linear-gradient(135deg, rgba(30,80,140,0.6) 0%, rgba(30,158,187,0.45) 100%)",
    titleAr: "التصميم البارامتري",
    titleEn: "Parametric Design",
    bodyAr: "واجهات رأسية ديناميكية تتحول من كتل هندسية إلى جلد معماري سائل يربط القاعدة بالبرج.",
    bodyEn: "Dynamic vertical façades evolving from pure geometric masses into a fluid architectural skin.",
  },
  {
    icon: "〜",
    gradient: "linear-gradient(135deg, rgba(10,40,90,0.65) 0%, rgba(20,100,160,0.5) 100%)",
    titleAr: "المد والجزر",
    titleEn: "The Tide Concept",
    bodyAr: "TIDARA مشتق من \"Tide\" — يعكس حركة المياه والإيقاع الطبيعي للمارينا في كل خط معماري.",
    bodyEn: "TIDARA — from \"Tide\" — water movement and the natural rhythm of the marina in every line.",
  },
];

const TOWER_ZONES = [
  { color: "#1E9EBB", nameAr: "برج الفندق",    nameEn: "Hotel Tower",        detailEn: "G+11 · 12,570 m²",  pct: 12 },
  { color: "#B8941F", nameAr: "البرج الإداري", nameEn: "Admin Tower",        detailEn: "G+29 · 24,000 m²",  pct: 48 },
  { color: "#7B68EE", nameAr: "البرج السكني",  nameEn: "Residential Tower",  detailEn: "G+11 · 24,000 m²",  pct: 82 },
];

const MASTERPLAN_PINS = [
  { x: 28, y: 58, titleAr: "برج الفندق",    titleEn: "Hotel Tower",       descEn: "G+11 · 12,570 m²",  color: "#1E9EBB" },
  { x: 50, y: 30, titleAr: "البرج الإداري", titleEn: "Admin Tower",       descEn: "G+29 · 24,000 m²",  color: "#B8941F" },
  { x: 72, y: 58, titleAr: "البرج السكني",  titleEn: "Residential Tower", descEn: "G+11 · 24,000 m²",  color: "#7B68EE" },
];

// ── Counter hook ───────────────────────────────────────────────
function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();
    function step(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [active, target]);
  return val;
}

function FactCard({ num, suffix, labelAr, labelEn, t }: {
  num: number; suffix: string; labelAr: string; labelEn: string;
  t: (ar: string, en: string) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const val = useCountUp(num, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.4 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  const display = num >= 1000 ? val.toLocaleString() : val;

  return (
    <div ref={ref} className="tdr-fact-card">
      <div className="tdr-fact-num-wrap">
        <span className="tdr-fact-num">{display}</span>
        <span className="tdr-fact-suffix">{suffix}</span>
      </div>
      <span className="tdr-fact-label">{t(labelAr, labelEn)}</span>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────
export default function TidaraTowersPage() {
  const { t } = useLang();

  const heroRef  = useRef<HTMLElement>(null);
  const wtRef    = useRef<HTMLDivElement>(null);
  const [wtIdx, setWtIdx]       = useState(0);
  const [activePin, setActivePin] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Hero parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const bg = hero.querySelector<HTMLElement>(".tdr-hero-bg");
    if (!bg) return;
    const ctx = gsap.context(() => {
      gsap.to(bg, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
          scroller: document.documentElement,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Section reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".tdr-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 35 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: "power2.out",
            scrollTrigger: {
              trigger: el, start: "top 93%",
              toggleActions: "play none none none",
              scroller: document.documentElement,
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Walkthrough scroll sync
  useEffect(() => {
    const track = wtRef.current;
    if (!track) return;
    const items = track.querySelectorAll<HTMLElement>(".tdr-wt-item");
    const target = items[wtIdx];
    if (!target) return;
    const left = target.offsetLeft - track.offsetLeft;
    track.scrollTo({ left, behavior: "smooth" });
  }, [wtIdx]);

  // Walkthrough track drag sync → update active index
  useEffect(() => {
    const track = wtRef.current;
    if (!track) return;
    const onScroll = () => {
      const items = track.querySelectorAll<HTMLElement>(".tdr-wt-item");
      const trackLeft = track.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.offsetLeft - track.offsetLeft - trackLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setWtIdx(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const wtPrev = useCallback(() => setWtIdx(i => Math.max(0, i - 1)), []);
  const wtNext = useCallback(() => setWtIdx(i => Math.min(WALKTHROUGHS.length - 1, i + 1)), []);

  // 3D model tilt on mouse move
  const handleModelMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -7, y: dx * 10 });
  }, []);

  const handleModelMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div className="tdr-page">

      {/* ── 1. HERO ── */}
      <section ref={heroRef} className="tdr-hero">
        <div className="tdr-hero-bg">
          <Image src={HERO} alt="Tidara Towers" fill priority unoptimized
            className="object-cover object-center" sizes="100vw" />
        </div>
        <div className="tdr-hero-overlay" />
        <div className="tdr-hero-overlay tdr-hero-overlay--bottom" />

        <div className="tdr-hero-content">
          <Link href="/#map" className="tdr-back-link">
            ← {t("العودة للمشاريع", "Back to Projects")}
          </Link>
          <p className="tdr-hero-eyebrow">
            {t("الخبر · الواجهة البحرية · متعدد الاستخدامات", "Al-Khobar · Waterfront · Mixed-Use")}
          </p>
          <h1 className="tdr-hero-title">
            TIDARA
            <em>TOWERS</em>
          </h1>
          <p className="tdr-hero-sub">
            {t("حافة حية بين المدينة والبحر", "A Living Edge Between City and Sea")}
          </p>
          <div className="tdr-hero-stats">
            {HERO_STATS.map((s, i) => (
              <div key={i} className="tdr-hero-stat">
                <span className="tdr-hero-stat-val">{s.value}</span>
                <span className="tdr-hero-stat-lbl">{t(s.labelAr, s.labelEn)}</span>
                {i < HERO_STATS.length - 1 && <span className="tdr-hero-stat-sep" />}
              </div>
            ))}
          </div>
        </div>

        <div className="tdr-hero-waves" aria-hidden>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path className="tdr-wave tdr-wave--2"
              d="M0,70 C200,30 400,100 600,65 C800,30 1000,85 1200,65 C1320,50 1380,78 1440,70 L1440,100 L0,100 Z" />
            <path className="tdr-wave tdr-wave--1"
              d="M0,50 C180,90 360,15 540,55 C720,90 900,15 1080,55 C1260,90 1350,35 1440,55 L1440,100 L0,100 Z" />
          </svg>
        </div>

        <div className="tdr-scroll-cue" aria-hidden>
          <span className="tdr-scroll-line" />
          <span>{t("تمرير", "Scroll")}</span>
        </div>
      </section>

      {/* ── 2. FACTS — directly below hero ── */}
      <section className="tdr-facts">
        <div className="tdr-facts-inner">
          <p className="tdr-facts-eyebrow tdr-reveal">{t("بالأرقام", "By The Numbers")}</p>
          <div className="tdr-facts-grid">
            {FACTS.map((f, i) => (
              <FactCard key={i} {...f} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. VISION ── */}
      <section className="tdr-vision">
        <div className="tdr-vision-inner">
          <div className="tdr-vision-left tdr-reveal">
            <p className="tdr-section-tag">{t("رؤية المشروع", "Project Vision")}</p>
            <blockquote className="tdr-vision-quote">
              {t(
                '"مشروع ساحلي أيقوني في الخبر — حيث تلتقي العمارة البارامترية بمشهد المارينا في تجربة حضرية استثنائية"',
                '"An iconic waterfront development in Al-Khobar — where parametric architecture meets the marina landscape in an exceptional urban experience"',
              )}
            </blockquote>
            <div className="tdr-vision-rule" />
            <p className="tdr-vision-credit">CUBE Consultants · Khobar, Saudi Arabia · 2026</p>
          </div>

          <div className="tdr-vision-right">
            {VISION_FACTS.map((f, i) => (
              <div
                key={i}
                className="tdr-vision-fact tdr-reveal"
                style={{ "--vf-gradient": f.gradient, "--delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className="tdr-vf-bg" aria-hidden />
                <div className="tdr-vf-content">
                  <div className="tdr-vf-icon">{f.icon}</div>
                  <h3 className="tdr-vf-title">{t(f.titleAr, f.titleEn)}</h3>
                  <p className="tdr-vf-body">{t(f.bodyAr, f.bodyEn)}</p>
                </div>
                <div className="tdr-vf-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. 3D TOWER MODEL ── */}
      <section className="tdr-tower-section">
        <div className="tdr-section-header tdr-reveal">
          <p className="tdr-section-tag">{t("النموذج المعماري", "Architectural Model")}</p>
          <h2 className="tdr-section-title">{t("مجمع تيدارا", "The Tidara Complex")}</h2>
          <p className="tdr-section-sub">{t("حرّك الماوس فوق النموذج للاستكشاف", "Hover over the model to explore")}</p>
        </div>

        <div className="tdr-model-layout">
          {/* Left zone labels */}
          <div className="tdr-model-zones tdr-reveal">
            {TOWER_ZONES.slice(0, 2).map((z, i) => (
              <div key={i} className="tdr-zone-pill" style={{ "--zc": z.color } as React.CSSProperties}>
                <span className="tdr-zone-dot" />
                <div>
                  <span className="tdr-zone-name">{t(z.nameAr, z.nameEn)}</span>
                  <span className="tdr-zone-detail">{z.detailEn}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 3D Tower render with tilt on hover */}
          <div
            className="tdr-model-wrap tdr-reveal"
            onMouseMove={handleModelMouseMove}
            onMouseLeave={handleModelMouseLeave}
            style={{
              transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.7s cubic-bezier(0.23,1,0.32,1)" : "transform 0.1s ease-out",
            }}
          >
            <div className="tdr-model-glow" />
            <div className="tdr-model-shadow" />
            <Image
              src={TOWER_3D}
              alt="Tidara Towers 3D Model"
              width={520}
              height={780}
              unoptimized
              className="tdr-model-img"
              priority
            />
          </div>

          {/* Right zone label */}
          <div className="tdr-model-zones tdr-reveal">
            <div className="tdr-zone-pill" style={{ "--zc": TOWER_ZONES[2].color } as React.CSSProperties}>
              <span className="tdr-zone-dot" />
              <div>
                <span className="tdr-zone-name">{t(TOWER_ZONES[2].nameAr, TOWER_ZONES[2].nameEn)}</span>
                <span className="tdr-zone-detail">{TOWER_ZONES[2].detailEn}</span>
              </div>
            </div>
            <div className="tdr-model-stats tdr-reveal">
              <div className="tdr-ms-item">
                <span className="tdr-ms-val">60,570</span>
                <span className="tdr-ms-unit">m²</span>
                <span className="tdr-ms-lbl">{t("إجمالي BUA", "Total BUA")}</span>
              </div>
              <div className="tdr-ms-item">
                <span className="tdr-ms-val">112</span>
                <span className="tdr-ms-unit">m</span>
                <span className="tdr-ms-lbl">{t("أقصى ارتفاع", "Max Height")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. MASTERPLAN ── */}
      <section className="tdr-masterplan">
        <div className="tdr-section-header tdr-reveal">
          <p className="tdr-section-tag">{t("المخطط العام", "Site Masterplan")}</p>
          <h2 className="tdr-section-title">{t("الموقع والتخطيط", "Site & Layout")}</h2>
        </div>
        <div className="tdr-masterplan-wrap tdr-reveal">
          <div className="tdr-masterplan-img">
            <Image src={MASTERPLAN} alt="Tidara Towers Masterplan" fill unoptimized
              className="object-cover" sizes="100vw" />
            <div className="tdr-masterplan-overlay" />
          </div>
          {MASTERPLAN_PINS.map((pin, i) => (
            <button
              key={i}
              className={`tdr-pin ${activePin === i ? "tdr-pin--active" : ""}`}
              style={{ left: `${pin.x}%`, top: `${pin.y}%`, "--pin-color": pin.color } as React.CSSProperties}
              onClick={() => setActivePin(activePin === i ? null : i)}
            >
              <span className="tdr-pin-ring" />
              <span className="tdr-pin-dot" />
              <div className="tdr-pin-card">
                <p className="tdr-pin-title">{t(pin.titleAr, pin.titleEn)}</p>
                <p className="tdr-pin-desc">{pin.descEn}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── 6. WALKTHROUGH ── */}
      <section className="tdr-walkthrough">
        <div className="tdr-walkthrough-inner">
          <div className="tdr-wt-header tdr-reveal">
            <p className="tdr-section-tag">{t("جولة افتراضية", "Visual Walkthrough")}</p>
            <h2 className="tdr-section-title">{t("استكشف الأجواء", "Experience the Atmosphere")}</h2>
          </div>

          <div className="tdr-wt-track" ref={wtRef}>
            {WALKTHROUGHS.map((wt, i) => (
              <div key={i} className={`tdr-wt-item ${i === wtIdx ? "tdr-wt-item--active" : ""}`}>
                <div className="tdr-wt-img-wrap">
                  <Image src={wt.src} alt={wt.labelEn} fill unoptimized
                    className="object-cover" sizes="(max-width: 768px) 90vw, 60vw" />
                  <div className="tdr-wt-overlay" />
                </div>
                <p className="tdr-wt-caption">
                  <span className="tdr-wt-num">0{i + 1}</span>
                  {t(wt.labelAr, wt.labelEn)}
                </p>
              </div>
            ))}
          </div>

          <div className="tdr-wt-nav">
            <button className="tdr-wt-btn" onClick={wtPrev} disabled={wtIdx === 0} aria-label="Previous">←</button>
            <div className="tdr-wt-dots">
              {WALKTHROUGHS.map((_, i) => (
                <button key={i}
                  className={`tdr-wt-dot ${i === wtIdx ? "tdr-wt-dot--active" : ""}`}
                  onClick={() => setWtIdx(i)}
                />
              ))}
            </div>
            <button className="tdr-wt-btn" onClick={wtNext} disabled={wtIdx === WALKTHROUGHS.length - 1} aria-label="Next">→</button>
          </div>
        </div>
      </section>

      {/* ── 7. ARCHITECTURE & INTERIOR ── */}
      <section className="tdr-arch-section">
        <div className="tdr-section-header tdr-reveal">
          <p className="tdr-section-tag">{t("التصميم المعماري", "Architecture & Interior")}</p>
          <h2 className="tdr-section-title">{t("الواجهة والفضاء الداخلي", "Façade & Interior Space")}</h2>
        </div>
        <div className="tdr-elevation tdr-reveal">
          <Image src={ELEVATION} alt="Elevation Façade" fill unoptimized
            className="object-cover object-top" sizes="100vw" />
          <div className="tdr-elevation-overlay" />
          <p className="tdr-elevation-label">{t("الواجهة المعمارية", "Architectural Façade")}</p>
        </div>
        <div className="tdr-interior-grid">
          {[
            { src: INTERIOR_1, labelAr: "الردهة الداخلية",   labelEn: "Interior Lobby" },
            { src: INTERIOR_2, labelAr: "المساحات المشتركة", labelEn: "Common Areas" },
          ].map((item, i) => (
            <div key={i} className="tdr-interior-item tdr-reveal">
              <div className="tdr-interior-img">
                <Image src={item.src} alt={item.labelEn} fill unoptimized
                  className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="tdr-interior-overlay" />
              </div>
              <p className="tdr-interior-label">{t(item.labelAr, item.labelEn)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section className="tdr-cta">
        <div className="tdr-cta-glow" />
        <div className="tdr-cta-inner tdr-reveal">
          <p className="tdr-section-tag tdr-section-tag--light">{t("الخطوة التالية", "Next Step")}</p>
          <h2 className="tdr-cta-title">
            {t("هل أنت مستعد؟", "Ready to Invest?")}
            <em>{t("اكتشف تيدارا", "Discover Tidara")}</em>
          </h2>
          <p className="tdr-cta-sub">
            {t(
              "تواصل معنا للحصول على ملف المشروع الكامل وبدء رحلتك الاستثمارية في الخبر.",
              "Get in touch for the full project brief and start your investment journey in Al-Khobar.",
            )}
          </p>
          <div className="tdr-cta-btns">
            <Link href="/contact"  className="tdr-cta-btn tdr-cta-btn--primary">{t("تواصل معنا",      "Contact Us")}</Link>
            <Link href="/#map"     className="tdr-cta-btn tdr-cta-btn--ghost">{t("استعرض المشاريع", "View All Projects")}</Link>
          </div>
        </div>
        <div className="tdr-cta-waves" aria-hidden>
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path className="tdr-cta-wave" d="M0,100 C360,40 720,160 1080,100 C1260,70 1380,120 1440,100 L1440,200 L0,200 Z" />
          </svg>
        </div>
      </section>
    </div>
  );
}

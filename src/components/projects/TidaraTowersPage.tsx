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
const HERO       = `${BASE}/Hero.png`;
const TOWER_3D   = `${BASE}/3D-Tower.png`;
const MASTERPLAN = `${BASE}/masterplan.png`;
const ELEVATION  = `${BASE}/elevation-facade.png`;
const INTERIOR_1 = `${BASE}/interior-1.png`;
const INTERIOR_2 = `${BASE}/interior-2.png`;
const WALKTHROUGHS = [
  { src: `${BASE}/walkthrough-1.png`, labelAr: "المدخل الرئيسي",    labelEn: "Main Entrance" },
  { src: `${BASE}/walkthrough-2.png`, labelAr: "الواجهة البحرية",   labelEn: "Waterfront Façade" },
  { src: `${BASE}/walkthrough-3.png`, labelAr: "المشهد الخارجي",    labelEn: "Exterior View" },
  { src: `${BASE}/walkthrough-4.png`, labelAr: "المشاة والميناء",   labelEn: "Promenade & Marina" },
  { src: `${BASE}/walkthrough-5.png`, labelAr: "الليل والإضاءة",    labelEn: "Night Illumination" },
  { src: `${BASE}/walkthrough-6.png`, labelAr: "التفاصيل المعمارية", labelEn: "Architectural Detail" },
];

// ── Data ───────────────────────────────────────────────────────
const HERO_STATS = [
  { value: "3",    labelAr: "مبانٍ",       labelEn: "Buildings" },
  { value: "G+29", labelAr: "طوابق",       labelEn: "Floors" },
  { value: "116",  labelAr: "مكتب",        labelEn: "Offices" },
  { value: "63+",  labelAr: "وحدة سكنية", labelEn: "Units" },
];

const FACTS = [
  { num: 30000, display: "30K",  suffix: "m²", labelAr: "مساحة الأرض الكلية",     labelEn: "Total Plot Area" },
  { num: 29,    display: "29",   suffix: "+",  labelAr: "طابقًا للبرج الإداري",   labelEn: "Admin Tower Floors" },
  { num: 116,   display: "116",  suffix: "",   labelAr: "مكتبًا إداريًا",          labelEn: "Office Units" },
  { num: 63,    display: "63",   suffix: "+",  labelAr: "وحدة سكنية",              labelEn: "Residential Units" },
  { num: 112,   display: "112",  suffix: "m",  labelAr: "الارتفاع الأقصى",         labelEn: "Max Height" },
  { num: 360,   display: "360",  suffix: "°",  labelAr: "إطلالة بانورامية",        labelEn: "Panoramic View" },
];

// Vision fact cards — each has a unique gradient "image" bg
const VISION_FACTS = [
  {
    icon: "◎",
    titleAr: "الفكرة المحورية",
    titleEn: "Core Concept",
    bodyAr: "مشروع ساحلي ديناميكي يذوب فيه المبنى في المشهد الطبيعي، ليخلق انتقالاً سلساً من المدينة إلى البحر.",
    bodyEn: "A fluid waterfront development where architecture dissolves into landscape — a seamless transition from city to sea.",
    bg: "linear-gradient(135deg, #0A2438 0%, #123A55 50%, #0A1E2E 100%)",
    glow: "#1E9EBB",
  },
  {
    icon: "⬡",
    titleAr: "التصميم البارامتري",
    titleEn: "Parametric Design",
    bodyAr: "واجهات رأسية ديناميكية تتحول من كتل هندسية إلى جلد معماري سائل يربط القاعدة بالبرج.",
    bodyEn: "Dynamic vertical façades evolving from pure geometric masses into a fluid architectural skin.",
    bg: "linear-gradient(135deg, #181820 0%, #252530 50%, #141420 100%)",
    glow: "#8B7FD4",
  },
  {
    icon: "〜",
    titleAr: "المد والجزر",
    titleEn: "The Tide Concept",
    bodyAr: "TIDARA — مشتق من \"Tide\" — يعكس حركة المياه والإيقاع الطبيعي للمارينا في كل خط معماري.",
    bodyEn: "TIDARA — derived from \"Tide\" — reflects water movement and the natural rhythm of the marina.",
    bg: "linear-gradient(135deg, #051828 0%, #082838 50%, #051020 100%)",
    glow: "#0FB8CC",
  },
];

const TOWER_ZONES = [
  { color: "#1E9EBB", titleAr: "برج الفندق",   titleEn: "Hotel Tower",       detailEn: "G+11 · 12,570 m²" },
  { color: "#C4A030", titleAr: "البرج الإداري", titleEn: "Admin Tower",       detailEn: "G+29 · 24,000 m²" },
  { color: "#9B89E0", titleAr: "البرج السكني",  titleEn: "Residential Tower", detailEn: "G+11 · 63+ Units" },
];

// Masterplan pins — positioned to match building clusters in the masterplan image
const MASTERPLAN_PINS = [
  { x: 22, y: 55, titleAr: "برج الفندق",   titleEn: "Hotel Tower",       descAr: "G+11 · 12,570 m² · 200+ غرفة",  descEn: "G+11 · 12,570 m² · 200+ Rooms", color: "#1E9EBB" },
  { x: 50, y: 35, titleAr: "البرج الإداري", titleEn: "Admin Tower",       descAr: "G+29 · 24,000 m² · 116 مكتب",  descEn: "G+29 · 24,000 m² · 116 Offices", color: "#C4A030" },
  { x: 76, y: 55, titleAr: "البرج السكني",  titleEn: "Residential Tower", descAr: "G+11 · 24,000 m² · 63+ وحدة", descEn: "G+11 · 24,000 m² · 63+ Units",  color: "#9B89E0" },
];

// ── 3D Tower image showcase with mouse-tilt ───────────────────
function TidaraTower3DView() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ rx: 0, ry: 0 });
  const currentRef = useRef({ rx: 0, ry: 0 });
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [hinted, setHinted] = useState(false);

  useEffect(() => {
    function animate() {
      const t = currentRef.current;
      const g = targetRef.current;
      t.rx += (g.rx - t.rx) * 0.07;
      t.ry += (g.ry - t.ry) * 0.07;
      if (innerRef.current) {
        innerRef.current.style.transform =
          `perspective(1400px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRef.current = { rx: y * -14, ry: x * 12 };
    setHinted(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { rx: 0, ry: 0 };
  }, []);

  return (
    <div
      ref={containerRef}
      className="tdr-tower-3d-view"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className="tdr-tower-3d-inner">
        <Image
          src={TOWER_3D}
          alt="Tidara Towers 3D Render"
          fill
          unoptimized
          className="object-contain object-bottom"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
        <div className="tdr-tower-3d-ground" />
      </div>
      <p className="tdr-tower-3d-hint">
        {hinted
          ? t("← حرك للاستكشاف →", "← Move to explore →")
          : t("← مرر الماوس فوق البرج →", "← Hover over the tower →")}
      </p>
    </div>
  );
}

// ── Animated counter ───────────────────────────────────────────
function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 2000;
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

function FactCard({ num, display, suffix, labelAr, labelEn, t }: {
  num: number; display: string; suffix: string;
  labelAr: string; labelEn: string;
  t: (ar: string, en: string) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const val = useCountUp(num, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.4 },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // For large numbers use short display (30K instead of 30,000)
  const shown = display !== String(num) ? display : (num >= 1000 ? val.toLocaleString() : val);

  return (
    <div ref={ref} className="tdr-fact-card">
      <span className="tdr-fact-num">
        {active ? shown : "0"}
        <span className="tdr-fact-suffix">{suffix}</span>
      </span>
      <span className="tdr-fact-label">{t(labelAr, labelEn)}</span>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────
export default function TidaraTowersPage() {
  const { t } = useLang();
  const heroRef  = useRef<HTMLElement>(null);
  const wtRef    = useRef<HTMLDivElement>(null);
  const [wtIdx, setWtIdx]           = useState(0);
  const [activePin, setActivePin]   = useState<number | null>(null);

  // Hero parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const bg = hero.querySelector<HTMLElement>(".tdr-hero-bg");
    if (!bg) return;
    const ctx = gsap.context(() => {
      gsap.to(bg, {
        yPercent: 25, ease: "none",
        scrollTrigger: {
          trigger: hero, start: "top top", end: "bottom top",
          scrub: true, scroller: document.documentElement,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".tdr-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: "power2.out",
            scrollTrigger: {
              trigger: el, start: "top 92%",
              toggleActions: "play none none none",
              scroller: document.documentElement,
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Walkthrough — scroll to item by offsetLeft
  const scrollWt = useCallback((idx: number) => {
    const track = wtRef.current;
    if (!track) return;
    const items = track.querySelectorAll<HTMLElement>(".tdr-wt-item");
    const target = items[idx];
    if (!target) return;
    const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({ left: target.offsetLeft - padding, behavior: "smooth" });
  }, []);

  const wtPrev = useCallback(() => {
    setWtIdx(i => { const n = Math.max(0, i - 1); scrollWt(n); return n; });
  }, [scrollWt]);

  const wtNext = useCallback(() => {
    setWtIdx(i => { const n = Math.min(WALKTHROUGHS.length - 1, i + 1); scrollWt(n); return n; });
  }, [scrollWt]);

  // Sync dot indicator when user manually scrolls track
  useEffect(() => {
    const track = wtRef.current;
    if (!track) return;
    const handleScroll = () => {
      const items = track.querySelectorAll<HTMLElement>(".tdr-wt-item");
      let closest = 0;
      let minDist = Infinity;
      items.forEach((el, i) => {
        const dist = Math.abs(el.offsetLeft - track.scrollLeft - parseFloat(getComputedStyle(track).paddingLeft || "0"));
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setWtIdx(closest);
    };
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

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
            TIDARA<em>TOWERS</em>
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
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path className="tdr-wave tdr-wave--1"
              d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 C1260,100 1350,40 1440,60 L1440,120 L0,120 Z" />
            <path className="tdr-wave tdr-wave--2"
              d="M0,80 C200,40 400,100 600,70 C800,40 1000,90 1200,70 C1320,55 1380,80 1440,80 L1440,120 L0,120 Z" />
          </svg>
        </div>

        <div className="tdr-scroll-cue" aria-hidden>
          <span className="tdr-scroll-line" />
          <span>{t("تمرير", "Scroll")}</span>
        </div>
      </section>

      {/* ── 2. FACTS (directly below hero) ── */}
      <section className="tdr-facts">
        <div className="tdr-section-header tdr-reveal">
          <p className="tdr-section-tag tdr-section-tag--light">{t("بيانات المشروع", "Project Data")}</p>
          <h2 className="tdr-section-title tdr-section-title--light">{t("الأرقام تتحدث", "The Numbers Speak")}</h2>
        </div>
        <div className="tdr-facts-grid">
          {FACTS.map((f, i) => (
            <FactCard key={i} {...f} t={t} />
          ))}
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
                '"An iconic waterfront landmark in Al-Khobar — where parametric architecture meets the marina landscape in an exceptional urban experience"',
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
                style={{
                  "--delay": `${i * 0.12}s`,
                  "--card-bg": f.bg,
                  "--card-glow": f.glow,
                } as React.CSSProperties}
              >
                {/* Background overlay pattern */}
                <div className="tdr-vf-bg" />
                <div className="tdr-vf-body">
                  <div className="tdr-vision-fact-icon">{f.icon}</div>
                  <div className="tdr-vision-fact-text">
                    <h3>{t(f.titleAr, f.titleEn)}</h3>
                    <p>{t(f.bodyAr, f.bodyEn)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. 3D TOWER ── */}
      <section className="tdr-tower-section">
        <div className="tdr-section-header tdr-reveal">
          <p className="tdr-section-tag tdr-section-tag--light">{t("البرج التفاعلي", "Interactive Showcase")}</p>
          <h2 className="tdr-section-title tdr-section-title--light">
            {t("استكشف المشروع", "Explore the Complex")}
          </h2>
        </div>

        <div className="tdr-tower-layout">
          {/* Left — zone info + project stats */}
          <div className="tdr-tower-info-col">
            <p className="tdr-tower-col-label tdr-reveal">{t("مكونات المشروع", "Project Components")}</p>
            {TOWER_ZONES.map((z, i) => (
              <div key={i} className="tdr-zone-card tdr-reveal"
                style={{ "--zone-color": z.color } as React.CSSProperties}>
                <span className="tdr-zone-dot" />
                <div>
                  <span className="tdr-zone-title">{t(z.titleAr, z.titleEn)}</span>
                  <span className="tdr-zone-detail">{z.detailEn}</span>
                </div>
              </div>
            ))}
            <div className="tdr-tower-divider" />
            <p className="tdr-tower-col-label tdr-reveal">{t("إحصائيات", "Key Stats")}</p>
            {[
              { labelAr: "إجمالي مساحة البناء", labelEn: "Total BUA", val: "60,570 m²" },
              { labelAr: "أعلى ارتفاع",        labelEn: "Max Height",  val: "112 m" },
              { labelAr: "الإطار الزمني",       labelEn: "Timeline",    val: "2026" },
            ].map((s, i) => (
              <div key={i} className="tdr-tower-stat tdr-reveal">
                <span className="tdr-tower-stat-lbl">{t(s.labelAr, s.labelEn)}</span>
                <span className="tdr-tower-stat-val">{s.val}</span>
              </div>
            ))}
          </div>

          {/* Right — real 3D tower image with mouse-tilt */}
          <TidaraTower3DView />
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
                <p className="tdr-pin-desc">{t(pin.descAr, pin.descEn)}</p>
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
                  <div className="tdr-wt-shimmer" />
                </div>
                <p className="tdr-wt-caption">
                  <span className="tdr-wt-num">0{i + 1}</span>
                  {t(wt.labelAr, wt.labelEn)}
                </p>
              </div>
            ))}
          </div>

          <div className="tdr-wt-nav">
            <button className="tdr-wt-btn" onClick={wtPrev} disabled={wtIdx === 0} aria-label="Previous">
              ←
            </button>
            <div className="tdr-wt-dots">
              {WALKTHROUGHS.map((_, i) => (
                <button key={i}
                  className={`tdr-wt-dot ${i === wtIdx ? "tdr-wt-dot--active" : ""}`}
                  onClick={() => { setWtIdx(i); scrollWt(i); }}
                />
              ))}
            </div>
            <button className="tdr-wt-btn" onClick={wtNext} disabled={wtIdx === WALKTHROUGHS.length - 1} aria-label="Next">
              →
            </button>
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
            <em>{t(" اكتشف تيدارا", " Discover Tidara")}</em>
          </h2>
          <p className="tdr-cta-sub">
            {t(
              "تواصل معنا للحصول على ملف المشروع الكامل وبدء رحلتك الاستثمارية في الخبر.",
              "Get in touch for the full project brief and start your investment journey in Al-Khobar.",
            )}
          </p>
          <div className="tdr-cta-btns">
            <Link href="/contact" className="tdr-cta-btn tdr-cta-btn--primary">
              {t("تواصل معنا", "Contact Us")}
            </Link>
            <Link href="/#map" className="tdr-cta-btn tdr-cta-btn--ghost">
              {t("استعرض المشاريع", "View All Projects")}
            </Link>
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

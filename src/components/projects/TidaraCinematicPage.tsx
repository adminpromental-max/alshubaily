"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/lang-context";

gsap.registerPlugin(ScrollTrigger);

// ── Assets (placeholders — swap when real files are uploaded) ──
const BASE = "/assets/projects/tidara-tower";
const INTRO_POSTER    = `${BASE}/Hero.png`;
const FACADE_BG       = `${BASE}/elevation-facade.png`;
const PANORAMA_SRC    = `${BASE}/masterplan.png`;
const NIGHT_BG        = `${BASE}/3D-Tower.png`;

// Cloudinary video slots — fill in URLs when uploaded
const INTRO_VIDEO     = "";
const PODIUM_VIDEO    = "";
const HOTEL_VIDEO     = "";
const SKYLOUNGE_VIDEO = "";

const JOURNEY_STOPS = [
  {
    id: "podium",
    poster: `${BASE}/walkthrough-1.png`,
    video: PODIUM_VIDEO,
    tagAr: "المنصة الأرضية",         tagEn: "The Public Podium",
    titleAr: "نبض الحياة الاجتماعية", titleEn: "The Pulse of Social Life",
    bodyAr: "مطاعم راقية ومقاهٍ تطل مباشرةً على مارينا الخبر — حيث تلتقي الأناقة بحياة الشارع.",
    bodyEn: "Upscale F&B and cafés opening directly onto the Al-Khobar marina — where elegance meets street life.",
    stats: ["F&B · Retail", "Direct Marina Access", "1,300 m² / floor"],
    accent: "#1E9EBB",
  },
  {
    id: "hotel",
    poster: `${BASE}/interior-1.png`,
    video: HOTEL_VIDEO,
    tagAr: "برج الفندق",            tagEn: "The Hotel Tower",
    titleAr: "ضيافة فاخرة بمفهوم جديد", titleEn: "Luxury Hospitality Redefined",
    bodyAr: "200+ غرفة بإطلالات بحرية، SPA عالمي ونادٍ صحي — كل ذلك على G+11 فوق الواجهة البحرية.",
    bodyEn: "200+ sea-view rooms, a world-class SPA and Gymnasium — rising G+11 above the waterfront.",
    stats: ["200+ Rooms", "SPA & Gymnasium", "G+11 · 12,570 m²"],
    accent: "#C4A030",
  },
  {
    id: "admin",
    poster: `${BASE}/walkthrough-4.png`,
    video: SKYLOUNGE_VIDEO,
    tagAr: "الإداري والسكني",         tagEn: "Admin & Residential",
    titleAr: "أفق جديد للعمل والعيش", titleEn: "A New Horizon for Work & Life",
    bodyAr: "Sky Lounge على قمة أعلى برج بالخبر، مكاتب ذكية بإطلالة 360° على البحر وشقق بشرفات متدرجة.",
    bodyEn: "Sky Lounge atop Al-Khobar's tallest tower, smart offices with 360° sea views, and stepped terrace apartments.",
    stats: ["G+29 · 112 m", "360° Sky Lounge", "116 Offices + 63 Units"],
    accent: "#9B89E0",
  },
];

// ── Cinematic Loader ────────────────────────────────────────────
function CinematicLoader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const dur = 2000;
    const t0 = performance.now();
    let raf: number;
    function step(now: number) {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 2.5);
      setPct(Math.round(ease * 100));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onDone, 700);
        }, 250);
      }
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`tdc-loader${leaving ? " tdc-loader--out" : ""}`} aria-hidden>
      <div className="tdc-loader-inner">
        <div className="tdc-loader-logo">
          <span className="tdc-loader-t">TIDARA</span>
          <span className="tdc-loader-s">TOWERS</span>
        </div>
        <div className="tdc-loader-track">
          <div className="tdc-loader-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="tdc-loader-pct">{pct}</span>
      </div>
    </div>
  );
}

// ── Ambient Music Toggle ────────────────────────────────────────
function MusicToggle() {
  const [on, setOn] = useState(false);
  const ctx    = useRef<AudioContext | null>(null);
  const gain   = useRef<GainNode | null>(null);
  const oscs   = useRef<OscillatorNode[]>([]);

  const toggle = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!on) {
      if (!ctx.current) ctx.current = new AudioContext();
      const ac = ctx.current;
      const g  = ac.createGain();
      const f  = ac.createBiquadFilter();
      f.type = "lowpass"; f.frequency.value = 350;
      g.gain.setValueAtTime(0, ac.currentTime);
      g.gain.linearRampToValueAtTime(0.032, ac.currentTime + 3);
      f.connect(g); g.connect(ac.destination);
      const freqs = [55, 82.4, 110, 164.8];
      oscs.current = freqs.map((hz) => {
        const o = ac.createOscillator();
        o.type = "sine"; o.frequency.value = hz;
        o.connect(f); o.start();
        return o;
      });
      gain.current = g;
      setOn(true);
    } else {
      const ac = ctx.current!;
      const g  = gain.current!;
      g.gain.linearRampToValueAtTime(0, ac.currentTime + 1.5);
      setTimeout(() => oscs.current.forEach((o) => { try { o.stop(); } catch { /* */ } }), 1600);
      oscs.current = [];
      setOn(false);
    }
  }, [on]);

  return (
    <button className={`tdc-music${on ? " tdc-music--on" : ""}`} onClick={toggle} title="Ambient sound">
      <span className="tdc-music-icon">{on ? "♫" : "♩"}</span>
      <span className="tdc-music-lbl">{on ? "ON" : "OFF"}</span>
    </button>
  );
}

// ── Parametric Ribs SVG ─────────────────────────────────────────
function ParametricRibs() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const lines = Array.from(svg.querySelectorAll("line"));
    lines.forEach((l) => {
      l.style.strokeDasharray = "1";
      l.style.strokeDashoffset = "1";
    });
    const ctx = gsap.context(() => {
      gsap.to(lines, {
        strokeDashoffset: 0,
        stagger: 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: ".tdc-parametric-wrap",
          start: "top 60%",
          end: "center 15%",
          scrub: 1.5,
          scroller: document.documentElement,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // 34 parametric ribs — sinusoidal spacing to mimic louver wave
  const N = 34;
  const ribs = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1);
    const wave = Math.sin(t * Math.PI);
    return {
      x: t * 100,
      yTop: 2 + wave * 18,      // top point varies with wave
      opacity: 0.25 + wave * 0.55,
      strokeW: 0.08 + wave * 0.12,
    };
  });

  return (
    <svg
      ref={svgRef}
      className="tdc-ribs-svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {ribs.map((r, i) => (
        <line
          key={i}
          x1={`${r.x}`} y1="100"
          x2={`${r.x}`} y2={`${r.yTop}`}
          stroke="#1E9EBB"
          strokeWidth={`${r.strokeW}`}
          strokeLinecap="round"
          style={{ opacity: r.opacity }}
          pathLength="1"
        />
      ))}
      {/* Waterline */}
      <path
        d="M0,96 C15,93 30,98 50,95 C70,92 85,97 100,94"
        fill="none" stroke="rgba(30,158,187,0.3)"
        strokeWidth="0.2"
        pathLength="1"
        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
        className="tdc-waterline"
      />
    </svg>
  );
}

// ── 360° Panorama Drag ──────────────────────────────────────────
function PanoramaDrag({ src, t }: { src: string; t: (ar: string, en: string) => string }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const drag     = useRef({ active: false, startX: 0, baseX: 0, curX: 0 });
  const rafRef   = useRef<number>(0);
  const [hinted, setHinted] = useState(false);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const getMaxPan = () => {
    const wrap = wrapRef.current;
    if (!wrap) return 0;
    return wrap.offsetWidth * 3.5; // panorama is ~5× wide, container is 100vw
  };

  const applyX = (x: number) => {
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${x}px)`;
    }
  };

  // Auto-pan with mouse position when not dragging
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (drag.current.active) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    if (e.clientY < rect.top || e.clientY > rect.bottom) return;
    const t = (e.clientX - rect.left) / rect.width; // 0…1
    const max = getMaxPan();
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => applyX(-t * max));
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { active: true, startX: e.clientX, baseX: drag.current.curX, curX: drag.current.curX };
    setHinted(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    const max = getMaxPan();
    const next = clamp(drag.current.baseX + dx, -max, 0);
    drag.current.curX = next;
    applyX(next);
  };

  const onPointerUp = () => { drag.current.active = false; };

  return (
    <div
      ref={wrapRef}
      className="tdc-panorama-wrap"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div ref={innerRef} className="tdc-panorama-inner">
        <Image src={src} alt="360° Marina View" fill unoptimized
          className="object-cover object-left" sizes="600vw" />
        <div className="tdc-panorama-vignette" />
      </div>
      <div className="tdc-panorama-overlay">
        <p className="tdc-panorama-label">
          {t("الخبر · واجهة المارينا · إطلالة بانورامية", "Al-Khobar · Marina Waterfront · Panoramic View")}
        </p>
        <p className="tdc-panorama-hint">
          {hinted
            ? t("← اسحب لاستكشاف المشهد →", "← Drag to explore →")
            : t("← حرك الماوس أو اسحب لاستكشاف →", "← Move mouse or drag to explore →")}
        </p>
      </div>
    </div>
  );
}

// ── Main Cinematic Page ─────────────────────────────────────────
export default function TidaraCinematicPage() {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);
  const [activeBld, setActiveBld] = useState(0);

  const introRef     = useRef<HTMLElement>(null);
  const paramWrapRef = useRef<HTMLDivElement>(null);
  const journeyRef   = useRef<HTMLDivElement>(null);

  // Scroll-reveal for intro text
  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tdc-intro-eyebrow",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 },
      );
      gsap.fromTo(".tdc-intro-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.45 },
      );
      gsap.fromTo(".tdc-intro-tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 },
      );
      gsap.fromTo(".tdc-intro-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.4 },
      );

      // Hero parallax
      const hero = introRef.current;
      if (hero) {
        const bg = hero.querySelector<HTMLElement>(".tdc-intro-bg");
        if (bg) {
          gsap.to(bg, {
            yPercent: 22, ease: "none",
            scrollTrigger: {
              trigger: hero, start: "top top", end: "bottom top",
              scrub: true, scroller: document.documentElement,
            },
          });
        }
      }
    });
    return () => ctx.revert();
  }, [loaded]);

  // Parametric text reveals
  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tdc-param-line-1",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: {
            trigger: ".tdc-parametric-wrap",
            start: "top 55%",
            toggleActions: "play none none none",
            scroller: document.documentElement,
          },
        },
      );
      gsap.fromTo(".tdc-param-line-2",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: {
            trigger: ".tdc-parametric-wrap",
            start: "top 40%",
            toggleActions: "play none none none",
            scroller: document.documentElement,
          },
        },
      );

      // Waterline animation
      const waterline = document.querySelector<SVGPathElement>(".tdc-waterline");
      if (waterline) {
        gsap.to(waterline, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".tdc-parametric-wrap",
            start: "top 50%", end: "center 20%",
            scrub: 2,
            scroller: document.documentElement,
          },
        });
      }
    });
    return () => ctx.revert();
  }, [loaded]);

  // Journey crossfade timeline
  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".tdc-journey-wrapper",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          scroller: document.documentElement,
          onUpdate: (self) => {
            const idx = Math.min(2, Math.floor(self.progress * 3));
            setActiveBld(idx);
          },
        },
      });

      // Phase 1 → 2: fade out podium, fade in hotel
      tl.to(".tdc-bld-0", { opacity: 0, scale: 1.04, duration: 0.5 }, 0.25)
        .fromTo(".tdc-bld-1", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.25)
        // Phase 2 → 3: fade out hotel, fade in admin
        .to(".tdc-bld-1", { opacity: 0, scale: 1.04, duration: 0.5 }, 0.6)
        .fromTo(".tdc-bld-2", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.6);
    });
    return () => ctx.revert();
  }, [loaded]);

  // General scroll reveals
  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".tdc-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 35 },
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
  }, [loaded]);

  return (
    <>
      {/* ── Loader ── */}
      {!loaded && <CinematicLoader onDone={() => setLoaded(true)} />}

      <div className={`tdc-page${loaded ? " tdc-page--visible" : ""}`}>

        {/* Fixed UI */}
        <Link href="/#map" className="tdc-back-btn">
          ← {t("المشاريع", "Projects")}
        </Link>
        <MusicToggle />

        {/* ── 1. CINEMATIC INTRO ── */}
        <section ref={introRef} className="tdc-intro">
          <div className="tdc-intro-bg">
            {INTRO_VIDEO ? (
              <video autoPlay muted loop playsInline poster={INTRO_POSTER}
                className="absolute inset-0 h-full w-full object-cover">
                <source src={INTRO_VIDEO} type="video/mp4" />
              </video>
            ) : (
              <Image src={INTRO_POSTER} alt="Tidara Towers" fill priority unoptimized
                className="object-cover object-center" sizes="100vw" />
            )}
          </div>
          <div className="tdc-intro-overlay" />
          <div className="tdc-intro-overlay tdc-intro-overlay--bot" />

          <div className="tdc-intro-content">
            <p className="tdc-intro-eyebrow">
              {t("الخبر · واجهة المارينا", "Al-Khobar · Marina Waterfront")}
            </p>
            <h1 className="tdc-intro-title">
              <span>TIDARA</span>
              <em>TOWERS</em>
            </h1>
            <p className="tdc-intro-tagline">
              {t("حافة حية بين المدينة والبحر", "A Living Edge Between City and Sea")}
            </p>
          </div>

          <div className="tdc-intro-scroll" aria-hidden>
            <span className="tdc-scroll-mouse">
              <span className="tdc-scroll-dot" />
            </span>
            <span className="tdc-scroll-text">{t("تمرير للاستكشاف", "Scroll to Explore")}</span>
          </div>

          {/* Animated wave bottom */}
          <div className="tdc-intro-wave" aria-hidden>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
              <path className="tdc-intro-wave-path"
                d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
            </svg>
          </div>
        </section>

        {/* ── 2. PARAMETRIC FORM ── */}
        <div ref={paramWrapRef} className="tdc-parametric-wrapper">
          <div className="tdc-parametric-sticky">
            {/* Background facade */}
            <div className="tdc-param-bg">
              <Image src={FACADE_BG} alt="Parametric Façade" fill unoptimized
                className="object-cover object-top" sizes="100vw" />
              <div className="tdc-param-bg-overlay" />
            </div>

            {/* Parametric ribs SVG — drawn on scroll */}
            <div className="tdc-parametric-wrap">
              <ParametricRibs />
            </div>

            {/* Text reveal */}
            <div className="tdc-param-text">
              <p className="tdc-param-tag">{t("لغة التصميم", "Design Language")}</p>
              <p className="tdc-param-line-1">
                {t(
                  "تصميم انسيابي يذوب في أفق البحر",
                  "A fluid design dissolving into the sea horizon",
                )}
              </p>
              <p className="tdc-param-line-2">
                {t(
                  "حيث تلتقي العمارة بالطبيعة في لغة موحّدة",
                  "where architecture meets nature in one unified language",
                )}
              </p>
              <div className="tdc-param-attr">CUBE Consultants · 2026</div>
            </div>
          </div>
        </div>

        {/* ── 3. VERTICAL JOURNEY ── */}
        <div className="tdc-journey-wrapper" ref={journeyRef}>
          <div className="tdc-journey-sticky">

            {/* Journey dot indicator */}
            <div className="tdc-journey-dots">
              {JOURNEY_STOPS.map((s, i) => (
                <div
                  key={i}
                  className={`tdc-jdot${activeBld === i ? " tdc-jdot--active" : ""}`}
                  style={{ "--jdot-color": s.accent } as React.CSSProperties}
                />
              ))}
            </div>

            {JOURNEY_STOPS.map((stop, i) => (
              <div
                key={stop.id}
                className={`tdc-building tdc-bld-${i}`}
                style={{ "--bld-accent": stop.accent } as React.CSSProperties}
              >
                {/* Background image / video */}
                <div className="tdc-bld-bg">
                  {stop.video ? (
                    <video autoPlay muted loop playsInline poster={stop.poster}
                      className="absolute inset-0 h-full w-full object-cover">
                      <source src={stop.video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image src={stop.poster} alt={stop.tagEn} fill unoptimized
                      className="object-cover" sizes="100vw" />
                  )}
                  <div className="tdc-bld-overlay" />
                </div>

                {/* Content */}
                <div className="tdc-bld-content">
                  <p className="tdc-bld-tag">{t(stop.tagAr, stop.tagEn)}</p>
                  <h2 className="tdc-bld-title">{t(stop.titleAr, stop.titleEn)}</h2>
                  <p className="tdc-bld-body">{t(stop.bodyAr, stop.bodyEn)}</p>
                  <div className="tdc-bld-stats">
                    {stop.stats.map((s, j) => (
                      <span key={j} className="tdc-bld-stat">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Building number */}
                <div className="tdc-bld-num">0{i + 1}</div>
              </div>
            ))}

            {/* Journey label */}
            <p className="tdc-journey-label">
              {t("الرحلة الرأسية", "The Vertical Journey")}
            </p>
          </div>
        </div>

        {/* ── 4. PANORAMA ── */}
        <section className="tdc-panorama-section">
          <div className="tdc-section-header tdc-reveal">
            <p className="tdc-section-tag--light">{t("إطلالة بانورامية", "Panoramic View")}</p>
            <h2 className="tdc-section-title--light">
              {t("360° على مارينا الخبر", "360° of Al-Khobar Marina")}
            </h2>
          </div>
          <PanoramaDrag src={PANORAMA_SRC} t={t} />
          <p className="tdc-panorama-sub tdc-reveal">
            {t(
              "إطلالة بانورامية 360° من أعلى نقطة في تيدارا تاورز — أفق لا حدود له على الخليج العربي.",
              "A 360° panoramic vista from the highest point in Tidara Towers — an unobstructed horizon over the Arabian Gulf.",
            )}
          </p>
        </section>

        {/* ── 5. PREMIUM CTA ── */}
        <section className="tdc-cta-section">
          <div className="tdc-cta-bg">
            <Image src={NIGHT_BG} alt="Tidara at Night" fill unoptimized
              className="object-contain object-bottom" sizes="100vw" />
            <div className="tdc-cta-overlay" />
          </div>

          <div className="tdc-cta-content tdc-reveal">
            <p className="tdc-cta-eyebrow">
              {t("كن جزءاً من الوجهة الأبرز في الخبر", "Be Part of Al-Khobar's Premier Destination")}
            </p>
            <h2 className="tdc-cta-title">
              {t("ابدأ رحلتك الاستثمارية", "Start Your Investment Journey")}
            </h2>
            <p className="tdc-cta-body">
              {t(
                "تواصل معنا لحجز عرض خاص أو الحصول على ملف المشروع الكامل.",
                "Contact us to book a private presentation or receive the full project brief.",
              )}
            </p>
            <div className="tdc-cta-btns">
              <Link href="/contact" className="tdc-cta-btn tdc-cta-btn--primary">
                {t("تواصل معنا", "Contact Us")}
              </Link>
              <Link href="/#map" className="tdc-cta-btn tdc-cta-btn--ghost">
                {t("استعرض المشاريع", "All Projects")}
              </Link>
            </div>
          </div>

          {/* Project facts strip */}
          <div className="tdc-cta-strip tdc-reveal">
            {[
              { n: "3",      l: t("مبانٍ", "Buildings") },
              { n: "G+29",   l: t("طوابق", "Floors") },
              { n: "116",    l: t("مكتب", "Offices") },
              { n: "63+",    l: t("وحدة", "Units") },
              { n: "60,570", l: t("م² إجمالي", "m² Total") },
              { n: "2026",   l: t("تسليم", "Delivery") },
            ].map((s, i) => (
              <div key={i} className="tdc-strip-item">
                <span className="tdc-strip-num">{s.n}</span>
                <span className="tdc-strip-lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

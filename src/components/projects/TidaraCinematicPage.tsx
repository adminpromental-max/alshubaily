"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/lang-context";
import { tidaraAsset } from "@/data/asset-paths";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger);

/* Cloudinary — compressed for faster start */
const VIDEO =
  "https://res.cloudinary.com/dfzaghfsv/video/upload/f_auto,q_auto:eco,w_1280,vc_h264/v1781801274/Cinematic_architectural_film__on4pal.mp4";

const ASSETS = {
  introPoster: tidaraAsset("Hero.png"),
  facade:      tidaraAsset("facade-ribs.png"),
  panorama:    tidaraAsset("panorama.png"),
  towerNight:  tidaraAsset("tower-night.png"),
  /* café & marina promenade */
  podiumBg:    tidaraAsset("walkthrough-3.png"),
  hotelBg:     tidaraAsset("interior-1.png"),
  adminBg:     tidaraAsset("walkthrough-4.png"),
};

const STATS = [
  { n: "3",       arL: "مبانٍ رئيسية",   enL: "Main Buildings"  },
  { n: "G+29",    arL: "أعلى برج",        enL: "Tallest Tower"   },
  { n: "200+",    arL: "غرفة فندقية",    enL: "Hotel Rooms"     },
  { n: "116",     arL: "مكتب ذكي",        enL: "Smart Offices"   },
  { n: "60,570",  arL: "م² إجمالي",       enL: "m² Total Area"   },
  { n: "112m",    arL: "ارتفاع البرج",   enL: "Tower Height"    },
];

const JOURNEY = [
  {
    id: "podium",
    bg: ASSETS.podiumBg,
    arTag: "المنصة الأرضية",          enTag: "The Public Podium",
    arTitle: "نبض الحياة الاجتماعية", enTitle: "The Pulse of Social Life",
    arBody: "مطاعم راقية ومقاهٍ تطل مباشرةً على مارينا الخبر — حيث تلتقي الأناقة بحياة الشارع.",
    enBody: "Upscale F&B and cafés opening directly onto Al-Khobar marina — where elegance meets street life.",
    stats: ["F&B · Retail", "Direct Marina Access", "1,300 m² / floor"],
    accent: "#1E9EBB",
  },
  {
    id: "hotel",
    bg: ASSETS.hotelBg,
    arTag: "برج الفندق",             enTag: "The Hotel Tower",
    arTitle: "ضيافة فاخرة بمفهوم جديد", enTitle: "Luxury Hospitality Redefined",
    arBody: "200+ غرفة بإطلالات بحرية، SPA عالمي ونادٍ صحي — على G+11 فوق الواجهة البحرية.",
    enBody: "200+ sea-view rooms, world-class SPA and Gymnasium — rising G+11 above the waterfront.",
    stats: ["200+ Rooms", "SPA & Gymnasium", "G+11 · 12,570 m²"],
    accent: "#C4A030",
  },
  {
    id: "admin",
    bg: ASSETS.adminBg,
    arTag: "الإداري والسكني",          enTag: "Admin & Residential",
    arTitle: "أفق جديد للعمل والعيش", enTitle: "A New Horizon for Work & Life",
    arBody: "Sky Lounge على قمة أعلى برج بالخبر، مكاتب ذكية بإطلالة 360° وشقق بشرفات متدرجة.",
    enBody: "Sky Lounge atop Al-Khobar's tallest tower, smart offices with 360° sea views and terraced apartments.",
    stats: ["G+29 · 112 m", "360° Sky Lounge", "116 Offices + 63 Units"],
    accent: "#9B89E0",
  },
];

/* ── Loader ──────────────────────────────────────────────────── */
function CinematicLoader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const dur = 1200, t0 = performance.now();
    let raf: number;
    const step = (now: number) => {
      const p    = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 2.5);
      setPct(Math.round(ease * 100));
      if (p < 1) { raf = requestAnimationFrame(step); }
      else { setTimeout(() => { setOut(true); setTimeout(onDone, 650); }, 200); }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`tdc-loader${out ? " tdc-loader--out" : ""}`} aria-hidden>
      <div className="tdc-loader-inner">
        <p className="tdc-loader-word">TIDARA</p>
        <p className="tdc-loader-sub">TOWERS</p>
        <div className="tdc-loader-track"><div className="tdc-loader-fill" style={{ width: `${pct}%` }} /></div>
        <p className="tdc-loader-pct">{pct}<span>%</span></p>
      </div>
    </div>
  );
}

/* ── Ambient Music ───────────────────────────────────────────── */
function MusicToggle() {
  const [on, setOn]   = useState(false);
  const ac  = useRef<AudioContext | null>(null);
  const gn  = useRef<GainNode | null>(null);
  const osc = useRef<OscillatorNode[]>([]);

  const toggle = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!on) {
      if (!ac.current) ac.current = new AudioContext();
      const ctx = ac.current;
      const g   = ctx.createGain();
      const f   = ctx.createBiquadFilter();
      f.type = "lowpass"; f.frequency.value = 380;
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 3);
      f.connect(g); g.connect(ctx.destination);
      osc.current = [55, 82.4, 110].map((hz) => {
        const o = ctx.createOscillator();
        o.type = "sine"; o.frequency.value = hz;
        o.connect(f); o.start(); return o;
      });
      gn.current = g; setOn(true);
    } else {
      const ctx = ac.current!;
      gn.current!.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
      setTimeout(() => osc.current.forEach((o) => { try { o.stop(); } catch { /* */ } }), 1600);
      osc.current = []; setOn(false);
    }
  }, [on]);

  return (
    <button className={`tdc-music${on ? " tdc-music--on" : ""}`} onClick={toggle} title="Ambient sound">
      <span className="tdc-music-icon">{on ? "♫" : "♩"}</span>
      <span className="tdc-music-lbl">{on ? "ON" : "OFF"}</span>
    </button>
  );
}

/* ── Parametric Ribs ─────────────────────────────────────────── */
function ParametricRibs({ ready }: { ready: boolean }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ready) return;
    const svg = ref.current; if (!svg) return;
    const lines = Array.from(svg.querySelectorAll("line"));
    lines.forEach((l) => { l.style.strokeDasharray = "1"; l.style.strokeDashoffset = "1"; });
    const ctx = gsap.context(() => {
      gsap.to(lines, {
        strokeDashoffset: 0, stagger: 0.03, ease: "none",
        scrollTrigger: {
          trigger: ".tdc-param-outer",
          start: "top 65%", end: "center 10%",
          scrub: 1.5, scroller: document.documentElement,
        },
      });
      const wl = svg.querySelector<SVGPathElement>(".tdc-wl");
      if (wl) {
        gsap.to(wl, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: {
            trigger: ".tdc-param-outer",
            start: "top 55%", end: "center 15%",
            scrub: 2, scroller: document.documentElement,
          },
        });
      }
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  const N = 36;
  const ribs = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1), w = Math.sin(t * Math.PI);
    return { x: t * 100, yTop: 5 + w * 20, op: 0.2 + w * 0.6, sw: 0.07 + w * 0.11 };
  });

  return (
    <svg ref={ref} className="tdc-ribs-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      {ribs.map((r, i) => (
        <line key={i} x1={`${r.x}`} y1="100" x2={`${r.x}`} y2={`${r.yTop}`}
          stroke="#1E9EBB" strokeWidth={`${r.sw}`} strokeLinecap="round"
          style={{ opacity: r.op }} pathLength="1" />
      ))}
      <path className="tdc-wl"
        d="M0,94 C18,90 36,97 54,93 C72,89 88,96 100,92"
        fill="none" stroke="rgba(30,158,187,0.35)" strokeWidth="0.18"
        pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} />
    </svg>
  );
}

/* ── Panorama Drag ───────────────────────────────────────────── */
function PanoramaDrag({ src, t }: { src: string; t: (a: string, b: string) => string }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const drag     = useRef({ active: false, startX: 0, base: 0, cur: 0 });
  const raf      = useRef(0);
  const [dragged, setDragged] = useState(false);

  const maxPan = () => (wrapRef.current ? wrapRef.current.offsetWidth * 3.5 : 0);
  const clamp  = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  const applyX = (x: number) => { if (innerRef.current) innerRef.current.style.transform = `translateX(${x}px)`; };

  const onMove = useCallback((e: MouseEvent) => {
    if (drag.current.active) return;
    const wrap = wrapRef.current; if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    if (e.clientY < rect.top || e.clientY > rect.bottom) return;
    const ratio = (e.clientX - rect.left) / rect.width;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => applyX(-ratio * maxPan()));
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  const onDown  = (e: React.PointerEvent) => {
    drag.current = { active: true, startX: e.clientX, base: drag.current.cur, cur: drag.current.cur };
    setDragged(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMoveP = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const nx = clamp(drag.current.base + e.clientX - drag.current.startX, -maxPan(), 0);
    drag.current.cur = nx; applyX(nx);
  };
  const onUp = () => { drag.current.active = false; };

  return (
    <div ref={wrapRef} className="tdc-pano-wrap"
      onPointerDown={onDown} onPointerMove={onMoveP} onPointerUp={onUp} onPointerLeave={onUp}>
      <div ref={innerRef} className="tdc-pano-inner">
        <Image src={src} alt="360° Marina View" fill unoptimized className="object-cover object-left" sizes="600vw" />
        <div className="tdc-pano-vig" />
      </div>
      <div className="tdc-pano-ui">
        <span className="tdc-pano-loc">Al-Khobar · Marina Waterfront</span>
        <span className="tdc-pano-hint">
          {dragged ? t("← اسحب →", "← Drag →") : t("← حرك الماوس أو اسحب →", "← Move or drag to explore →")}
        </span>
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function TidaraCinematicPage() {
  const { t, lang } = useLang();
  const { lenis } = useSmoothScroll();
  const [loaded, setLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [activeBld, setActiveBld] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const introRef = useRef<HTMLElement>(null);

  /* Intro GSAP reveals */
  useEffect(() => {
    if (!loaded || !lenis) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tdc-eyebrow",
        { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".tdc-htitle",
        { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 1.3, ease: "power3.out", delay: 0.45 });
      gsap.fromTo(".tdc-tagline",
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.85 });
      gsap.fromTo(".tdc-scroll-cue",
        { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.4 });

      /* Parallax bg */
      const bg = introRef.current?.querySelector<HTMLElement>(".tdc-intro-bg");
      if (bg) {
        gsap.to(bg, {
          yPercent: 22, ease: "none",
          scrollTrigger: {
            trigger: introRef.current, start: "top top", end: "bottom top",
            scrub: true, scroller: document.documentElement,
          },
        });
      }
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [loaded, lenis]);

  /* Parametric text */
  useEffect(() => {
    if (!loaded || !lenis) return;
    const ctx = gsap.context(() => {
      [".tdc-pl1", ".tdc-pl2"].forEach((sel, i) => {
        gsap.fromTo(sel, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: {
            trigger: ".tdc-param-outer",
            start: `top ${55 - i * 15}%`,
            toggleActions: "play none none none",
            scroller: document.documentElement,
          },
        });
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [loaded, lenis]);

  /* Stats count-up */
  useEffect(() => {
    if (!loaded || !lenis) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tdc-stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
          scrollTrigger: {
            trigger: ".tdc-stats-band",
            start: "top 88%",
            toggleActions: "play none none none",
            scroller: document.documentElement,
          },
        },
      );
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [loaded, lenis]);

  /* Journey crossfade */
  useEffect(() => {
    if (!loaded || !lenis) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".tdc-journey-wrapper",
          start: "top top", end: "bottom top",
          scrub: 1, scroller: document.documentElement,
          onUpdate: (s) => setActiveBld(Math.min(2, Math.floor(s.progress * 3))),
        },
      });
      tl.to(".tdc-bld-0",  { opacity: 0, scale: 1.04, duration: 0.5 }, 0.22)
        .fromTo(".tdc-bld-1", { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.22)
        .to(".tdc-bld-1",  { opacity: 0, scale: 1.04, duration: 0.5 }, 0.6)
        .fromTo(".tdc-bld-2", { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.6);
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [loaded, lenis]);

  /* Generic scroll reveals */
  useEffect(() => {
    if (!loaded || !lenis) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".tdc-reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.85, ease: "power2.out",
          scrollTrigger: {
            trigger: el, start: "top 93%",
            toggleActions: "play none none none",
            scroller: document.documentElement,
          },
        });
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [loaded, lenis]);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <>
      {!loaded && <CinematicLoader onDone={() => setLoaded(true)} />}

      <div className={`tdc-page${loaded ? " tdc-page--visible" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>

        {/* Fixed UI */}
        <Link href="/#map" className="tdc-back-btn">← {t("المشاريع", "Projects")}</Link>
        <MusicToggle />

        {/* ════════════════════════════════════════════════════
            1. CINEMATIC INTRO
        ════════════════════════════════════════════════════ */}
        <section ref={introRef} className="tdc-intro">
          <div className="tdc-intro-bg">
            <Image
              src={ASSETS.introPoster}
              alt="Tidara Towers"
              fill
              priority
              unoptimized
              className={`object-cover object-center transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
              sizes="100vw"
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={ASSETS.introPoster}
              onCanPlay={() => setVideoReady(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
            >
              <source src={VIDEO} type="video/mp4" />
            </video>
          </div>
          <div className="tdc-intro-grad" />
          <div className="tdc-intro-grad tdc-intro-grad--bot" />

          <div className="tdc-intro-content">
            <p className="tdc-eyebrow">{t("الخبر · واجهة المارينا", "Al-Khobar · Marina Waterfront")}</p>
            <h1 className="tdc-htitle">
              <span>TIDARA</span>
              <em>TOWERS</em>
            </h1>
            <p className="tdc-tagline">
              {t("حافة حية بين المدينة والبحر", "A Living Edge Between City and Sea")}
            </p>
          </div>

          <div className="tdc-scroll-cue" aria-hidden>
            <span className="tdc-sc-mouse"><span className="tdc-sc-dot" /></span>
            <span className="tdc-sc-text">{t("تمرير للاستكشاف", "Scroll to Explore")}</span>
          </div>

          <div className="tdc-intro-wave" aria-hidden>
            <svg viewBox="0 0 1440 72" preserveAspectRatio="none">
              <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#02050A" />
            </svg>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            2. STATS BAND  (directly below hero)
        ════════════════════════════════════════════════════ */}
        <div className="tdc-stats-band">
          {STATS.map((s, i) => (
            <div key={i} className="tdc-stat-item">
              <span className="tdc-stat-n">{s.n}</span>
              <span className="tdc-stat-l">{t(s.arL, s.enL)}</span>
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════
            3. PARAMETRIC FORM & FLUIDITY
        ════════════════════════════════════════════════════ */}
        <div className="tdc-param-outer">
          <div className="tdc-param-sticky">
            <div className="tdc-param-bg">
              <Image src={ASSETS.facade} alt="Parametric Façade" fill unoptimized
                className="object-cover object-top" sizes="100vw" />
              <div className="tdc-param-overlay" />
            </div>
            <div className="tdc-ribs-container">
              <ParametricRibs ready={loaded && !!lenis} />
            </div>
            <div className="tdc-param-text">
              <p className="tdc-param-tag">{t("لغة التصميم", "Design Language")}</p>
              <p className="tdc-pl1">{t("تصميم انسيابي يذوب في أفق البحر..", "A fluid design dissolving into the sea horizon..")}</p>
              <p className="tdc-pl2">{t("حيث تلتقي العمارة بالطبيعة في لغة موحّدة", "where architecture meets nature in one unified language")}</p>
              <span className="tdc-param-attr">CUBE Consultants · 2026</span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            4. VERTICAL JOURNEY
        ════════════════════════════════════════════════════ */}
        <div className="tdc-journey-wrapper">
          <div className="tdc-journey-sticky">

            {/* Section label */}
            <p className="tdc-journey-label">{t("الرحلة الرأسية", "The Vertical Journey")}</p>

            {/* Dot indicator */}
            <div className="tdc-journey-dots">
              {JOURNEY.map((j, i) => (
                <div key={i} className={`tdc-jdot${activeBld === i ? " tdc-jdot--on" : ""}`}
                  style={{ "--jc": j.accent } as React.CSSProperties} />
              ))}
            </div>

            {JOURNEY.map((j, i) => (
              <div key={j.id} className={`tdc-building tdc-bld-${i}`}
                style={{ "--ba": j.accent } as React.CSSProperties}>
                <div className="tdc-bld-bg">
                  <Image src={j.bg} alt={j.enTag} fill unoptimized className="object-cover" sizes="100vw" />
                  <div className="tdc-bld-overlay" />
                </div>
                <div className="tdc-bld-content">
                  <p className="tdc-bld-tag">{t(j.arTag, j.enTag)}</p>
                  <h2 className="tdc-bld-title">{t(j.arTitle, j.enTitle)}</h2>
                  <p className="tdc-bld-body">{t(j.arBody, j.enBody)}</p>
                  <div className="tdc-bld-stats">
                    {j.stats.map((s, k) => (
                      <span key={k} className="tdc-bld-stat">{s}</span>
                    ))}
                  </div>
                </div>
                <span className="tdc-bld-num">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            5. PANORAMA
        ════════════════════════════════════════════════════ */}
        <section className="tdc-pano-section">
          <div className="tdc-sec-hd tdc-reveal">
            <p className="tdc-sec-tag">{t("إطلالة بانورامية", "Panoramic View")}</p>
            <h2 className="tdc-sec-title">{t("360° على مارينا الخبر", "360° of Al-Khobar Marina")}</h2>
          </div>
          <PanoramaDrag src={ASSETS.panorama} t={t} />
          <p className="tdc-pano-sub tdc-reveal">
            {t(
              "إطلالة بانورامية 360° من أعلى نقطة في تيدارا تاورز — أفق لا حدود له على الخليج العربي.",
              "A 360° panoramic vista from the highest point in Tidara Towers — an unobstructed horizon over the Arabian Gulf.",
            )}
          </p>
        </section>

        {/* ════════════════════════════════════════════════════
            6. PREMIUM CTA  (dark minimalist + tower night bg)
        ════════════════════════════════════════════════════ */}
        <section className="tdc-cta">
          {/* Background — tower night image fills entire section */}
          <div className="tdc-cta-bg">
            <Image src={ASSETS.towerNight} alt="Tidara at Night" fill unoptimized
              className="object-cover object-bottom" sizes="100vw" priority={false} />
            <div className="tdc-cta-veil" />
          </div>

          <div className="tdc-cta-inner">
            {/* Left: headline */}
            <div className="tdc-cta-left tdc-reveal">
              <p className="tdc-cta-eyebrow">
                {t("كن جزءاً من الوجهة الأبرز في الخبر", "Be Part of Al-Khobar's Premier Destination")}
              </p>
              <h2 className="tdc-cta-title">
                {t("تواصل معنا الآن.", "Contact Us Now.")}
              </h2>
              <p className="tdc-cta-body">
                {t(
                  "احجز عرضاً خاصاً أو اطلب ملف المشروع الكامل — فريقنا مستعد للإجابة على كل استفساراتك.",
                  "Book a private presentation or request the full project brief — our team is ready to answer all your enquiries.",
                )}
              </p>

              <div className="tdc-cta-specs">
                {[
                  { n: "3",      l: t("مبانٍ", "Buildings") },
                  { n: "G+29",   l: t("أعلى برج", "Top Tower") },
                  { n: "60,570", l: t("م² إجمالي", "m² Total") },
                  { n: "2026",   l: t("تسليم", "Delivery") },
                ].map((s, i) => (
                  <div key={i} className="tdc-spec-item">
                    <span className="tdc-spec-n">{s.n}</span>
                    <span className="tdc-spec-l">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: booking form */}
            <div className="tdc-cta-right tdc-reveal">
              {formSent ? (
                <div className="tdc-form-sent">
                  <p className="tdc-form-sent-icon">✓</p>
                  <p className="tdc-form-sent-msg">{t("شكراً! سنتواصل معك قريباً.", "Thank you! We'll be in touch soon.")}</p>
                </div>
              ) : (
                <form className="tdc-form" onSubmit={handleForm} noValidate>
                  <p className="tdc-form-title">{t("احجز عرضاً خاصاً", "Book a Private Presentation")}</p>
                  <div className="tdc-form-field">
                    <label>{t("الاسم الكريم", "Full Name")}</label>
                    <input type="text" required placeholder={t("اسمك الكريم", "Your name")} />
                  </div>
                  <div className="tdc-form-field">
                    <label>{t("رقم الجوال / البريد", "Phone / Email")}</label>
                    <input type="text" required placeholder={t("+966 5X XXX XXXX", "+966 5X XXX XXXX")} />
                  </div>
                  <div className="tdc-form-field">
                    <label>{t("نوع الاهتمام", "Interest")} </label>
                    <select defaultValue="">
                      <option value="" disabled>{t("اختر...", "Select...")}</option>
                      <option>{t("وحدات سكنية", "Residential Units")}</option>
                      <option>{t("مكاتب إدارية", "Office Spaces")}</option>
                      <option>{t("وحدات فندقية", "Hotel Units")}</option>
                      <option>{t("استثمار عام", "General Investment")}</option>
                    </select>
                  </div>
                  <button type="submit" className="tdc-form-btn">
                    {t("إرسال الطلب", "Send Request")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

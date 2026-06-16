"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dammamAsset } from "@/data/asset-paths";
import { useLang } from "@/contexts/lang-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

const HERO = dammamAsset("Hero.jpg");
const IMGS = [
  dammamAsset("1.png"),
  dammamAsset("2.png"),
  dammamAsset("3.png"),
  dammamAsset("4.jpg"),
  dammamAsset("5.jpg"),
  dammamAsset("6.jpg"),
  dammamAsset("7.jpg"),
];

// ── SVG Decorative Icons ─────────────────────────────────────

function ScooterKidIcon() {
  return (
    <svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Head */}
      <circle cx="92" cy="14" r="10" fill="#9A7B3A" opacity="0.28" />
      {/* Helmet */}
      <path d="M82 14 Q82 4 92 4 Q102 4 102 14" fill="#C9A962" opacity="0.22" />
      {/* Body */}
      <line x1="92" y1="24" x2="88" y2="46" stroke="#9A7B3A" strokeWidth="4" strokeLinecap="round" opacity="0.28" />
      {/* Arm forward */}
      <line x1="90" y1="32" x2="108" y2="38" stroke="#9A7B3A" strokeWidth="3" strokeLinecap="round" opacity="0.28" />
      {/* Leg down */}
      <line x1="88" y1="46" x2="82" y2="60" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.28" />
      {/* Leg on scooter */}
      <line x1="88" y1="46" x2="94" y2="58" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.28" />
      {/* Scooter deck */}
      <rect x="40" y="60" width="68" height="5" rx="2.5" fill="#9A7B3A" opacity="0.22" />
      {/* Handlebar post */}
      <line x1="108" y1="60" x2="108" y2="40" stroke="#9A7B3A" strokeWidth="3" strokeLinecap="round" opacity="0.28" />
      {/* Handlebar */}
      <line x1="100" y1="40" x2="116" y2="40" stroke="#9A7B3A" strokeWidth="3" strokeLinecap="round" opacity="0.28" />
      {/* Rear wheel */}
      <circle cx="46" cy="69" r="10" fill="none" stroke="#9A7B3A" strokeWidth="2.5" opacity="0.28" />
      <circle cx="46" cy="69" r="3" fill="#9A7B3A" opacity="0.18" />
      {/* Front wheel */}
      <circle cx="102" cy="69" r="10" fill="none" stroke="#9A7B3A" strokeWidth="2.5" opacity="0.28" />
      <circle cx="102" cy="69" r="3" fill="#9A7B3A" opacity="0.18" />
      {/* Motion lines */}
      <line x1="10" y1="60" x2="30" y2="60" stroke="#C9A962" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" opacity="0.3" />
      <line x1="4" y1="50" x2="20" y2="50" stroke="#C9A962" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" opacity="0.22" />
    </svg>
  );
}

function FootballPlayerIcon() {
  return (
    <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Head */}
      <circle cx="35" cy="14" r="10" fill="#9A7B3A" opacity="0.28" />
      {/* Body */}
      <line x1="35" y1="24" x2="35" y2="52" stroke="#9A7B3A" strokeWidth="4.5" strokeLinecap="round" opacity="0.28" />
      {/* Arms raised in celebration */}
      <line x1="35" y1="34" x2="14" y2="22" stroke="#9A7B3A" strokeWidth="3" strokeLinecap="round" opacity="0.28" />
      <line x1="35" y1="34" x2="56" y2="22" stroke="#9A7B3A" strokeWidth="3" strokeLinecap="round" opacity="0.28" />
      {/* Left leg - planted */}
      <line x1="35" y1="52" x2="28" y2="72" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.28" />
      <line x1="28" y1="72" x2="22" y2="80" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.28" />
      {/* Right leg - kicking */}
      <line x1="35" y1="52" x2="52" y2="62" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.28" />
      <line x1="52" y1="62" x2="72" y2="52" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.28" />
      {/* Football */}
      <circle cx="85" cy="55" r="12" fill="none" stroke="#9A7B3A" strokeWidth="2" opacity="0.30" />
      <path d="M85 43 Q90 50 85 55 Q80 60 85 67" stroke="#9A7B3A" strokeWidth="1.2" opacity="0.22" />
      <path d="M73 55 Q79 51 85 55 Q91 59 97 55" stroke="#9A7B3A" strokeWidth="1.2" opacity="0.22" />
      {/* Motion arc */}
      <path d="M60 46 Q70 40 75 48" stroke="#C9A962" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

// ── Path Connector ────────────────────────────────────────────

function PathConnector({ icon }: { icon: "scooter" | "football" }) {
  return (
    <div className="olympic-path-connector">
      <svg
        viewBox="0 0 60 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="olympic-path-svg"
        aria-hidden
      >
        <path
          d="M30 0 C48 30, 12 60, 30 90 C48 120, 12 140, 30 160"
          stroke="#C9A962"
          strokeWidth="1.2"
          strokeDasharray="5 7"
          strokeLinecap="round"
          opacity="0.4"
        />
        <circle cx="30" cy="0" r="3" fill="#C9A962" opacity="0.4" />
        <circle cx="30" cy="80" r="4" fill="#C9A962" opacity="0.35" />
        <circle cx="30" cy="160" r="3" fill="#C9A962" opacity="0.4" />
      </svg>

      <div className="olympic-path-icon">
        {icon === "scooter" ? <ScooterKidIcon /> : <FootballPlayerIcon />}
      </div>
    </div>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────

function StatItem({ value, labelAr, labelEn }: { value: string; labelAr: string; labelEn: string }) {
  const { t } = useLang();
  return (
    <div className="olympic-stat">
      <span className="olympic-stat-value">{value}</span>
      <span className="olympic-stat-label">{t(labelAr, labelEn)}</span>
    </div>
  );
}

// ── Section (alternating) ─────────────────────────────────────

interface SectionData {
  img: string;
  side: "left" | "right";
  eyebrowAr: string;
  eyebrowEn: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
}

const SECTIONS: SectionData[] = [
  {
    img: IMGS[0],
    side: "right",
    eyebrowAr: "المنشأة الرئيسية",
    eyebrowEn: "Main Venue",
    titleAr: "الملعب الأولمبي الرئيسي",
    titleEn: "The Main Olympic Stadium",
    bodyAr: "يستوعب أكثر من 45,000 متفرج ومصمم وفق أعلى المعايير الدولية لاستضافة البطولات الرياضية الكبرى والفعاليات متعددة التخصصات، مع تقنيات بث متطورة وتجربة مشاهدة استثنائية.",
    bodyEn: "Accommodating over 45,000 spectators and designed to the highest international standards for major sporting championships and multi-discipline events, featuring advanced broadcast technology and an exceptional viewing experience.",
  },
  {
    img: IMGS[1],
    side: "left",
    eyebrowAr: "منظومة متكاملة",
    eyebrowEn: "Integrated Network",
    titleAr: "مرافق رياضية متكاملة",
    titleEn: "Integrated Sports Facilities",
    bodyAr: "تضم المدينة أكثر من 30 منشأة رياضية متخصصة تشمل ملاعب كرة القدم، كرة السلة، السباحة، والرياضات المائية — بيئة رياضية شاملة في موقع واحد متكامل.",
    bodyEn: "The city houses over 30 specialized sports facilities including football pitches, basketball courts, swimming pools, and water sports — a comprehensive athletic environment within one integrated destination.",
  },
  {
    img: IMGS[2],
    side: "right",
    eyebrowAr: "قلب المدينة",
    eyebrowEn: "City Heart",
    titleAr: "المركز التجاري والترفيهي",
    titleEn: "Commercial & Entertainment Hub",
    bodyAr: "مركز حضري نابض يجمع المطاعم والمقاهي الفاخرة، محلات الأجهزة الرياضية، ومراكز التدريب الاحترافية في تجربة حضرية متكاملة تمزج بين الأداء الرياضي وأسلوب الحياة العصري.",
    bodyEn: "A vibrant urban center combining fine dining, upscale cafes, premium sports retail, and professional training centers in a fully integrated urban experience that blends athletic performance with modern lifestyle.",
  },
  {
    img: IMGS[3],
    side: "left",
    eyebrowAr: "البنية التحتية",
    eyebrowEn: "Infrastructure",
    titleAr: "تقنية وبنية تحتية متقدمة",
    titleEn: "Advanced Technology & Infrastructure",
    bodyAr: "شبكة طرق متكاملة، أنظمة ذكاء اصطناعي لإدارة الحشود، منظومة استدامة بيئية متكاملة، وتوفير إمكانية الوصول الشامل لجميع الزوار — مدينة تُصمَّم للمستقبل.",
    bodyEn: "Integrated road networks, AI-powered crowd management systems, a comprehensive environmental sustainability program, and fully accessible design for all visitors — a city engineered for the future.",
  },
];

// ── Gallery ───────────────────────────────────────────────────

const GALLERY_IMAGES = [IMGS[4], IMGS[5], IMGS[6]];

// ── Main Page ─────────────────────────────────────────────────

export function DammamOlympicPage() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      if (heroRef.current) {
        const bg = heroRef.current.querySelector(".olympic-hero-bg");
        if (bg) {
          gsap.to(bg, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
              scroller: document.documentElement,
            },
          });
        }
      }

      // Section fade-in animations
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        const img = section.querySelector(".olympic-section-img");
        const content = section.querySelector(".olympic-section-content");
        const isLeft = section.dataset.side === "left";

        if (img) {
          gsap.fromTo(
            img,
            { opacity: 0, x: isLeft ? -60 : 60 },
            {
              opacity: 1,
              x: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                scroller: document.documentElement,
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (content) {
          const items = content.querySelectorAll("[data-reveal]");
          gsap.fromTo(
            items,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                scroller: document.documentElement,
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      // Gallery images staggered
      if (galleryRef.current) {
        const imgs = galleryRef.current.querySelectorAll(".olympic-gallery-item");
        gsap.fromTo(
          imgs,
          { opacity: 0, scale: 0.94, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 82%",
              scroller: document.documentElement,
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="olympic-page min-h-screen bg-[#FAF8F4] text-[#1A1612]">
      <SiteHeader />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section ref={heroRef} className="olympic-hero">
        <div className="olympic-hero-bg">
          <Image
            src={HERO}
            alt="مدينة الدمام الأولمبية"
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
          <div className="olympic-hero-overlay" />
        </div>

        {/* Scroll indicator */}
        <div className="olympic-hero-scroll" aria-hidden>
          <span className="olympic-scroll-line" />
          <span className="text-[9px] tracking-[0.35em] text-white/50 uppercase mt-2">
            {t("تمرير", "Scroll")}
          </span>
        </div>

        <div className="olympic-hero-content">
          <Link href="/#map" className="olympic-back-link">
            ← {t("العودة", "Back")}
          </Link>
          <p data-reveal className="olympic-hero-eyebrow">
            {t("المنطقة الشرقية · رياضي", "Eastern Region · Sports")}
          </p>
          <h1 data-reveal className="olympic-hero-title">
            {t("مدينة الدمام", "Dammam")}
            <span>{t("الأولمبية", "Olympic City")}</span>
          </h1>
          <p data-reveal className="olympic-hero-sub">
            {t(
              "وجهة رياضية وترفيهية متكاملة في قلب المنطقة الشرقية",
              "An integrated sports & entertainment destination in the heart of the Eastern Region",
            )}
          </p>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <div className="olympic-stats-bar">
        <StatItem value="+45,000" labelAr="مقعد" labelEn="Seats" />
        <div className="olympic-stats-divider" />
        <StatItem value="+30" labelAr="منشأة رياضية" labelEn="Sports Venues" />
        <div className="olympic-stats-divider" />
        <StatItem value="2.4M m²" labelAr="مساحة إجمالية" labelEn="Total Area" />
        <div className="olympic-stats-divider" />
        <StatItem value="2030" labelAr="الاكتمال المتوقع" labelEn="Est. Completion" />
      </div>

      {/* ── ALTERNATING SECTIONS ────────────────────────────────── */}
      {SECTIONS.map((sec, idx) => {
        const isLeft = sec.side === "left";
        const showConnector = idx < SECTIONS.length - 1;
        const showVideoAfter = idx === 1; // video banner between section 2 and 3

        return (
          <div key={idx}>
            <section
              ref={(el) => { sectionRefs.current[idx] = el; }}
              data-side={sec.side}
              className="olympic-section"
            >
              <div
                className={`olympic-section-inner ${isLeft ? "olympic-section-inner--left" : "olympic-section-inner--right"}`}
              >
                {/* Image */}
                <div className="olympic-section-img-wrap">
                  <div className="olympic-section-img">
                    <Image
                      src={sec.img}
                      alt={t(sec.titleAr, sec.titleEn)}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 55vw"
                    />
                    {/* Golden corner accent */}
                    <div className="olympic-img-corner olympic-img-corner--tl" />
                    <div className="olympic-img-corner olympic-img-corner--br" />
                  </div>
                  {/* Floating step number */}
                  <div className="olympic-step-badge">0{idx + 1}</div>
                </div>

                {/* Content */}
                <div className="olympic-section-content">
                  <p data-reveal className="olympic-section-eyebrow">{t(sec.eyebrowAr, sec.eyebrowEn)}</p>
                  <h2 data-reveal className="olympic-section-title">{t(sec.titleAr, sec.titleEn)}</h2>
                  <div data-reveal className="olympic-section-rule" aria-hidden />
                  <p data-reveal className="olympic-section-body">{t(sec.bodyAr, sec.bodyEn)}</p>
                </div>
              </div>
            </section>

            {/* Video banner between section 2 and 3 */}
            {showVideoAfter && (
              <div className="olympic-video-banner">
                <div className="olympic-video-placeholder">
                  <div className="olympic-video-icon" aria-hidden>
                    <svg viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="22" stroke="#C9A962" strokeWidth="1.5" opacity="0.5" />
                      <polygon points="19,16 35,24 19,32" fill="#C9A962" opacity="0.7" />
                    </svg>
                  </div>
                  <p className="olympic-video-label">
                    {t("جولة داخل المدينة الأولمبية — فيديو قريباً", "City Tour — Video Coming Soon")}
                  </p>
                  <p className="olympic-video-hint">
                    {t("مقاس الفيديو المطلوب: 1920 × 1080 — MP4 H.264 — حتى 50MB", "Video specs: 1920 × 1080 · MP4 H.264 · up to 50MB")}
                  </p>
                </div>
              </div>
            )}

            {/* Path connector */}
            {showConnector && !showVideoAfter && (
              <PathConnector icon={idx % 2 === 0 ? "scooter" : "football"} />
            )}
          </div>
        );
      })}

      {/* ── GALLERY ─────────────────────────────────────────────── */}
      <div ref={galleryRef} className="olympic-gallery">
        <div className="olympic-gallery-header">
          <p className="olympic-gallery-eyebrow">{t("معرض الصور", "Gallery")}</p>
          <h2 className="olympic-gallery-title">{t("لحظات من المشروع", "Project Moments")}</h2>
        </div>
        <div className="olympic-gallery-grid">
          {GALLERY_IMAGES.map((src, i) => (
            <div key={i} className={`olympic-gallery-item olympic-gallery-item--${i}`}>
              <Image
                src={src}
                alt=""
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="olympic-gallery-overlay" />
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="olympic-cta">
        <div className="olympic-cta-inner">
          <p className="olympic-cta-eyebrow">{t("ابدأ رحلتك الاستثمارية", "Start Your Investment Journey")}</p>
          <h2 className="olympic-cta-title">
            {t("مدينة الدمام الأولمبية تنتظرك", "Dammam Olympic City Awaits You")}
          </h2>
          <div className="olympic-cta-btns">
            <Link href="/contact" className="cta-glass-btn cta-glass-btn--gold">
              {t("تواصل معنا", "Contact Us")}
            </Link>
            <Link href="/#map" className="cta-glass-btn">
              {t("استكشف مشاريع أخرى", "Explore More Projects")}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

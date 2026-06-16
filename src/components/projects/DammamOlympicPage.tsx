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
import { OlympicCircleGallery } from "./OlympicCircleGallery";

gsap.registerPlugin(ScrollTrigger);

/* ── Asset paths ────────────────────────────────────────────── */
const HERO = dammamAsset("Hero.png");
const IMG = (f: string) => dammamAsset(f);

/* ── SVG Character Icons ────────────────────────────────────── */

function ScooterKidIcon() {
  return (
    <svg viewBox="0 0 180 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      {/* Head */}
      <circle cx="118" cy="16" r="13" fill="#9A7B3A" opacity="0.26" />
      {/* Helmet visor */}
      <path d="M105 16 Q105 3 118 3 Q131 3 131 16" fill="#C9A962" opacity="0.2" />
      {/* Body */}
      <line x1="118" y1="29" x2="113" y2="56" stroke="#9A7B3A" strokeWidth="5" strokeLinecap="round" opacity="0.26" />
      {/* Arm to handlebar */}
      <line x1="116" y1="40" x2="140" y2="47" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.26" />
      {/* Leg down */}
      <line x1="113" y1="56" x2="104" y2="74" stroke="#9A7B3A" strokeWidth="4.5" strokeLinecap="round" opacity="0.26" />
      {/* Leg on deck */}
      <line x1="113" y1="56" x2="120" y2="72" stroke="#9A7B3A" strokeWidth="4.5" strokeLinecap="round" opacity="0.26" />
      {/* Scooter deck */}
      <rect x="50" y="74" width="90" height="7" rx="3.5" fill="#9A7B3A" opacity="0.20" />
      {/* Handlebar post */}
      <line x1="140" y1="74" x2="140" y2="48" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.26" />
      {/* Handlebar */}
      <line x1="130" y1="48" x2="152" y2="48" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.26" />
      {/* Rear wheel */}
      <circle cx="58" cy="86" r="13" fill="none" stroke="#9A7B3A" strokeWidth="3" opacity="0.26" />
      <circle cx="58" cy="86" r="4" fill="#9A7B3A" opacity="0.16" />
      {/* Front wheel */}
      <circle cx="132" cy="86" r="13" fill="none" stroke="#9A7B3A" strokeWidth="3" opacity="0.26" />
      <circle cx="132" cy="86" r="4" fill="#9A7B3A" opacity="0.16" />
      {/* Motion streaks */}
      <line x1="8" y1="74" x2="36" y2="74" stroke="#C9A962" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" opacity="0.28" />
      <line x1="4" y1="62" x2="26" y2="62" stroke="#C9A962" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" opacity="0.20" />
      <line x1="12" y1="85" x2="32" y2="85" stroke="#C9A962" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" opacity="0.18" />
    </svg>
  );
}

function FootballPlayerIcon() {
  return (
    <svg viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      {/* Head */}
      <circle cx="44" cy="16" r="13" fill="#9A7B3A" opacity="0.26" />
      {/* Body */}
      <line x1="44" y1="29" x2="44" y2="64" stroke="#9A7B3A" strokeWidth="6" strokeLinecap="round" opacity="0.26" />
      {/* Arms raised */}
      <line x1="44" y1="42" x2="20" y2="28" stroke="#9A7B3A" strokeWidth="4" strokeLinecap="round" opacity="0.26" />
      <line x1="44" y1="42" x2="70" y2="30" stroke="#9A7B3A" strokeWidth="4" strokeLinecap="round" opacity="0.26" />
      {/* Left leg - planted */}
      <line x1="44" y1="64" x2="34" y2="88" stroke="#9A7B3A" strokeWidth="4.5" strokeLinecap="round" opacity="0.26" />
      <line x1="34" y1="88" x2="26" y2="98" stroke="#9A7B3A" strokeWidth="4" strokeLinecap="round" opacity="0.26" />
      {/* Right leg - kicking */}
      <line x1="44" y1="64" x2="68" y2="80" stroke="#9A7B3A" strokeWidth="4.5" strokeLinecap="round" opacity="0.26" />
      <line x1="68" y1="80" x2="92" y2="68" stroke="#9A7B3A" strokeWidth="4" strokeLinecap="round" opacity="0.26" />
      {/* Football */}
      <circle cx="108" cy="72" r="15" fill="none" stroke="#9A7B3A" strokeWidth="2.5" opacity="0.28" />
      <circle cx="108" cy="72" r="6" fill="#9A7B3A" opacity="0.12" />
      <path d="M108 57 Q114 64 108 72 Q102 80 108 87" stroke="#9A7B3A" strokeWidth="1.5" opacity="0.20" />
      <path d="M93 72 Q100 67 108 72 Q116 77 123 72" stroke="#9A7B3A" strokeWidth="1.5" opacity="0.20" />
      {/* Arc of kick */}
      <path d="M78 60 Q88 50 95 62" stroke="#C9A962" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" opacity="0.32" />
    </svg>
  );
}

function RunnerIcon() {
  return (
    <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      {/* Head */}
      <circle cx="60" cy="14" r="11" fill="#9A7B3A" opacity="0.26" />
      {/* Body (leaning forward) */}
      <line x1="60" y1="25" x2="72" y2="52" stroke="#9A7B3A" strokeWidth="5.5" strokeLinecap="round" opacity="0.26" />
      {/* Arms pumping */}
      <line x1="64" y1="36" x2="42" y2="28" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.26" />
      <line x1="64" y1="36" x2="86" y2="46" stroke="#9A7B3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.26" />
      {/* Legs stride */}
      <line x1="72" y1="52" x2="52" y2="76" stroke="#9A7B3A" strokeWidth="4.5" strokeLinecap="round" opacity="0.26" />
      <line x1="52" y1="76" x2="44" y2="92" stroke="#9A7B3A" strokeWidth="4" strokeLinecap="round" opacity="0.26" />
      <line x1="72" y1="52" x2="88" y2="68" stroke="#9A7B3A" strokeWidth="4.5" strokeLinecap="round" opacity="0.26" />
      <line x1="88" y1="68" x2="102" y2="78" stroke="#9A7B3A" strokeWidth="4" strokeLinecap="round" opacity="0.26" />
      {/* Motion streaks under feet */}
      <line x1="24" y1="93" x2="44" y2="93" stroke="#C9A962" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" opacity="0.28" />
      <line x1="88" y1="80" x2="108" y2="84" stroke="#C9A962" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" opacity="0.22" />
    </svg>
  );
}

/* ── Path Connector ─────────────────────────────────────────── */

const CONNECTOR_ICONS = [
  <ScooterKidIcon key="scooter" />,
  <FootballPlayerIcon key="football" />,
  <RunnerIcon key="runner" />,
  <ScooterKidIcon key="scooter2" />,
  <FootballPlayerIcon key="football2" />,
  <RunnerIcon key="runner2" />,
];

function PathConnector({ iconIndex }: { iconIndex: number }) {
  return (
    <div className="olympic-path-connector">
      {/* Wide decorative SVG path */}
      <svg
        viewBox="0 0 120 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="olympic-path-svg"
        aria-hidden
      >
        {/* Main wavy path */}
        <path
          d="M60 0 C90 28, 30 56, 60 84 C90 112, 30 140, 60 168 C90 196, 30 224, 60 252 C80 268, 60 280, 60 280"
          stroke="#C9A962"
          strokeWidth="1.8"
          strokeDasharray="6 8"
          strokeLinecap="round"
          opacity="0.38"
        />
        {/* Secondary faint parallel path */}
        <path
          d="M48 10 C72 36, 24 64, 52 92 C76 116, 22 148, 50 178 C74 204, 28 232, 56 260"
          stroke="#C9A962"
          strokeWidth="1"
          strokeDasharray="3 10"
          strokeLinecap="round"
          opacity="0.16"
        />
        {/* Waypoint dots */}
        {[0, 42, 84, 126, 168, 210, 252, 280].map((cy, i) => (
          <circle key={i} cx="60" cy={cy} r={i % 3 === 0 ? 4 : 2.5} fill="#C9A962" opacity={i % 3 === 0 ? 0.42 : 0.28} />
        ))}
        {/* Diamond accents */}
        <path d="M60 140 l5 5 l-5 5 l-5 -5 Z" fill="#C9A962" opacity="0.3" />
      </svg>

      {/* Character icon */}
      <div className="olympic-path-icon">
        {CONNECTOR_ICONS[iconIndex % CONNECTOR_ICONS.length]}
      </div>
    </div>
  );
}

/* ── Stats ──────────────────────────────────────────────────── */

function StatItem({ value, labelAr, labelEn }: { value: string; labelAr: string; labelEn: string }) {
  const { t } = useLang();
  return (
    <div className="olympic-stat">
      <span className="olympic-stat-value">{value}</span>
      <span className="olympic-stat-label">{t(labelAr, labelEn)}</span>
    </div>
  );
}

/* ── Section content data ───────────────────────────────────── */

const SECTIONS = [
  {
    file: "1.png",
    side: "right" as const,
    eyebrowAr: "المنشأة الرئيسية",
    eyebrowEn: "Main Venue",
    titleAr: "الملعب الأولمبي الرئيسي",
    titleEn: "The Main Olympic Stadium",
    bodyAr: "يستوعب أكثر من 45,000 متفرج ومصمم وفق أعلى المعايير الدولية لاستضافة البطولات الكبرى والفعاليات متعددة التخصصات، مع تقنيات بث متطورة وتجربة مشاهدة استثنائية لا تُنسى.",
    bodyEn: "Accommodating over 45,000 spectators, designed to the highest international standards for major championships and multi-discipline events with advanced broadcast technology.",
  },
  {
    file: "2.png",
    side: "left" as const,
    eyebrowAr: "منظومة رياضية",
    eyebrowEn: "Sports Network",
    titleAr: "مرافق رياضية متكاملة",
    titleEn: "Integrated Sports Facilities",
    bodyAr: "أكثر من 30 منشأة رياضية متخصصة — ملاعب كرة القدم، كرة السلة، السباحة، الجمباز، والرياضات المائية — كلها في موقع واحد يرسم مستقبل الرياضة في المنطقة الشرقية.",
    bodyEn: "Over 30 specialized sports facilities — football, basketball, swimming, gymnastics, and water sports — all within one destination shaping the future of sport in the Eastern Region.",
  },
  {
    file: "3.png",
    side: "right" as const,
    eyebrowAr: "التجارة والترفيه",
    eyebrowEn: "Commerce & Entertainment",
    titleAr: "المركز التجاري والترفيهي",
    titleEn: "Commercial & Entertainment Hub",
    bodyAr: "مركز حضري نابض يجمع المطاعم الفاخرة والمقاهي، المحلات الرياضية الكبرى، ومراكز التدريب الاحترافية في تجربة متكاملة تمزج الأداء الرياضي بأسلوب الحياة العصري.",
    bodyEn: "A vibrant urban center combining fine dining, upscale cafes, premium sports retail, and professional training centers in an experience that blends athletic performance with modern living.",
  },
  {
    file: "4.jpg",
    side: "left" as const,
    eyebrowAr: "البنية التحتية",
    eyebrowEn: "Infrastructure",
    titleAr: "تقنية وبنية متقدمة",
    titleEn: "Advanced Technology & Infrastructure",
    bodyAr: "شبكة طرق ذكية، أنظمة ذكاء اصطناعي لإدارة الحشود، منظومة استدامة بيئية متكاملة، وإمكانية وصول شاملة — مدينة أولمبية مصممة لتكون مرجعاً للمستقبل.",
    bodyEn: "Smart road networks, AI-powered crowd management, a comprehensive environmental sustainability program, and fully accessible design — an Olympic city engineered as a blueprint for the future.",
  },
  {
    file: "5.jpg",
    side: "right" as const,
    eyebrowAr: "الفضاءات العامة",
    eyebrowEn: "Public Spaces",
    titleAr: "الحدائق والمساحات المفتوحة",
    titleEn: "Parks & Open Spaces",
    bodyAr: "فضاءات خضراء واسعة تُشكّل رئة المدينة الأولمبية — ممشيات الأسرة، الملاعب المفتوحة، مناطق الاسترخاء — بيئة تجمع بين الطبيعة والنشاط في تصميم حضري متوازن.",
    bodyEn: "Vast green spaces form the lungs of the Olympic city — family walkways, open-air courts, relaxation zones — an environment that merges nature and activity in a balanced urban design.",
  },
  {
    file: "6.jpg",
    side: "left" as const,
    eyebrowAr: "الرياضات المائية",
    eyebrowEn: "Aquatic Sports",
    titleAr: "منشآت الرياضات المائية",
    titleEn: "Aquatic Sports Complex",
    bodyAr: "مجمع مائي عالمي يضم حمامات السباحة الأولمبية، منصات الغطس، وملاعب الكرة المائية — مصمم ليستضيف البطولات الدولية وليكون مقصداً للمتدربين المحترفين وعشاق الرياضة.",
    bodyEn: "A world-class aquatic complex featuring Olympic pools, diving platforms, and water polo arenas — designed to host international championships and serve as a destination for elite athletes.",
  },
  {
    file: "7.jpg",
    side: "right" as const,
    eyebrowAr: "الواجهة والممشيات",
    eyebrowEn: "Waterfront & Promenades",
    titleAr: "الواجهة البحرية",
    titleEn: "The Waterfront Promenade",
    bodyAr: "كورنيش بحري استثنائي يمتد على طول واجهة المدينة الأولمبية — ممشيات للدراجات والمشاة، مطاعم على الماء، وأجواء بحرية ساحرة تكتمل بها تجربة المدينة الرياضية الشاملة.",
    bodyEn: "An exceptional seaside corniche stretching along the Olympic city's waterfront — cycling and walking promenades, waterside dining, and captivating maritime ambiance completing the comprehensive sports city experience.",
  },
];

/* ── Main Page ─────────────────────────────────────────────── */

export function DammamOlympicPage() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      if (heroRef.current) {
        const bg = heroRef.current.querySelector(".olympic-hero-bg");
        if (bg) {
          gsap.to(bg, {
            yPercent: 18,
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

      // Section animations — trigger early so content never feels delayed
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        const isLeft = section.dataset.side === "left";

        const imgWrap = section.querySelector(".olympic-section-img");
        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            { opacity: 0, x: isLeft ? -50 : 50 },
            {
              opacity: 1, x: 0,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 98%",
                scroller: document.documentElement,
                toggleActions: "play none none none",
              },
            },
          );
        }

        const reveals = section.querySelectorAll("[data-reveal]");
        if (reveals.length) {
          gsap.fromTo(
            reveals,
            { opacity: 0, y: 28 },
            {
              opacity: 1, y: 0,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 98%",
                scroller: document.documentElement,
                toggleActions: "play none none none",
              },
            },
          );
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const galleryItems = SECTIONS.map((s) => ({
    src: IMG(s.file),
    label: t(s.titleAr, s.titleEn),
  }));

  return (
    <div className="olympic-page min-h-screen overflow-x-hidden bg-[#FAF8F4] text-[#1A1612]">
      <SiteHeader />

      {/* ── HERO — image has text on it, keep clean ──────────── */}
      <section ref={heroRef} className="olympic-hero">
        <div className="olympic-hero-bg">
          <Image
            src={HERO}
            alt="مدينة الدمام الأولمبية"
            fill
            priority
            unoptimized
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Subtle bottom vignette only, don't obscure image text */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0805]/80 to-transparent" />
        </div>

        {/* Minimal overlay — back link + scroll cue */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-6 pt-24 md:p-10 md:pt-28">
          <Link href="/#map" className="olympic-back-link">
            ← {t("العودة", "Back")}
          </Link>
        </div>

        <div className="olympic-hero-scroll" aria-hidden>
          <span className="olympic-scroll-line" />
          <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase mt-2">
            {t("تمرير", "Scroll")}
          </span>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <div className="olympic-stats-bar">
        <StatItem value="+45,000" labelAr="مقعد" labelEn="Seats" />
        <div className="olympic-stats-divider" />
        <StatItem value="+30" labelAr="منشأة رياضية" labelEn="Sports Venues" />
        <div className="olympic-stats-divider" />
        <StatItem value="2.4M m²" labelAr="مساحة إجمالية" labelEn="Total Area" />
        <div className="olympic-stats-divider" />
        <StatItem value="2030" labelAr="الاكتمال المتوقع" labelEn="Est. Completion" />
      </div>

      {/* ── ALTERNATING SECTIONS (all 7 images) ─────────────── */}
      {SECTIONS.map((sec, idx) => {
        const isLeft = sec.side === "left";
        // Video banner after section 3 (between 3 and 4)
        const showVideo = idx === 3;
        // Path connectors between every section
        const showPath = idx < SECTIONS.length - 1;

        return (
          <div key={idx}>
            {/* Video banner — TV screen frame */}
            {showVideo && (
              <div className="olympic-video-section">
                <div className="olympic-tv-frame">
                  <div className="olympic-tv-screen">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="olympic-video-player"
                      poster={IMG("Hero.png")}
                    >
                      <source
                        src="https://res.cloudinary.com/dfzaghfsv/video/upload/q_auto,f_mp4/v1781634357/Dammam_Olympic_n4rvqh.mov"
                        type="video/mp4"
                      />
                      <source
                        src="https://res.cloudinary.com/dfzaghfsv/video/upload/v1781634357/Dammam_Olympic_n4rvqh.mov"
                        type="video/quicktime"
                      />
                    </video>
                    <div className="olympic-video-overlay" />
                  </div>
                  {/* TV base */}
                  <div className="olympic-tv-base" aria-hidden />
                </div>
                <p className="olympic-tv-caption">
                  {t("جولة داخل المدينة الأولمبية", "Olympic City Tour")}
                </p>
              </div>
            )}

            <section
              ref={(el) => { sectionRefs.current[idx] = el; }}
              data-side={sec.side}
              className="olympic-section"
            >
              <div className={`olympic-section-inner ${isLeft ? "olympic-section-inner--left" : ""}`}>

                {/* Image */}
                <div className="olympic-section-img-wrap">
                  <div className="olympic-section-img">
                    <Image
                      src={IMG(sec.file)}
                      alt={t(sec.titleAr, sec.titleEn)}
                      fill
                      unoptimized
                      className="object-contain"
                      sizes="(max-width:900px) 100vw, 55vw"
                    />
                    <div className="olympic-img-corner olympic-img-corner--tl" />
                    <div className="olympic-img-corner olympic-img-corner--br" />
                  </div>
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

            {showPath && <PathConnector iconIndex={idx} />}
          </div>
        );
      })}

      {/* ── CIRCLE GALLERY ─────────────────────────────────── */}
      <div className="olympic-gallery">
        <div className="olympic-gallery-header">
          <p className="olympic-gallery-eyebrow">{t("معرض الصور", "Gallery")}</p>
          <h2 className="olympic-gallery-title">{t("لحظات من المشروع", "Project Moments")}</h2>
        </div>
        <OlympicCircleGallery images={galleryItems} />
      </div>

      {/* ── CTA ─────────────────────────────────────────────── */}
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { beachAsset } from "@/data/asset-paths";
import { useLang } from "@/contexts/lang-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

/* ── Assets ─────────────────────────────────────────────────── */
const HERO   = beachAsset("Hero.jpg");
const IMG    = (f: string) => beachAsset(f);

/* ── Wave SVG connector icon ────────────────────────────────── */
function WaveIcon() {
  return (
    <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      <path d="M4 40 Q14 28 24 40 Q34 52 44 40 Q54 28 64 40 Q74 52 80 44"
        stroke="#5EB8D4" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path d="M4 28 Q14 16 24 28 Q34 40 44 28 Q54 16 64 28 Q74 40 80 32"
        stroke="#5EB8D4" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <circle cx="40" cy="16" r="3" fill="#5EB8D4" opacity="0.4" />
    </svg>
  );
}

function SailboatIcon() {
  return (
    <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      {/* Hull */}
      <path d="M16 48 Q40 56 64 48 L60 54 Q40 62 20 54 Z" fill="#5EB8D4" opacity="0.28" />
      {/* Mast */}
      <line x1="40" y1="10" x2="40" y2="50" stroke="#5EB8D4" strokeWidth="2" opacity="0.4" />
      {/* Sail left */}
      <path d="M40 12 L14 46 L40 46 Z" fill="#5EB8D4" opacity="0.18" stroke="#5EB8D4" strokeWidth="1" />
      {/* Sail right */}
      <path d="M40 16 L62 44 L40 44 Z" fill="#5EB8D4" opacity="0.12" stroke="#5EB8D4" strokeWidth="0.8" />
      {/* Water line */}
      <path d="M6 58 Q18 53 30 58 Q42 63 54 58 Q66 53 76 58" stroke="#5EB8D4" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function ShellIcon() {
  return (
    <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      {/* Shell spiral */}
      <path d="M35 35 C35 20, 20 14, 14 22 C8 30, 14 46, 26 50 C38 54, 54 46, 56 34 C58 22, 50 10, 35 8 C18 6, 6 18, 6 35 C6 52, 18 64, 35 64"
        stroke="#5EB8D4" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
      <circle cx="35" cy="35" r="4" fill="#5EB8D4" opacity="0.25" />
      <path d="M35 35 L20 20" stroke="#5EB8D4" strokeWidth="1" opacity="0.2" />
      <path d="M35 35 L50 22" stroke="#5EB8D4" strokeWidth="1" opacity="0.2" />
      <path d="M35 35 L54 40" stroke="#5EB8D4" strokeWidth="1" opacity="0.2" />
      <path d="M35 35 L30 56" stroke="#5EB8D4" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

const CONNECTOR_ICONS = [
  <WaveIcon key="wave" />,
  <SailboatIcon key="sail" />,
  <ShellIcon key="shell" />,
];

/* ── Wave path connector ────────────────────────────────────── */
function WaveConnector({ iconIndex }: { iconIndex: number }) {
  return (
    <div className="bch-connector">
      <svg viewBox="0 0 100 260" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="bch-connector-svg" aria-hidden>
        <path
          d="M50 0 C80 30, 20 58, 50 86 C80 114, 20 142, 50 170 C80 198, 20 226, 50 254 C50 258, 50 260, 50 260"
          stroke="#5EB8D4" strokeWidth="1.5" strokeDasharray="5 8" strokeLinecap="round" opacity="0.35"
        />
        <path
          d="M38 12 C62 38, 30 66, 56 94 C72 112, 28 148, 54 178"
          stroke="#5EB8D4" strokeWidth="0.9" strokeDasharray="3 10" strokeLinecap="round" opacity="0.18"
        />
        {[0, 52, 104, 156, 208, 260].map((cy, i) => (
          <circle key={i} cx="50" cy={cy} r={i % 2 === 0 ? 3.5 : 2} fill="#5EB8D4"
            opacity={i % 2 === 0 ? 0.38 : 0.22} />
        ))}
        <path d="M50 130 l4 4 l-4 4 l-4 -4 Z" fill="#5EB8D4" opacity="0.28" />
      </svg>
      <div className="bch-connector-icon">
        {CONNECTOR_ICONS[iconIndex % CONNECTOR_ICONS.length]}
      </div>
    </div>
  );
}

/* ── Section data ───────────────────────────────────────────── */
const SECTIONS = [
  {
    file: "1.jpg",
    side: "right" as const,
    eyebrowAr: "الشاطئ الخاص",
    eyebrowEn: "Private Beach",
    titleAr: "شاطئ بكر على الخليج العربي",
    titleEn: "Pristine Gulf Shoreline",
    bodyAr: "شريط ساحلي خاص يمتد بطول 200 متر على مياه الخليج العربي الصافية — رمال ذهبية ناعمة، مياه هادئة فيروزية، وخصوصية تامة توفر تجربة استجمام لا مثيل لها على الساحل السعودي.",
    bodyEn: "A 200-metre private coastal strip on the crystal-clear Arabian Gulf — golden soft sands, calm turquoise waters, and complete privacy offering an unrivalled retreat on the Saudi coastline.",
  },
  {
    file: "2.jpg",
    side: "left" as const,
    eyebrowAr: "إقامة فاخرة",
    eyebrowEn: "Luxury Residences",
    titleAr: "فلل وأجنحة على الواجهة البحرية",
    titleEn: "Seafront Villas & Suites",
    bodyAr: "60 فيلا وجناحاً فاخراً مطلة مباشرة على البحر، مصممة بأسلوب معماري معاصر يمزج بين الحداثة والموروث الخليجي — مسابح خاصة، مداخل مستقلة، وإطلالات بانورامية لا تُنسى.",
    bodyEn: "60 luxury villas and suites with direct sea views, designed in a contemporary style blending modernity with Gulf heritage — private pools, independent entrances, and panoramic vistas.",
  },
  {
    file: "3.jpg",
    side: "right" as const,
    eyebrowAr: "مرافق وترفيه",
    eyebrowEn: "Amenities & Leisure",
    titleAr: "تجربة متكاملة على المياه",
    titleEn: "A Complete Waterside Experience",
    bodyAr: "مارينا خاصة للقوارب، منتجع صحي (سبا) بمعايير دولية، مطاعم مطلة على البحر، ومركز رياضات مائية متكامل — كل ما تحتاجه للراحة والمغامرة في مكان واحد.",
    bodyEn: "A private marina, world-class spa, sea-view restaurants, and a complete water sports centre — everything you need for relaxation and adventure in one destination.",
  },
];

/* ── Stats ──────────────────────────────────────────────────── */
const STATS = [
  { value: "200m", labelAr: "شاطئ خاص", labelEn: "Private Beach" },
  { value: "60",   labelAr: "فيلا وجناح", labelEn: "Villas & Suites" },
  { value: "5★",   labelAr: "تصنيف فندقي", labelEn: "Hotel Rating" },
  { value: "2030", labelAr: "الاكتمال", labelEn: "Completion" },
];

/* ── Gallery items ──────────────────────────────────────────── */
const GALLERY = [
  { src: IMG("Hero.jpg"), label: "" },
  { src: IMG("1.jpg"),    label: "" },
  { src: IMG("2.jpg"),    label: "" },
  { src: IMG("3.jpg"),    label: "" },
];

/* ── Circle Gallery (inline — simpler than reusing OlympicCircleGallery) */
function BeachGallery({ items }: { items: { src: string; label: string }[] }) {
  return (
    <div className="bch-gallery-row">
      {items.map((item, i) => (
        <div key={i} className="bch-gallery-item">
          <Image src={item.src} alt={item.label} fill unoptimized className="object-cover" sizes="300px" />
          <div className="bch-gallery-shine" />
        </div>
      ))}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export function BeachResortPage() {
  const { t } = useLang();
  const heroRef  = useRef<HTMLDivElement>(null);
  const secRefs  = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero parallax */
      if (heroRef.current) {
        const bg = heroRef.current.querySelector(".bch-hero-bg");
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

      /* Section reveal animations */
      secRefs.current.forEach((el) => {
        if (!el) return;
        const isLeft = el.dataset.side === "left";

        const img = el.querySelector(".bch-section-img");
        if (img) {
          gsap.fromTo(img,
            { opacity: 0, x: isLeft ? -45 : 45 },
            {
              opacity: 1, x: 0, duration: 1.0, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 95%",
                scroller: document.documentElement, toggleActions: "play none none none" },
            },
          );
        }

        const reveals = el.querySelectorAll("[data-reveal]");
        if (reveals.length) {
          gsap.fromTo(reveals,
            { opacity: 0, y: 25 },
            {
              opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 95%",
                scroller: document.documentElement, toggleActions: "play none none none" },
            },
          );
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bch-page overflow-x-hidden">
      <SiteHeader />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section ref={heroRef} className="bch-hero">
        <div className="bch-hero-bg">
          <Image src={HERO} alt="منتجع بيت البحر" fill priority unoptimized
            className="object-cover object-center" sizes="100vw" />
        </div>

        {/* Multi-layer overlays */}
        <div className="bch-hero-overlay" />
        <div className="bch-hero-wave-overlay" aria-hidden />

        {/* Content */}
        <div className="bch-hero-content">
          <Link href="/#map" className="bch-back-link">
            ← {t("العودة للمشاريع", "Back to Projects")}
          </Link>
          <p className="bch-hero-eyebrow">
            {t("المنطقة الشرقية · ساحلي · فاخر", "Eastern Region · Coastal · Luxury")}
          </p>
          <h1 className="bch-hero-title">
            {t("منتجع", "AlShubaily")}
            <em>{t("بيت البحر", "Sea House")}</em>
          </h1>
          <p className="bch-hero-sub">
            {t(
              "وجهة استجمام استثنائية على الخليج العربي — حيث تلتقي الفخامة بأسرار البحر.",
              "An exceptional retreat on the Arabian Gulf — where luxury meets the secrets of the sea.",
            )}
          </p>

          {/* Stats row */}
          <div className="bch-hero-stats">
            {STATS.map((s, i) => (
              <div key={i} className="bch-hero-stat">
                <span className="bch-stat-val">{s.value}</span>
                <span className="bch-stat-lbl">{t(s.labelAr, s.labelEn)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="bch-scroll-cue" aria-hidden>
          <span className="bch-scroll-line" />
          <span>{t("تمرير", "Scroll")}</span>
        </div>

        {/* Bottom wave mask */}
        <div className="bch-hero-bottom-wave" aria-hidden>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
              fill="#F4F0E8" />
          </svg>
        </div>
      </section>

      {/* ── SECTIONS ───────────────────────────────────────────── */}
      {SECTIONS.map((sec, idx) => {
        const isLeft = sec.side === "left";
        /* Project brief panel after section 1 */
        const showBrief = idx === 1;
        const showConnector = idx < SECTIONS.length - 1;

        return (
          <div key={idx}>
            {showBrief && (
              <div className="bch-brief">
                <div className="bch-brief-ocean" aria-hidden>
                  {/* Animated waves CSS only */}
                  <div className="bch-brief-wave bch-brief-wave--1" />
                  <div className="bch-brief-wave bch-brief-wave--2" />
                  <div className="bch-brief-wave bch-brief-wave--3" />
                </div>
                <div className="bch-brief-overlay" />
                <div className="bch-brief-content">
                  <p className="bch-brief-tag">{t("نبذة عن المشروع", "Project Overview")}</p>
                  <div className="bch-brief-grid">
                    {[
                      { lAr: "المشروع",   lEn: "Project",   vAr: "منتجع بيت البحر", vEn: "Sea House Resort" },
                      { lAr: "الموقع",    lEn: "Location",  vAr: "الدمام، المنطقة الشرقية", vEn: "Dammam, Eastern Region" },
                      { lAr: "النوع",     lEn: "Type",      vAr: "منتجع ساحلي فاخر", vEn: "Luxury Beachfront Resort" },
                      { lAr: "المساحة",   lEn: "Area",      vAr: "شاطئ خاص 200 م", vEn: "200m Private Beach" },
                      { lAr: "الوحدات",   lEn: "Units",     vAr: "60 فيلا وجناح", vEn: "60 Villas & Suites" },
                      { lAr: "الحالة",    lEn: "Status",    vAr: "قيد التطوير · 2030", vEn: "Under Development · 2030" },
                    ].map((item, i) => (
                      <div key={i} className="bch-brief-item">
                        <span className="bch-brief-label">{t(item.lAr, item.lEn)}</span>
                        <span className="bch-brief-value">{t(item.vAr, item.vEn)}</span>
                      </div>
                    ))}
                  </div>
                  <p className="bch-brief-desc">
                    {t(
                      "وجهة استجمام متكاملة تجمع بين الفخامة الحديثة وجمال الطبيعة الساحلية — ملاذ حصري لعشاق البحر والراحة الفارهة على ساحل الخليج العربي.",
                      "A complete luxury retreat blending modern elegance with coastal natural beauty — an exclusive haven for those who seek the sea and refined relaxation on the Arabian Gulf coast.",
                    )}
                  </p>
                </div>
              </div>
            )}

            <section
              ref={(el) => { secRefs.current[idx] = el; }}
              data-side={sec.side}
              className="bch-section"
            >
              <div className={`bch-section-inner ${isLeft ? "bch-section-inner--left" : ""}`}>
                {/* Image */}
                <div className="bch-section-img-wrap">
                  <div className="bch-section-img">
                    <Image src={IMG(sec.file)} alt={t(sec.titleAr, sec.titleEn)}
                      fill unoptimized className="object-cover"
                      sizes="(max-width:900px) 100vw, 55vw" />
                    {/* Shimmer corner accents */}
                    <span className="bch-img-corner bch-img-corner--tl" />
                    <span className="bch-img-corner bch-img-corner--br" />
                  </div>
                  <div className="bch-step-badge">0{idx + 1}</div>
                </div>

                {/* Text */}
                <div className="bch-section-content">
                  <p data-reveal className="bch-eyebrow">{t(sec.eyebrowAr, sec.eyebrowEn)}</p>
                  <h2 data-reveal className="bch-title">{t(sec.titleAr, sec.titleEn)}</h2>
                  <div data-reveal className="bch-rule" />
                  <p data-reveal className="bch-body">{t(sec.bodyAr, sec.bodyEn)}</p>
                </div>
              </div>
            </section>

            {showConnector && <WaveConnector iconIndex={idx} />}
          </div>
        );
      })}

      {/* ── GALLERY ─────────────────────────────────────────────── */}
      <div className="bch-gallery">
        <div className="bch-gallery-header">
          <p className="bch-gallery-eyebrow">{t("معرض الصور", "Gallery")}</p>
          <h2 className="bch-gallery-title">{t("لحظات من المنتجع", "Resort Moments")}</h2>
        </div>
        <BeachGallery items={GALLERY} />
      </div>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="bch-cta">
        <div className="bch-cta-inner">
          <p className="bch-cta-eyebrow">{t("ابدأ رحلتك", "Begin Your Journey")}</p>
          <h2 className="bch-cta-title">
            {t("منتجع بيت البحر يستقبلك", "Sea House Resort Awaits You")}
          </h2>
          <div className="bch-cta-btns">
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

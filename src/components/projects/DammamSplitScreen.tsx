"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dammamAsset } from "@/data/asset-paths";
import { useLang } from "@/contexts/lang-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { OlympicCircleGallery } from "./OlympicCircleGallery";

gsap.registerPlugin(ScrollTrigger);

/* ── Assets ─────────────────────────────────────────────────── */
const HERO = dammamAsset("Hero.png");
const IMG = (f: string) => dammamAsset(f);

/* ── Chapter data ───────────────────────────────────────────── */
const CHAPTERS = [
  {
    file: "1.png",
    eyebrowAr: "المنشأة الرئيسية",
    eyebrowEn: "Main Venue",
    titleAr: "الملعب الأولمبي الرئيسي",
    titleEn: "The Main Olympic Stadium",
    bodyAr: "يستوعب أكثر من 45,000 متفرج ومصمم وفق أعلى المعايير الدولية لاستضافة البطولات الكبرى والفعاليات متعددة التخصصات، مع تقنيات بث متطورة وتجربة مشاهدة استثنائية.",
    bodyEn: "Accommodating over 45,000 spectators, designed to the highest international standards for major championships and multi-discipline events with advanced broadcast technology.",
  },
  {
    file: "2.png",
    eyebrowAr: "منظومة رياضية",
    eyebrowEn: "Sports Network",
    titleAr: "مرافق رياضية متكاملة",
    titleEn: "Integrated Sports Facilities",
    bodyAr: "أكثر من 30 منشأة رياضية متخصصة — ملاعب كرة القدم، كرة السلة، السباحة، الجمباز، والرياضات المائية — كلها في موقع واحد يرسم مستقبل الرياضة في المنطقة الشرقية.",
    bodyEn: "Over 30 specialized sports facilities — football, basketball, swimming, gymnastics, and water sports — all within one destination shaping the future of sport.",
  },
  {
    file: "3.png",
    eyebrowAr: "التجارة والترفيه",
    eyebrowEn: "Commerce & Entertainment",
    titleAr: "المركز التجاري والترفيهي",
    titleEn: "Commercial & Entertainment Hub",
    bodyAr: "مركز حضري نابض يجمع المطاعم الفاخرة، المحلات الرياضية، ومراكز التدريب الاحترافية في تجربة متكاملة تمزج الأداء الرياضي بأسلوب الحياة العصري.",
    bodyEn: "A vibrant urban center combining fine dining, premium sports retail, and professional training centers in an experience that blends athletic performance with modern living.",
  },
  {
    file: "4.jpg",
    eyebrowAr: "البنية التحتية",
    eyebrowEn: "Infrastructure",
    titleAr: "تقنية وبنية متقدمة",
    titleEn: "Advanced Technology & Infrastructure",
    bodyAr: "شبكة طرق ذكية، أنظمة ذكاء اصطناعي لإدارة الحشود، منظومة استدامة بيئية متكاملة، وإمكانية وصول شاملة — مدينة أولمبية مصممة لتكون مرجعاً للمستقبل.",
    bodyEn: "Smart road networks, AI crowd management, comprehensive environmental sustainability, and fully accessible design — an Olympic city engineered for the future.",
  },
  {
    file: "5.jpg",
    eyebrowAr: "الفضاءات العامة",
    eyebrowEn: "Public Spaces",
    titleAr: "الحدائق والمساحات المفتوحة",
    titleEn: "Parks & Open Spaces",
    bodyAr: "فضاءات خضراء واسعة تُشكّل رئة المدينة الأولمبية — ممشيات الأسرة، الملاعب المفتوحة، ومناطق الاسترخاء — بيئة تجمع الطبيعة والنشاط في تصميم حضري متوازن.",
    bodyEn: "Vast green spaces forming the lungs of the Olympic city — family walkways, open courts, and relaxation zones — merging nature and activity in a balanced urban design.",
  },
  {
    file: "6.jpg",
    eyebrowAr: "الرياضات المائية",
    eyebrowEn: "Aquatic Sports",
    titleAr: "منشآت الرياضات المائية",
    titleEn: "Aquatic Sports Complex",
    bodyAr: "مجمع مائي عالمي يضم حمامات السباحة الأولمبية، منصات الغطس، وملاعب الكرة المائية — مصمم ليستضيف البطولات الدولية وليكون مقصداً للمحترفين.",
    bodyEn: "A world-class aquatic complex with Olympic pools, diving platforms, and water polo arenas — designed to host international championships and elite athletes.",
  },
  {
    file: "7.jpg",
    eyebrowAr: "الواجهة والممشيات",
    eyebrowEn: "Waterfront",
    titleAr: "الواجهة البحرية",
    titleEn: "The Waterfront Promenade",
    bodyAr: "كورنيش بحري استثنائي يمتد على طول واجهة المدينة — ممشيات للدراجات والمشاة، مطاعم على الماء، وأجواء بحرية ساحرة تكتمل بها تجربة المدينة الرياضية الشاملة.",
    bodyEn: "An exceptional seaside corniche stretching along the city's waterfront — cycling promenades, waterside dining, and maritime ambiance completing the sports city experience.",
  },
];

/* ── Stats ──────────────────────────────────────────────────── */
const STATS = [
  { value: "+45,000", labelAr: "مقعد", labelEn: "Seats" },
  { value: "+30", labelAr: "منشأة رياضية", labelEn: "Sports Venues" },
  { value: "2.4M m²", labelAr: "مساحة إجمالية", labelEn: "Total Area" },
  { value: "2030", labelAr: "الاكتمال المتوقع", labelEn: "Est. Completion" },
];

/* ── Main component ─────────────────────────────────────────── */

export function DammamSplitScreen() {
  const { t } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const stTriggers = useRef<ReturnType<typeof ScrollTrigger.create>[]>([]);

  /* Track which chapter is active.
     IntersectionObserver doesn't work with Lenis (uses scrollerProxy).
     We use GSAP ScrollTrigger which is already bridged to Lenis. */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      stTriggers.current.forEach((t) => t.kill());
      stTriggers.current = [];

      chapterRefs.current.forEach((el, idx) => {
        if (!el) return;
        stTriggers.current.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 40%",
            scroller: document.documentElement,
            onEnter: () => setActiveIdx(idx),
            onEnterBack: () => setActiveIdx(idx),
          }),
        );
      });

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
      stTriggers.current.forEach((t) => t.kill());
      stTriggers.current = [];
    };
  }, []);

  const scrollToChapter = useCallback((idx: number) => {
    chapterRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const galleryItems = CHAPTERS.map((c) => ({
    src: IMG(c.file),
    label: t(c.titleAr, c.titleEn),
  }));

  return (
    <div className="dss-page overflow-x-hidden bg-[#FAF8F4]">
      <SiteHeader />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="dss-hero">
        <Image
          src={HERO}
          alt="مدينة الدمام الأولمبية"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="dss-hero-overlay" />
        <div className="dss-hero-content">
          <Link href="/projects/dammam-olympic-city" className="dss-back">
            ← {t("النسخة الأولى", "Classic View")}
          </Link>
          <p className="dss-hero-eyebrow">
            {t("المنطقة الشرقية · رياضي", "Eastern Region · Sports")}
          </p>
          <h1 className="dss-hero-title">
            {t("مدينة الدمام", "Dammam")}
            <em>{t("الأولمبية", "Olympic City")}</em>
          </h1>

          {/* Inline stats */}
          <div className="dss-hero-stats">
            {STATS.map((s, i) => (
              <div key={i} className="dss-hero-stat">
                <span className="dss-hero-stat-value">{s.value}</span>
                <span className="dss-hero-stat-label">{t(s.labelAr, s.labelEn)}</span>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div className="dss-scroll-cue" aria-hidden>
            <span />
            <p>{t("تمرير للاستكشاف", "Scroll to explore")}</p>
          </div>
        </div>
      </section>

      {/* ── Split screen ───────────────────────────────────── */}
      <div className="dss-split">

        {/* Left — sticky image panel */}
        <aside className="dss-left" aria-hidden>
          {/* Image stack — crossfade */}
          <div className="dss-img-stack">
            {CHAPTERS.map((ch, i) => (
              <div
                key={i}
                className={`dss-img-slide ${i === activeIdx ? "dss-img-slide--active" : ""}`}
              >
                <Image
                  src={IMG(ch.file)}
                  alt=""
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="50vw"
                />
              </div>
            ))}
          </div>

          {/* Dark overlay for contrast */}
          <div className="dss-left-overlay" />

          {/* Chapter progress dots */}
          <nav className="dss-dots" aria-label="chapters">
            {CHAPTERS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToChapter(i)}
                className={`dss-dot ${i === activeIdx ? "dss-dot--active" : ""}`}
                aria-label={`Chapter ${i + 1}`}
              />
            ))}
          </nav>

          {/* Chapter counter */}
          <div className="dss-counter">
            <span className="dss-counter-current">{String(activeIdx + 1).padStart(2, "0")}</span>
            <span className="dss-counter-sep">/</span>
            <span className="dss-counter-total">{String(CHAPTERS.length).padStart(2, "0")}</span>
          </div>
        </aside>

        {/* Right — scrollable chapters */}
        <main className="dss-right">
          {CHAPTERS.map((ch, i) => (
            <section
              key={i}
              ref={(el) => { chapterRefs.current[i] = el; }}
              className="dss-chapter"
            >
              {/* Chapter watermark number */}
              <span className="dss-chapter-num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Mobile: image at top of each chapter */}
              <div className="dss-mobile-img">
                <Image
                  src={IMG(ch.file)}
                  alt={t(ch.titleAr, ch.titleEn)}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              <div className="dss-chapter-content">
                <p className="dss-eyebrow">{t(ch.eyebrowAr, ch.eyebrowEn)}</p>
                <h2 className="dss-title">{t(ch.titleAr, ch.titleEn)}</h2>
                <div className="dss-rule" />
                <p className="dss-body">{t(ch.bodyAr, ch.bodyEn)}</p>
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* ── Video — full width break ───────────────────────── */}
      <section className="dss-video-section">
        <div className="dss-tv-frame">
          <div className="dss-tv-screen">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              poster={HERO}
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
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_40%)]" />
          </div>
          <div className="olympic-tv-base" />
        </div>
        <p className="olympic-tv-caption">{t("جولة داخل المدينة الأولمبية", "Olympic City Tour")}</p>
      </section>

      {/* ── Gallery ─────────────────────────────────────────── */}
      <section className="dss-gallery">
        <div className="dss-gallery-header">
          <p className="olympic-gallery-eyebrow">{t("معرض الصور", "Gallery")}</p>
          <h2 className="olympic-gallery-title">{t("لحظات من المشروع", "Project Moments")}</h2>
        </div>
        <OlympicCircleGallery images={galleryItems} />
      </section>

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

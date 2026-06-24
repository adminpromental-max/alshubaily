"use client";

import { LangProvider } from "@/contexts/lang-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useLang } from "@/contexts/lang-context";

type PlaceholderPageProps = {
  eyebrowAr: string;
  eyebrowEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
};

function PlaceholderContent({
  eyebrowAr,
  eyebrowEn,
  titleAr,
  titleEn,
  descAr,
  descEn,
}: PlaceholderPageProps) {
  const { t } = useLang();

  return (
    <>
      <SiteHeader />

      <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 pb-24 pt-28 md:px-8 md:pt-32">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#C9A962]">
          {t(eyebrowAr, eyebrowEn)}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-5xl">
          {t(titleAr, titleEn)}
        </h1>
        <p className="mt-5 text-sm leading-8 text-white/55 md:text-base">
          {t(descAr, descEn)}
        </p>
      </main>

      <SiteFooter />
    </>
  );
}

export function ServicesPageClient() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAF8]">
        <PlaceholderContent
          eyebrowAr="خدماتنا"
          eyebrowEn="Our Services"
          titleAr="خدمات مجموعة الشبيلي"
          titleEn="AlShubaily Group Services"
          descAr="هذه الصفحة قيد التطوير — سيتم إضافة تفاصيل خدمات المجموعة قريباً."
          descEn="This page is under development — group services details will be added soon."
        />
      </div>
    </LangProvider>
  );
}

export function MediaPageClient() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAF8]">
        <PlaceholderContent
          eyebrowAr="المركز الإعلامي"
          eyebrowEn="Media Center"
          titleAr="المركز الإعلامي"
          titleEn="Media Center"
          descAr="هذه الصفحة قيد التطوير — سيتم إضافة الأخبار والتغطيات الإعلامية قريباً."
          descEn="This page is under development — news and media coverage will be added soon."
        />
      </div>
    </LangProvider>
  );
}

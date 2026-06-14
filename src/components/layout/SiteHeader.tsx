"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/lang-context";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "#map", ar: "المشاريع", en: "Projects" },
  { href: "#about", ar: "من نحن", en: "About" },
  { href: "#contact", ar: "تواصل", en: "Contact" },
];

export function SiteHeader() {
  const { t, toggleLang, lang } = useLang();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#0A0E17]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/Alshubaily-logo.png"
            alt="AlShubaily"
            width={44}
            height={48}
            className="h-11 w-auto"
            priority
          />
          <div className="hidden sm:block">
            <p className="text-[11px] tracking-[0.2em] text-[#c9a962]/80 uppercase">
              AlShubaily
            </p>
            <p className="text-sm font-medium text-white/90">
              {t("مجموعة الشبيلي", "AlShubaily Group")}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/65 transition hover:text-white"
            >
              {t(item.ar, item.en)}
            </a>
          ))}
        </nav>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleLang}
          className="rounded-full border-white/15 bg-transparent text-white/80 hover:bg-white/5"
        >
          {lang === "ar" ? "EN" : "AR"}
        </Button>
      </div>
    </header>
  );
}

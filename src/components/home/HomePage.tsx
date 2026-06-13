import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0A0E17] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,98,0.12)_0%,rgba(10,14,23,0)_45%)]" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/Alshubaily-logo.png"
            alt="AlShubaily"
            width={56}
            height={60}
            className="h-14 w-auto"
            priority
          />
          <div>
            <p className="text-sm text-[#c9a962]">AlShubaily Group</p>
            <p className="text-lg font-medium">مجموعة خالد سعود الشبيلي</p>
          </div>
        </div>
        <nav className="hidden gap-8 text-sm text-white/70 md:flex">
          <a href="#" className="transition hover:text-white">
            مشاريعنا
          </a>
          <a href="#" className="transition hover:text-white">
            من نحن
          </a>
          <a href="#" className="transition hover:text-white">
            تواصل معنا
          </a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] max-w-6xl flex-col items-center justify-center px-6 pb-20 text-center">
        <p className="mb-4 text-xs tracking-[0.4em] text-[#c9a962]/80 uppercase">
          Real Estate Investment
        </p>
        <h1 className="max-w-3xl text-4xl leading-tight font-semibold md:text-6xl">
          مشاريع الشبيلي
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
          منصة تفاعلية لاستكشاف محفظة مشاريع مجموعة خالد سعود الشبيلي للاستثمارات
          العقارية — الخريطة التفاعلية والتجربة ثلاثية الأبعاد قيد البناء.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full border border-[#c9a962]/40 bg-[#c9a962]/10 px-8 text-[#f5ecd8] hover:bg-[#c9a962]/20"
          >
            استكشف المشاريع
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/15 bg-transparent px-8 text-white hover:bg-white/5"
          >
            English
          </Button>
        </div>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AlShubaily | مجموعة خالد سعود الشبيلي",
  description:
    "AlShubaily Group — 18 real estate projects across Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/assets/hero/Hero-1.jpg" as="image" />
      </head>
      <body className="min-h-full bg-[#FAFAF8] font-[family-name:var(--font-noto-arabic)] text-foreground">
        {children}
      </body>
    </html>
  );
}

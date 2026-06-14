import type { Metadata } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${cairo.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/assets/hero/Hero-1.jpg" as="image" />
      </head>
      <body className="min-h-full bg-[#FAFAF8] font-[family-name:var(--font-cairo)] text-foreground">
        {children}
      </body>
    </html>
  );
}

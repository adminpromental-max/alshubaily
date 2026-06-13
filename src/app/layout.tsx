import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlShubaily | مجموعة خالد سعود الشبيلي",
  description:
    "AlShubaily Group — Real Estate Investment portfolio and interactive experiences.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <link
          rel="preload"
          href="/assets/intro/intro.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/assets/Alshubaily-logo.png"
          as="image"
          type="image/png"
        />
      </head>
      <body className="min-h-full bg-[#0A0E17] text-foreground">{children}</body>
    </html>
  );
}

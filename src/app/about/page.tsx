import type { Metadata } from "next";
import { AboutPageClient } from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "من نحن | مجموعة الشبيلي العقارية",
  description:
    "تعرّف على مجموعة الشبيلي العقارية وخريطة مشاريعنا في المملكة العربية السعودية.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}

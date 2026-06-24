import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/pages/PlaceholderPages";

export const metadata: Metadata = {
  title: "خدماتنا | مجموعة الشبيلي العقارية",
  description: "خدمات مجموعة الشبيلي العقارية.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}

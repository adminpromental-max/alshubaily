import type { Metadata } from "next";
import { MediaPageClient } from "@/components/pages/PlaceholderPages";

export const metadata: Metadata = {
  title: "المركز الإعلامي | مجموعة الشبيلي العقارية",
  description: "المركز الإعلامي لمجموعة الشبيلي العقارية.",
};

export default function MediaPage() {
  return <MediaPageClient />;
}

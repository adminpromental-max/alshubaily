import type { Metadata } from "next";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";

export const metadata: Metadata = {
  title: "المشاريع | مجموعة الشبيلي العقارية",
  description: "استكشف مشاريع مجموعة الشبيلي العقارية في مختلف مناطق المملكة.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}

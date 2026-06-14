import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, PROJECTS } from "@/data/projects";
import { ProjectPageWrapper } from "@/components/projects/ProjectPageWrapper";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectPageWrapper project={project} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.nameEn} | AlShubaily`,
    description: project.descriptionEn,
  };
}

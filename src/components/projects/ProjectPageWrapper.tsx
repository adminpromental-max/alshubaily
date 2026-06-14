import { LangProvider } from "@/contexts/lang-context";
import { ProjectPageClient } from "@/components/projects/ProjectPageClient";

// wrapper for project pages that need lang context
export function ProjectPageWrapper({ project }: { project: Parameters<typeof ProjectPageClient>[0]["project"] }) {
  return (
    <LangProvider>
      <ProjectPageClient project={project} />
    </LangProvider>
  );
}

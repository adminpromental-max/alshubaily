import { LangProvider } from "@/contexts/lang-context";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { ProjectPageClient } from "@/components/projects/ProjectPageClient";

// wrapper for project pages that need lang context
export function ProjectPageWrapper({ project }: { project: Parameters<typeof ProjectPageClient>[0]["project"] }) {
  return (
    <LangProvider>
      <SmoothScrollProvider>
        <ProjectPageClient project={project} />
      </SmoothScrollProvider>
    </LangProvider>
  );
}

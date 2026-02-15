import { getAllProjects } from '@/lib/mdx';
import { ProjectCard } from '@/components/ProjectCard';

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">All Projects</h1>
        <p className="text-textSecondary text-center max-w-2xl mx-auto mb-12">
          Deep-dive case studies across cost optimization, ML platforms, and
          observability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}


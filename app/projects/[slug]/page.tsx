import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/lib/mdx';

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <a
          href="/#projects"
          className="inline-flex items-center text-textSecondary hover:text-accentPrimary mb-8"
        >
          ← Back to Projects
        </a>

        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-2xl text-textSecondary mb-6">
            {project.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.metrics?.map((metric, i) => (
              <div
                key={`${metric.label}-${i}`}
                className="bg-surfaceElevated p-4 rounded-lg text-center"
              >
                <p className="text-textTertiary text-sm mb-1">
                  {metric.label}
                </p>
                {metric.before && metric.after ? (
                  <div>
                    <p className="text-lg line-through text-textTertiary">
                      {metric.before}
                    </p>
                    <p className="text-2xl font-bold text-accentTertiary">
                      {metric.after}
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold font-mono">
                    {metric.value}
                    {metric.suffix}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {project.diagram && (
          <div className="mb-12 bg-surfaceElevated p-8 rounded-lg">
            <Image
              src={project.diagram}
              alt="Architecture diagram"
              width={800}
              height={600}
              className="w-full"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none mb-12">
          {project.content}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-surfaceElevated border border-surface rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-surface">
          <a href="/#projects" className="text-accentPrimary hover:underline">
            ← View All Projects
          </a>
        </div>
      </div>
    </article>
  );
}


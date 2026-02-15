import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/mdx';

const THUMBNAIL_POSITION_CLASS: Record<NonNullable<Project['thumbnailPosition']>, string> = {
  top: 'object-top',
  center: 'object-center',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
  'left-top': 'object-left-top',
  'left-bottom': 'object-left-bottom',
  'right-top': 'object-right-top',
  'right-bottom': 'object-right-bottom',
};

function getThumbnailPositionClass(position?: Project['thumbnailPosition']): string {
  return position ? THUMBNAIL_POSITION_CLASS[position] : 'object-center';
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group relative bg-surfaceElevated rounded-lg border border-surface overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-accentPrimary/50">
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-surface border border-accentTertiary/60 text-accentTertiary rounded-full text-sm font-semibold shadow-lg">
          {project.impact?.primary}
        </div>

        {project.thumbnail && (
          <div className="p-4 pt-4">
            <div className="relative h-48 bg-surface rounded-lg overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className={`object-cover ${getThumbnailPositionClass(project.thumbnailPosition)}`}
              />
            </div>
          </div>
        )}

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-accentPrimary transition-colors">
            {project.title}
          </h3>
          <p className="text-textSecondary mb-4">{project.subtitle}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-surface text-textSecondary text-xs rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-1 text-textTertiary text-xs">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>

          <div className="flex items-center text-accentPrimary font-semibold">
            View Case Study
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M5 12h12M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}


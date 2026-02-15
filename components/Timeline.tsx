import Link from 'next/link';
import { getResumeData } from '@/lib/resume';

export async function Timeline() {
  const resume = getResumeData();

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Professional Journey
        </h2>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-surface" />

          <div className="space-y-12">
            {resume.experience.map((job) => (
              <div key={job.id} className="relative pl-20">
                <div
                  className={`absolute left-6 w-4 h-4 rounded-full border-2 ${
                    job.current
                      ? 'bg-accentPrimary border-accentPrimary animate-pulse'
                      : 'bg-background border-textTertiary'
                  }`}
                />

                <div className="bg-surfaceElevated p-6 rounded-lg border border-surface">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-accentPrimary font-semibold">
                        {job.company}
                      </p>
                      {job.client && (
                        <p className="text-textSecondary text-sm">
                          Client: {job.client} ({job.engagement})
                        </p>
                      )}
                    </div>
                    <span className="text-textTertiary text-sm">
                      {job.startDate} - {job.current ? 'Present' : job.endDate}
                    </span>
                  </div>

                  {job.summary && (
                    <p className="text-textSecondary mb-4">{job.summary}</p>
                  )}

                  <ul className="space-y-2 mb-4">
                    {job.highlights.map((highlight: string, i: number) => (
                      <li
                        key={i}
                        className="text-sm text-textSecondary flex items-start"
                      >
                        <span className="text-accentPrimary mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-surface text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {job.projects && job.projects.length > 0 && (
                    <div className="pt-4 border-t border-surface">
                      <p className="text-sm text-textTertiary mb-2">
                        Related Projects:
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {job.projects.map((projectId: string) => (
                          <Link
                            key={projectId}
                            href={`/projects/${projectId}`}
                            className="text-sm text-accentPrimary hover:underline"
                          >
                            View →
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


import { getResumeData } from '@/lib/resume';

export async function SkillsGrid() {
  const resume = getResumeData();
  const skills = resume.skills || {};

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surfaceElevated p-6 rounded-lg border border-surface">
            <h3 className="text-xl font-semibold mb-4">Cloud</h3>
            <ul className="space-y-2 text-textSecondary">
              {skills.cloud?.map(
                (item: { name: string; level: string }, idx: number) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="text-textTertiary">{item.level}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="bg-surfaceElevated p-6 rounded-lg border border-surface">
            <h3 className="text-xl font-semibold mb-4">Orchestration</h3>
            <div className="flex flex-wrap gap-2">
              {skills.orchestration?.map((name: string) => (
                <span
                  key={name}
                  className="px-3 py-1 bg-surface text-xs rounded text-textSecondary"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-surfaceElevated p-6 rounded-lg border border-surface">
            <h3 className="text-xl font-semibold mb-4">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages?.map((name: string) => (
                <span
                  key={name}
                  className="px-3 py-1 bg-surface text-xs rounded text-textSecondary"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


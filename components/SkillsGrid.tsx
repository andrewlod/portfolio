import { getResumeData } from '@/lib/resume';

export async function SkillsGrid() {
  const resume = getResumeData();
  const skills = resume.skills || {};

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([key, value]) => (
            <div className="bg-surfaceElevated p-6 rounded-lg border border-surface">
              <h3 className="text-xl font-semibold mb-4">{key}</h3>
              <div className="flex flex-wrap gap-2">
                {value.map((name: string) => (
                  <span
                    key={name}
                    className="px-3 py-1 bg-surface text-xs rounded text-textSecondary"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

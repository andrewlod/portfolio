import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { Timeline } from '@/components/Timeline';
import { SkillsGrid } from '@/components/SkillsGrid';
import { ContactSection } from '@/components/ContactSection';
import { getFeaturedProjects } from '@/lib/mdx';

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return (
    <>
      <Hero />

      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* All project navigation standardized to main page #projects */}
          <div className="text-center"></div>
        </div>
      </section>

      <Timeline />
      <SkillsGrid />
      <ContactSection />
    </>
  );
}


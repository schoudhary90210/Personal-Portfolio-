import type { Metadata } from 'next';
import { cardSurface } from '@/components/layout/Section';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Machine learning, quantitative finance, systems and data engineering projects by Siddhant Choudhary.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="hero-y bg-bg">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow mb-4">Projects</p>
            <h1 className="max-w-[20ch] text-hero font-semibold">Things I&apos;ve built.</h1>
            <p className="mt-6 max-w-[60ch] text-lead text-muted">
              Machine learning, quantitative finance, systems and data engineering work, from hackathon builds
              with a team to longer personal projects.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="All projects" className="section-y bg-surface-tinted">
        <div className="container-site">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <li key={project.slug} className="h-full">
                <Reveal delay={(i % 3) * 60} className="h-full">
                  <ProjectCard project={project} surface={cardSurface.tinted} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

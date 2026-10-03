import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cardSurface, Section, type SectionTone } from '@/components/layout/Section';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import { featuredProjects, projects } from '@/content/projects';

export function ProjectsSection({ tone = 'base' }: { tone?: SectionTone }) {
  const allLink = (
    <Link
      href="/projects"
      className="inline-flex shrink-0 items-center gap-2 font-medium text-accent-text hover:underline"
    >
      See all {projects.length} projects
      <ArrowRight className="size-[1.125rem]" aria-hidden />
    </Link>
  );

  return (
    <Section
      id="projects"
      eyebrow="Selected projects"
      title="Things I've built."
      lead="Machine learning, systems and data work, from hackathon builds to longer personal projects."
      tone={tone}
      action={<span className="hidden md:block">{allLink}</span>}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60} className="h-full">
            <ProjectCard project={project} surface={cardSurface[tone]} />
          </Reveal>
        ))}
      </div>
      <div className="mt-8 md:hidden">{allLink}</div>
    </Section>
  );
}

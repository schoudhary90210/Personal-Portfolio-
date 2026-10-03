import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cardSurface, Section, type SectionTone } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Timeline } from '@/components/ui/Timeline';
import { leadership } from '@/content/experience';
import { projects } from '@/content/projects';
import { cn } from '@/lib/cn';

const hackathons = projects.filter((p) => p.event);

export function LeadershipSection({ tone = 'base' }: { tone?: SectionTone }) {
  return (
    <Section id="leadership" eyebrow="Leadership & community" title="Beyond the job titles." tone={tone}>
      <Timeline items={leadership} tone={tone} />

      <h3 className="eyebrow mt-16 mb-6 text-subtle md:mt-20">Hackathons</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        {hackathons.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60} className="h-full">
            <Link
              href={`/projects/${project.slug}`}
              className={cn(
                'group flex h-full flex-col rounded-3xl border border-transparent p-6 transition-[box-shadow,border-color] duration-200 hover:border-border hover:shadow-elev sm:p-7',
                cardSurface[tone],
              )}
            >
              <p className="font-mono text-sm text-subtle">{project.date}</p>
              <h4 className="mt-2 font-semibold">{project.event}</h4>
              <p className="mt-3 text-sm font-medium text-fg">Team project: {project.name}</p>
              <p className="mt-1 text-muted">{project.summary}</p>
              <span aria-hidden className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent-text">
                Read the case study
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

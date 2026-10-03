import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ExternalLink, Info, Minus } from 'lucide-react';
import { cardSurface, Section } from '@/components/layout/Section';
import { buttonClasses } from '@/components/ui/button';
import { GithubIcon } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { getProject, projects, type Project } from '@/content/projects';
import { cn } from '@/lib/cn';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  // Wraps around, so the last project still offers somewhere to go next.
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const isTeam = project.team === 'Team project';

  const glance = [
    { label: 'When', value: project.date },
    { label: 'Type', value: project.team },
    project.role && { label: isTeam ? 'My role' : 'Role', value: project.role },
    { label: 'Context', value: project.context },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article>
      <header
        className="hero-y bg-bg"
        style={{
          backgroundImage: 'linear-gradient(to bottom, var(--surface-tinted), transparent 28rem)',
        }}
      >
        <div className="container-site">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-fg"
            >
              <ArrowLeft className="size-[1.125rem]" aria-hidden />
              All projects
            </Link>
          </Reveal>

          <Reveal className="mx-auto mt-10 max-w-4xl text-center">
            <p className="eyebrow">{project.category}</p>
            <h1 className="mt-4 text-hero font-semibold">{project.name}</h1>
            <p className="mx-auto mt-6 max-w-[62ch] text-lead text-muted">{project.summary}</p>

            <ul className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>

            {project.links.length > 0 ? (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {project.links.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses({ variant: i === 0 ? 'primary' : 'outline' })}
                  >
                    {link.kind === 'code' ? (
                      <GithubIcon className="size-[1.125rem]" />
                    ) : (
                      <ExternalLink className="size-[1.125rem]" aria-hidden />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            ) : (
              project.linkNote && (
                <p className="mx-auto mt-8 inline-flex max-w-[60ch] items-start gap-2 rounded-2xl border border-border px-4 py-3 text-left text-sm text-muted">
                  <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {project.linkNote}
                </p>
              )
            )}
          </Reveal>

          <Reveal delay={80} className="mx-auto mt-14 max-w-4xl">
            <dl
              className={cn(
                // An odd last item spans the row on mobile so no empty cell shows.
                'grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1',
                glance.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3',
              )}
            >
              {glance.map((item) => (
                <div key={item.label} className="bg-bg p-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.06em] text-subtle">{item.label}</dt>
                  <dd className="mt-1.5 text-sm font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </header>

      <Section id="problem" eyebrow="The problem" title="Why it exists." tone="tinted" split>
        <Reveal>
          <p className="max-w-[62ch] text-lead text-muted">{project.problem}</p>
        </Reveal>
      </Section>

      <Section id="work" eyebrow="The work" title={isTeam ? 'What we built.' : 'What I built.'} tone="base">
        {project.pipeline && <Pipeline steps={project.pipeline} />}
        <ol className="grid gap-4 md:grid-cols-2">
          {project.work.map((line, i) => (
            <li key={line} className="h-full">
              <Reveal delay={(i % 2) * 60} className={cn('flex h-full gap-5 rounded-3xl p-6 sm:p-7', cardSurface.base)}>
                <span
                  aria-hidden
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-semibold text-accent-fg"
                >
                  {i + 1}
                </span>
                <span className="text-muted">{line}</span>
              </Reveal>
            </li>
          ))}
        </ol>
        {project.credit && (
          <Reveal>
            <p className="mt-8 max-w-[68ch] border-l-2 border-accent pl-4 text-muted">{project.credit}</p>
          </Reveal>
        )}
      </Section>

      <Section id="decision" eyebrow="A decision worth explaining" title={`${project.decision.title}.`} tone="tinted" split>
        <Reveal>
          <p className="max-w-[62ch] text-lead text-muted">{project.decision.body}</p>
        </Reveal>
      </Section>

      <Section id="results" eyebrow="Results & limits" title="What it shows, and what it doesn't." tone="base">
        <div className="grid gap-5 md:grid-cols-2">
          <ResultList title="Results" items={project.results} Icon={Check} />
          <ResultList title="Limits" items={project.limits} Icon={Minus} />
        </div>
        {project.related && (
          <Reveal className="mt-5">
            <a
              href={project.related.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 rounded-3xl border border-border p-6 transition-colors duration-200 hover:bg-fg/5 sm:p-7"
            >
              <span className="font-mono text-xs uppercase tracking-[0.06em] text-subtle">Related project</span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                {project.related.label}
                <ArrowUpRight className="size-4 text-accent-text" aria-hidden />
              </span>
              <span className="text-muted">{project.related.text}</span>
            </a>
          </Reveal>
        )}
      </Section>

      <section aria-label="Next project" className="section-y bg-surface-tinted">
        <div className="container-site">
          <Reveal>
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col gap-6 rounded-3xl bg-bg p-8 transition-shadow duration-200 hover:shadow-elev sm:flex-row sm:items-center sm:justify-between sm:p-10"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-subtle">Next project</p>
                <p className="mt-2 text-band font-semibold">{next.name}</p>
                <p className="mt-2 text-sm text-muted">{next.category}</p>
              </div>
              <span
                aria-hidden
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
              >
                <ArrowRight className="size-6" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

function ResultList({
  title,
  items,
  Icon,
}: {
  title: string;
  items: Project['results'];
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Reveal className={cn('h-full rounded-3xl p-6 sm:p-7', cardSurface.base)}>
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted">
            <Icon className="mt-1 size-4 shrink-0 text-accent-text" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** A data flow drawn as connected steps: a row on wide screens, a column on mobile. */
function Pipeline({ steps }: { steps: string[] }) {
  return (
    <Reveal className="mb-10">
      <ol aria-label="Pipeline" className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row">
            <span
              className={cn(
                'w-full rounded-2xl border px-4 py-3 text-center font-mono text-sm',
                i === 0 || i === steps.length - 1
                  ? 'border-accent/50 bg-accent-soft text-fg'
                  : 'border-border bg-surface-tinted text-muted',
              )}
            >
              {step}
            </span>
            {i < steps.length - 1 && (
              <ArrowRight aria-hidden className="size-4 shrink-0 rotate-90 text-subtle lg:rotate-0" />
            )}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

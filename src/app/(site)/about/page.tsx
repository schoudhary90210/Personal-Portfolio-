import type { Metadata } from 'next';
import { FileText, GraduationCap, Mail, MapPin } from 'lucide-react';
import { buttonClasses } from '@/components/ui/button';
import { Reveal } from '@/components/ui/Reveal';
import { EducationSection } from '@/components/sections/EducationSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { InterestsSection } from '@/components/sections/InterestsSection';
import { LeadershipSection } from '@/components/sections/LeadershipSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { education } from '@/content/education';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: profile.about[0],
  alternates: { canonical: '/about' },
};

const details = [
  { Icon: MapPin, text: site.location },
  { Icon: Mail, text: site.email, href: `mailto:${site.email}` },
  { Icon: GraduationCap, text: `Graduating ${site.graduation}` },
];

const current = experience[0];

const facts = [
  { label: 'Studying', value: education.degree.replace('B.S. ', '') },
  { label: 'At', value: education.school },
  { label: 'Graduating', value: site.graduation },
  { label: 'Currently', value: `${current.role}, ${current.team ?? current.org}` },
];

export default function AboutPage() {
  return (
    <>
      <section className="hero-y bg-bg">
        <div className="container-site grid items-center gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">About</p>
            <h1 className="text-hero font-semibold">{site.name}</h1>
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-6 max-w-[60ch] text-lead text-muted">
                {paragraph}
              </p>
            ))}
            <ul className="mt-8 flex flex-col gap-3 text-muted">
              {details.map(({ Icon, text, href }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0" aria-hidden />
                  {href ? (
                    <a href={href} className="transition-colors duration-200 hover:text-fg">
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-3xl border border-border bg-surface-tinted p-7 sm:p-9">
              <div
                aria-hidden
                className="flex size-20 items-center justify-center rounded-full bg-accent font-mono text-2xl font-semibold text-accent-fg"
              >
                {site.initials}
              </div>
              <dl className="mt-8 divide-y divide-border">
                {facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                    <dt className="font-mono text-sm text-subtle">{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: 'outline', className: 'mt-6 w-full' })}
              >
                <FileText className="size-[1.125rem]" aria-hidden />
                View resume
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ExperienceSection tone="tinted" />
      <LeadershipSection tone="base" />
      <EducationSection tone="tinted" />
      <SkillsSection tone="base" />
      <InterestsSection tone="tinted" />

      <section className="bg-bg py-12">
        <p className="container-site text-sm text-subtle">
          About this site: the previous version was a Batman Arkham&ndash;style terminal, and it still runs at{' '}
          <a href="/batcomputer" className="font-medium text-accent-text hover:underline">
            /batcomputer
          </a>
          .
        </p>
      </section>
    </>
  );
}

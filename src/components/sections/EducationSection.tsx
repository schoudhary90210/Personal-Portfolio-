import { GraduationCap } from 'lucide-react';
import { cardSurface, Section, type SectionTone } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { education } from '@/content/education';
import { cn } from '@/lib/cn';

export function EducationSection({ tone = 'tinted' }: { tone?: SectionTone }) {
  return (
    <Section id="education" eyebrow="Education" title="Where I'm studying." tone={tone}>
      <Reveal className={cn('rounded-3xl p-6 sm:p-8 md:p-10', cardSurface[tone])}>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <span
              aria-hidden
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text"
            >
              <GraduationCap className="size-6" />
            </span>
            <div>
              <h3 className="text-card font-semibold">{education.school}</h3>
              <p className="mt-1 text-muted">{education.degree}</p>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-10 gap-y-1 font-mono text-sm md:text-right">
            <dt className="text-subtle">Graduation</dt>
            <dt className="text-subtle">GPA</dt>
            <dd className="text-fg">{education.graduation.replace('Expected ', '')}</dd>
            <dd className="text-fg">{education.gpa}</dd>
          </dl>
        </div>

        <h4 className="mt-8 text-sm font-medium">Relevant coursework</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {education.coursework.map((course) => (
            <Tag key={course}>{course}</Tag>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

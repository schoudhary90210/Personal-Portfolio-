import { Sparkles } from 'lucide-react';
import { cardSurface, Section, type SectionTone } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { aiPractice, skills } from '@/content/skills';
import { cn } from '@/lib/cn';

export function SkillsSection({ tone = 'base' }: { tone?: SectionTone }) {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with."
      lead="Grouped by where I've actually used them, strongest first."
      tone={tone}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.name} delay={(i % 2) * 60} className={cn('rounded-3xl p-6 sm:p-7', cardSurface[tone])}>
            <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-semibold">
              {group.name}
              {group.note && <span className="font-mono text-xs font-normal text-subtle">{group.note}</span>}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </Reveal>
        ))}
        <Reveal delay={60} className={cn('rounded-3xl p-6 sm:p-7', cardSurface[tone])}>
          <h3 className="flex items-center gap-2 font-semibold">
            <Sparkles className="size-[1.125rem] text-accent-text" aria-hidden />
            AI-assisted development
          </h3>
          <p className="mt-3 text-muted">{aiPractice}</p>
        </Reveal>
      </div>
    </Section>
  );
}

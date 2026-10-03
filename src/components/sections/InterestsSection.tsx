import { Headphones, Tv, Volleyball } from 'lucide-react';
import { cardSurface, Section, type SectionTone } from '@/components/layout/Section';
import { SoccerBallIcon } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { interests, type Interest } from '@/content/interests';
import { cn } from '@/lib/cn';

const icons: Record<Interest['id'], React.ComponentType<{ className?: string }>> = {
  soccer: SoccerBallIcon,
  volleyball: Volleyball,
  music: Headphones,
  tv: Tv,
};

export function InterestsSection({ tone = 'tinted' }: { tone?: SectionTone }) {
  return (
    <Section
      id="beyond-the-code"
      eyebrow="Beyond the code"
      title="When I'm not at a keyboard."
      tone={tone}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {interests.map((interest, i) => {
          const Icon = icons[interest.id];
          return (
            <Reveal key={interest.id} delay={i * 60} className={cn('h-full rounded-3xl p-6 sm:p-7', cardSurface[tone])}>
              <span
                aria-hidden
                className="flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent-text"
              >
                <Icon className="size-[1.375rem]" />
              </span>
              <h3 className="mt-5 font-semibold">{interest.title}</h3>
              <p className="mt-2 text-muted">{interest.body}</p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

import { Section, type SectionTone } from '@/components/layout/Section';
import { Timeline } from '@/components/ui/Timeline';
import { earlierExperience, experience } from '@/content/experience';

export function ExperienceSection({ tone = 'tinted' }: { tone?: SectionTone }) {
  return (
    <Section id="experience" eyebrow="Experience" title="Where the work happened." tone={tone}>
      <Timeline items={experience} tone={tone} />
      <div className="mt-16 md:mt-20">
        <h3 className="eyebrow mb-8 text-subtle">Earlier</h3>
        <Timeline items={earlierExperience} tone={tone} />
      </div>
    </Section>
  );
}

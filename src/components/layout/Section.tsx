import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

export type SectionTone = 'base' | 'tinted';

/** Card background that contrasts with the section it sits in. */
export const cardSurface: Record<SectionTone, string> = {
  base: 'bg-surface-tinted',
  tinted: 'bg-bg',
};

/** Ring color matching the section background (for timeline dots). */
export const ringSurface: Record<SectionTone, string> = {
  base: 'ring-bg',
  tinted: 'ring-surface-tinted',
};

export function Section({
  id,
  eyebrow,
  title,
  lead,
  tone = 'base',
  action,
  split = false,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: SectionTone;
  /** Optional link shown beside the heading on wide screens. */
  action?: React.ReactNode;
  /** Heading beside the content on wide screens, for short prose sections. */
  split?: boolean;
  children: React.ReactNode;
}) {
  const titleId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn('section-y scroll-mt-16', tone === 'tinted' ? 'bg-surface-tinted' : 'bg-bg')}
    >
      <div className={cn('container-site', split && 'md:grid md:grid-cols-[5fr_7fr] md:items-start md:gap-16')}>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h2 id={titleId} className="max-w-[22ch] text-section font-semibold">
              {title}
            </h2>
            {lead && <p className="mt-5 max-w-[60ch] text-lead text-muted">{lead}</p>}
          </div>
          {action}
        </Reveal>
        <div className={cn('mt-10', split ? 'md:mt-0 md:pt-9' : 'md:mt-14')}>{children}</div>
      </div>
    </section>
  );
}

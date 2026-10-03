import { ArrowUpRight } from 'lucide-react';
import type { ExperienceItem } from '@/content/experience';
import { ringSurface, type SectionTone } from '@/components/layout/Section';
import { Reveal } from './Reveal';
import { Tag } from './Tag';
import { cn } from '@/lib/cn';

/** Vertical experience timeline: dates in a rail on wide screens, inline on mobile. */
export function Timeline({ items, tone = 'base' }: { items: ExperienceItem[]; tone?: SectionTone }) {
  return (
    <ol>
      {items.map((item, i) => {
        const meta = [item.period, item.location].filter(Boolean);
        return (
          <li key={item.id} className="group grid md:grid-cols-[13rem_1fr] md:gap-12">
            <div className="hidden pt-0.5 font-mono text-sm leading-relaxed text-subtle md:block">
              {meta.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <Reveal delay={i * 60} className="relative pb-12 pl-7 group-last:pb-0 md:pl-9">
              <span aria-hidden className="absolute top-3 bottom-0 left-[4px] w-px bg-border group-last:hidden" />
              <span
                aria-hidden
                className={cn('absolute top-1.5 left-0 size-[9px] rounded-full bg-accent ring-4', ringSurface[tone])}
              />
              {meta.length > 0 && (
                <p className="mb-1.5 font-mono text-sm text-subtle md:hidden">{meta.join(' · ')}</p>
              )}
              <h3 className="text-card font-semibold">{item.role}</h3>
              <p className="mt-1 text-muted">
                {item.org}
                {item.team && <span> &middot; {item.team}</span>}
              </p>

              <ul className="mt-4 space-y-2.5">
                {item.highlights.map((line) => (
                  <li key={line} className="flex gap-3 text-muted">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-text" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              {(item.tags.length > 0 || item.link) && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  {item.link && (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline"
                    >
                      {item.link.label}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

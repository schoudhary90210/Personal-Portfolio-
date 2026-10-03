import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Project } from '@/content/projects';
import { Tag } from './Tag';
import { cn } from '@/lib/cn';

const MAX_TAGS = 4;

/**
 * Text-only card: screenshots live on the detail page so listings stay a calm
 * typographic grid. The whole card is one link; "Learn more" is decorative.
 */
export function ProjectCard({ project, surface }: { project: Project; surface: string }) {
  const visible = project.stack.slice(0, MAX_TAGS);
  const hidden = project.stack.length - visible.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group flex h-full flex-col rounded-3xl border border-transparent p-6 transition-[box-shadow,border-color] duration-200 ease-standard hover:border-border hover:shadow-elev sm:p-8',
        surface,
      )}
    >
      <p className="eyebrow mb-3 text-[0.75rem]">{project.category}</p>
      <h3 className="text-card font-semibold">{project.name}</h3>
      <p className="mt-1 text-sm text-subtle">{project.context}</p>
      <p className="mt-4 line-clamp-3 text-muted">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {visible.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
        {hidden > 0 && <Tag>+{hidden}</Tag>}
      </div>

      <span aria-hidden className="mt-auto inline-flex items-center gap-1 pt-7 font-medium text-accent-text">
        Learn more
        <ChevronRight className="size-5 transition-transform duration-200 ease-standard group-hover:translate-x-[3px] motion-reduce:transform-none" />
      </span>
    </Link>
  );
}

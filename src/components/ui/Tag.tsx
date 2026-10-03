import { cn } from '@/lib/cn';

/** Pill used for technologies, coursework and skills. */
export function Tag({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'accent';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm',
        tone === 'accent'
          ? 'bg-accent-soft font-medium text-accent-text'
          : 'border border-border text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { buttonClasses } from '@/components/ui/button';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import { profile } from '@/content/profile';
import { site } from '@/content/site';

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-y relative overflow-hidden bg-bg"
      style={{
        backgroundImage: 'radial-gradient(60rem 28rem at 50% -6rem, var(--accent-soft), transparent 70%)',
      }}
    >
      <div className="container-site flex flex-col items-center text-center">
        <div
          aria-hidden
          className="animate-fade-up mb-8 flex size-24 items-center justify-center rounded-full border border-border bg-surface-tinted font-mono text-2xl font-semibold text-accent-text md:size-28 md:text-3xl"
          style={delay(0)}
        >
          {site.initials}
        </div>
        <p className="eyebrow animate-fade-up mb-4" style={delay(50)}>
          {site.headline}
        </p>
        <h1 id="hero-title" className="animate-fade-up max-w-[20ch] text-hero font-semibold" style={delay(100)}>
          {site.name}
        </h1>
        <p className="animate-fade-up mt-6 max-w-[60ch] text-lead text-muted" style={delay(150)}>
          {profile.intro}
        </p>
        <p
          className="animate-fade-up mt-5 inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-1.5 text-sm text-muted"
          style={delay(200)}
        >
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
          {profile.current}
        </p>
        <div
          className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:mt-10"
          style={delay(250)}
        >
          <Link href="/#contact" className={buttonClasses({ className: 'px-4 sm:px-5' })}>
            Get in touch
          </Link>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: 'outline', className: 'px-4 sm:px-5' })}
          >
            <FileText className="size-[1.125rem]" aria-hidden />
            Resume
          </a>
          <span className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={buttonClasses({ variant: 'outline', size: 'icon', className: 'size-11' })}
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={buttonClasses({ variant: 'outline', size: 'icon', className: 'size-11' })}
            >
              <LinkedinIcon className="size-5" />
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}

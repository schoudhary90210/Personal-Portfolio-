import Link from 'next/link';
import { buttonClasses } from '@/components/ui/button';

export function NotFoundContent() {
  return (
    <section className="hero-y bg-bg">
      <div className="container-site flex min-h-[40vh] flex-col items-center justify-center text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-section font-semibold">This page doesn&apos;t exist.</h1>
        <p className="mt-5 max-w-[50ch] text-lead text-muted">
          The link may be old, or the page may have moved. Try the home page or the project list.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonClasses()}>
            Go home
          </Link>
          <Link href="/projects" className={buttonClasses({ variant: 'outline' })}>
            See projects
          </Link>
        </div>
      </div>
    </section>
  );
}

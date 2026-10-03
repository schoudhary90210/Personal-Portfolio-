'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { buttonClasses } from '@/components/ui/button';
import { navLinks } from '@/content/nav';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Flat at rest; a hairline appears once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // The mobile sheet is full height: lock the page behind it and close it on
  // Escape or when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 48rem)');
    const onResize = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  const isActive = (href: string) =>
    !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`));

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-bg transition-colors duration-200',
        scrolled || open ? 'border-border' : 'border-transparent',
      )}
    >
      <nav aria-label="Main" className="container-site flex h-14 items-center justify-between gap-6 md:h-16">
        <Link
          href="/"
          onClick={close}
          aria-label={`${site.name}, home`}
          className="flex items-center gap-2.5 rounded-full font-medium tracking-[-0.01em]"
        >
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-full bg-accent font-mono text-[0.75rem] font-semibold text-accent-fg"
          >
            {site.initials}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(
                'text-sm font-medium transition-colors duration-200 hover:text-fg',
                isActive(link.href) ? 'text-fg' : 'text-muted',
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted transition-colors duration-200 hover:text-fg"
          >
            Resume
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/#contact" className={buttonClasses({ size: 'sm' })}>
              Get in touch
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Link href="/#contact" onClick={close} className={buttonClasses({ size: 'sm' })}>
            Get in touch
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className={buttonClasses({ variant: 'ghost', size: 'icon', className: 'text-fg' })}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 top-14 bottom-0 z-50 overflow-y-auto bg-bg md:hidden"
      >
        <div className="container-site flex flex-col py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className="border-b border-border py-4 text-lg"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="border-b border-border py-4 text-lg"
          >
            Resume
          </a>
          <div className="flex items-center justify-between py-4">
            <span className="text-muted">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

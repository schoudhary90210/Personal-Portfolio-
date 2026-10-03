import Link from 'next/link';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import { site } from '@/content/site';

type FooterLink = { label: string; href: string; kind?: 'external' | 'document' };

const columns: Array<{ heading: string; links: FooterLink[] }> = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/projects' },
    ],
  },
  {
    heading: 'Background',
    links: [
      { label: 'Experience', href: '/#experience' },
      { label: 'Education', href: '/#education' },
      { label: 'Skills', href: '/#skills' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'GitHub', href: site.github, kind: 'external' },
      { label: 'LinkedIn', href: site.linkedin, kind: 'external' },
      { label: 'Email', href: `mailto:${site.email}`, kind: 'document' },
    ],
  },
  {
    heading: 'More',
    links: [
      { label: 'Resume', href: site.resume, kind: 'external' },
      { label: 'Get in touch', href: '/#contact' },
      // A separate root layout, so a full page load rather than a client transition.
      { label: 'Enter the Batcomputer →', href: '/batcomputer', kind: 'document' },
    ],
  },
];

const social = [
  { label: `${site.name} on GitHub`, href: site.github, Icon: GithubIcon },
  { label: `${site.name} on LinkedIn`, href: site.linkedin, Icon: LinkedinIcon },
  { label: `Email ${site.name}`, href: `mailto:${site.email}`, Icon: Mail },
];

const linkClass = 'text-sm text-muted transition-colors duration-200 hover:text-fg';

export function Footer() {
  return (
    <footer className="bg-surface-sunken">
      <div className="container-site py-16 md:py-20">
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-sm font-medium">Find me elsewhere</p>
          <div className="flex items-center gap-2">
            {social.map(({ label, href, Icon }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:bg-fg/5 hover:text-fg"
              >
                <Icon className="size-[1.125rem]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {columns.map((column) => (
            <div key={column.heading}>
              <h2 className="text-sm font-medium">{column.heading}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.kind === 'external' ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {link.label}
                      </a>
                    ) : link.kind === 'document' ? (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="mt-12 border-t border-border" />

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium">{site.name}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <a href={`mailto:${site.email}`} className="transition-colors duration-200 hover:text-fg">
              {site.email}
            </a>
            <span>{site.location}</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

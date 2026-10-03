import { site } from '@/content/site';

export interface ContactLink {
  id: string;
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'mail';
}

export const contactLinks: ContactLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: site.github,
    icon: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: site.linkedin,
    icon: 'linkedin',
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${site.email}`,
    icon: 'mail',
  },
];

export const EMAIL_ADDRESS = site.email;

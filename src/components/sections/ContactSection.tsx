import { FileText, Mail } from 'lucide-react';
import { Section, type SectionTone } from '@/components/layout/Section';
import { buttonClasses } from '@/components/ui/button';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';

export function ContactSection({ tone = 'tinted' }: { tone?: SectionTone }) {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk."
      lead="Have a role, research project or idea in mind? Email is the fastest way to reach me."
      tone={tone}
    >
      <Reveal className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${site.email}`} className={buttonClasses({ className: 'h-12 px-6 text-base' })}>
            <Mail className="size-5" aria-hidden />
            {site.email}
          </a>
          <CopyEmailButton email={site.email} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: 'outline' })}>
            <LinkedinIcon className="size-[1.125rem]" />
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: 'outline' })}>
            <GithubIcon className="size-[1.125rem]" />
            GitHub
          </a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: 'outline' })}>
            <FileText className="size-[1.125rem]" aria-hidden />
            Resume
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

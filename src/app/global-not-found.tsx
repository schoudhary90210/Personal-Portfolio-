import type { Metadata } from 'next';
import './(site)/globals.css';
import { SiteShell } from '@/components/layout/SiteShell';
import { NotFoundContent } from '@/components/sections/NotFoundContent';
import { site } from '@/content/site';

// With two root layouts, unmatched URLs have no layout to render inside, so
// this page brings its own document (experimental.globalNotFound).
export const metadata: Metadata = {
  title: `Page not found · ${site.name}`,
};

export default function GlobalNotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}

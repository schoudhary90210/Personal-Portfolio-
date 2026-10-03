import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { geistMono, geistSans } from '@/lib/fonts';
import { themeInitScript } from '@/lib/theme';

/**
 * The html/body document shared by the main site's root layout and the
 * global 404 page. data-theme is rewritten before paint by the inline
 * script, hence suppressHydrationWarning.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        {/* First thing in <body>: runs before any content paints. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

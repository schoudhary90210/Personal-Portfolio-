'use client';

import { Moon, Sun } from 'lucide-react';
import { buttonClasses } from './button';

export const THEME_STORAGE_KEY = 'theme';

/**
 * Both icons are rendered and CSS shows the right one, so the server markup
 * never disagrees with the theme the inline script picked before paint.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode); the choice lasts for this page.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className={buttonClasses({ variant: 'ghost', size: 'icon', className })}
    >
      <Sun className="hidden size-5 dark:block" aria-hidden />
      <Moon className="block size-5 dark:hidden" aria-hidden />
    </button>
  );
}

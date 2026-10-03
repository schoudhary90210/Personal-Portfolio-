'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { buttonClasses } from './button';

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the mailto button beside this still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      title="Copy email address"
      className={buttonClasses({ variant: 'outline', size: 'icon', className: 'size-11' })}
    >
      {copied ? <Check className="size-5 text-accent-text" aria-hidden /> : <Copy className="size-5" aria-hidden />}
      <span role="status" className="sr-only">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}

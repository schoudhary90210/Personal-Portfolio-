'use client';

import { useEffect, useState } from 'react';

interface GlitchOverlayProps {
  duration?: number;
  onComplete?: () => void;
}

export default function GlitchOverlay({ duration = 50, onComplete }: GlitchOverlayProps) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
      onComplete?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 z-[10001] pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(220, 38, 38, 0.03) 0px,
              transparent 2px,
              transparent 4px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(220, 38, 38, 0.02) 0px,
              transparent 3px,
              transparent 6px
            )
          `,
          animation: 'glitch 0.05s infinite',
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  label: string;
  targetPercent: number;
  delay: number;
  duration: number;
}

export default function ProgressBar({
  label,
  targetPercent,
  delay,
  duration,
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
      setWidth(targetPercent);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay, targetPercent]);

  const blocks = 20;
  const filled = Math.round((width / 100) * blocks);

  return (
    <div
      className={`font-mono text-xs transition-opacity duration-300 ${
        started ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-text-secondary w-40 uppercase tracking-wider text-[10px]">
          {label}
        </span>
        <div className="flex-1 flex items-center gap-1">
          <span className="text-accent">[</span>
          <span
            className="text-accent transition-all"
            style={{
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: 'linear',
            }}
          >
            {'█'.repeat(filled)}
            {'░'.repeat(blocks - filled)}
          </span>
          <span className="text-accent">]</span>
        </div>
        <span className="text-text-secondary w-10 text-right text-[10px]">
          {width}%
        </span>
      </div>
    </div>
  );
}

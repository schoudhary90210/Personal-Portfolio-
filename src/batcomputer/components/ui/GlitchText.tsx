'use client';

import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchDuration?: number;
  onComplete?: () => void;
}

export default function GlitchText({
  text,
  className = '',
  glitchDuration = 600,
  onComplete,
}: GlitchTextProps) {
  const [visible, setVisible] = useState(false);
  const [glitching, setGlitching] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setGlitching(false);
      onComplete?.();
    }, glitchDuration);
    return () => clearTimeout(timer);
  }, [glitchDuration, onComplete]);

  if (!visible) return null;

  return (
    <span
      className={`inline-block ${glitching ? 'glitch-text' : ''} ${className}`}
    >
      {text}
    </span>
  );
}

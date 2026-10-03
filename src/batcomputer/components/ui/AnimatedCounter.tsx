'use client';

import { useEffect, useState, useRef, type ReactNode } from 'react';

interface AnimatedCounterProps {
  value: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  commas?: boolean;
}

export default function AnimatedCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 800,
  commas = false,
}: AnimatedCounterProps) {
  const target = parseFloat(value);
  const [display, setDisplay] = useState(() => formatNum(0, decimals, commas));
  const rafRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(formatNum(target, decimals, commas));
      return;
    }

    let start: number | null = null;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(formatNum(eased * target, decimals, commas));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, decimals, duration, commas]);

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
}

function formatNum(n: number, decimals: number, commas: boolean): string {
  const s = n.toFixed(decimals);
  if (!commas) return s;
  const [int, dec] = s.split('.');
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dec !== undefined ? `${formatted}.${dec}` : formatted;
}

/** Parse a string and wrap numeric portions in AnimatedCounter. */
export function renderAnimatedNumbers(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIdx = 0;
  let found = false;

  const re = /(?<![a-zA-Z])([+$~<]?)(\d[\d,]*\.?\d*)([%MBKk]*[+]*)/g;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    found = true;
    const [full, pre, numStr, unit] = m;

    if (m.index > lastIdx) parts.push(text.slice(lastIdx, m.index));

    const clean = numStr.replace(/,/g, '');
    const hasCommas = numStr.includes(',');
    const dec = clean.includes('.') ? clean.split('.')[1].length : 0;

    parts.push(
      <AnimatedCounter
        key={m.index}
        value={clean}
        prefix={pre}
        suffix={unit}
        decimals={dec}
        commas={hasCommas}
      />,
    );

    lastIdx = m.index + full.length;
  }

  if (!found) return text;
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return <>{parts}</>;
}

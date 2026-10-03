'use client';

import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react';

interface MagneticWrapProps {
  children: ReactNode;
  radius?: number;
  strength?: number;
  className?: string;
}

export default function MagneticWrap({
  children,
  radius = 80,
  strength = 0.15,
  className,
}: MagneticWrapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768 || 'ontouchstart' in window) return;
    setEnabled(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled || !wrapRef.current) return;

      const rect = wrapRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        setIsNear(true);
        setOffset({
          x: dx * strength,
          y: dy * strength,
        });
      } else if (isNear) {
        setIsNear(false);
        setOffset({ x: 0, y: 0 });
      }
    },
    [enabled, radius, strength, isNear],
  );

  const handleMouseLeave = useCallback(() => {
    setIsNear(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled, handleMouseMove]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={wrapRef}
      className={className}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: isNear
          ? 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
          : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: isNear ? 'transform' : undefined,
      }}
    >
      {children}
    </div>
  );
}

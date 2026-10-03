'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768 || 'ontouchstart' in window) return;

    setVisible(true);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX - 15}px, ${glowY - 15}px)`;
      }

      animFrame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 45,
      }}
    />
  );
}

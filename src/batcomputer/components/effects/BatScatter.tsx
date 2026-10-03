'use client';

import { useEffect, useRef } from 'react';

interface BatScatterProps {
  originX: number;
  originY: number;
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  scale: number;
  scaleGrowth: number;
  opacity: number;
  wingPhase: number;
  wingSpeed: number;
}

export default function BatScatter({ originX, originY, onComplete }: BatScatterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    const rect = parent?.getBoundingClientRect();
    canvas.width = rect?.width ?? window.innerWidth;
    canvas.height = rect?.height ?? window.innerHeight;

    // Convert viewport coordinates to canvas-local coordinates
    const canvasRect = canvas.getBoundingClientRect();
    const localOriginX = originX - canvasRect.left;
    const localOriginY = originY - canvasRect.top;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 8 : 20;

    const particles: Particle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 6;
      return {
        x: localOriginX,
        y: localOriginY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        scale: 1.0 + Math.random() * 0.8,
        scaleGrowth: 0.015 + Math.random() * 0.015,
        opacity: 1,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: 0.2 + Math.random() * 0.15,
      };
    });

    const duration = 800;
    const startTime = performance.now();
    let frameId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const progress = elapsed / duration;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.scale += p.scaleGrowth;
        p.wingPhase += p.wingSpeed;
        p.opacity = Math.max(0, 1 - progress * 1.3);

        const wingFlap = Math.sin(p.wingPhase) * 0.3;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.scale, p.scale);
        ctx.globalAlpha = p.opacity;

        // Red glow shadow
        ctx.shadowColor = '#dc2626';
        ctx.shadowBlur = 10;

        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.bezierCurveTo(-4, -4 + wingFlap * 10, -10, -8 + wingFlap * 15, -16, -6 + wingFlap * 20);
        ctx.bezierCurveTo(-12, -2, -8, 1, -5, 2);
        ctx.bezierCurveTo(-7, 0, -10, -1, -14, 2 + wingFlap * 5);
        ctx.bezierCurveTo(-10, 4, -6, 4, -3, 3);
        ctx.bezierCurveTo(-2, 5, -1, 7, 0, 8);
        ctx.bezierCurveTo(1, 7, 2, 5, 3, 3);
        ctx.bezierCurveTo(6, 4, 10, 4, 14, 2 + wingFlap * 5);
        ctx.bezierCurveTo(10, -1, 7, 0, 5, 2);
        ctx.bezierCurveTo(8, 1, 12, -2, 16, -6 + wingFlap * 20);
        ctx.bezierCurveTo(10, -8 + wingFlap * 15, 4, -4 + wingFlap * 10, 0, -2);
        ctx.closePath();
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [originX, originY, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[9999] pointer-events-none"
    />
  );
}

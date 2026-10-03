'use client';

import { useEffect, useRef, useCallback } from 'react';

interface BatSwarmProps {
  onComplete: () => void;
  duration?: number;
}

interface Bat {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  speed: number;
  opacity: number;
  phase: 'gather' | 'scatter';
  wingPhase: number;
  wingSpeed: number;
}

export default function BatSwarm({ onComplete, duration = 2000 }: BatSwarmProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const drawBat = useCallback(
    (ctx: CanvasRenderingContext2D, bat: Bat) => {
      ctx.save();
      ctx.translate(bat.x, bat.y);
      ctx.rotate(bat.rotation);
      ctx.scale(bat.scale, bat.scale);
      ctx.globalAlpha = bat.opacity;

      const wingFlap = Math.sin(bat.wingPhase) * 0.3;

      // Red glow shadow
      ctx.shadowColor = '#dc2626';
      ctx.shadowBlur = 8;

      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(0, -2);
      // Left wing
      ctx.bezierCurveTo(-4, -4 + wingFlap * 10, -10, -8 + wingFlap * 15, -16, -6 + wingFlap * 20);
      ctx.bezierCurveTo(-12, -2, -8, 1, -5, 2);
      ctx.bezierCurveTo(-7, 0, -10, -1, -14, 2 + wingFlap * 5);
      ctx.bezierCurveTo(-10, 4, -6, 4, -3, 3);
      // Body bottom
      ctx.bezierCurveTo(-2, 5, -1, 7, 0, 8);
      ctx.bezierCurveTo(1, 7, 2, 5, 3, 3);
      // Right wing
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
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    const rect = parent?.getBoundingClientRect();
    canvas.width = rect?.width ?? window.innerWidth;
    canvas.height = rect?.height ?? window.innerHeight;

    const isMobile = window.innerWidth < 768;
    const batCount = isMobile ? 30 : 60;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Create bats starting from random positions, gathering to center then scattering
    const bats: Bat[] = Array.from({ length: batCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * 200;
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        targetX: cx + (Math.random() - 0.5) * 100,
        targetY: cy + (Math.random() - 0.5) * 100,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        scale: 1.0 + Math.random() * 1.0,
        speed: 2 + Math.random() * 3,
        opacity: 0.95 + Math.random() * 0.05,
        phase: 'gather' as const,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: 0.15 + Math.random() * 0.1,
      };
    });

    const scatterTime = duration * 0.4; // Scatter after 40% of duration
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;

      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isScattering = elapsed > scatterTime;

      for (const bat of bats) {
        bat.wingPhase += bat.wingSpeed;
        bat.rotation += bat.rotationSpeed;

        if (!isScattering) {
          // Gather phase - move toward center area
          const dx = bat.targetX - bat.x;
          const dy = bat.targetY - bat.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 2) {
            bat.x += (dx / dist) * bat.speed * 1.5;
            bat.y += (dy / dist) * bat.speed * 1.5;
          }
          bat.opacity = Math.min(1, bat.opacity + 0.02);
        } else {
          // Scatter phase - fly outward
          if (bat.phase === 'gather') {
            bat.phase = 'scatter';
            const angle = Math.random() * Math.PI * 2;
            bat.targetX = bat.x + Math.cos(angle) * (canvas.width + 200);
            bat.targetY = bat.y + Math.sin(angle) * (canvas.height + 200);
          }
          const dx = bat.targetX - bat.x;
          const dy = bat.targetY - bat.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          bat.x += (dx / dist) * bat.speed * 4;
          bat.y += (dy / dist) * bat.speed * 4;
          bat.scale += 0.01;

          const scatterProgress = (elapsed - scatterTime) / (duration - scatterTime);
          bat.opacity = Math.max(0, 1 - scatterProgress * 1.5);
        }

        drawBat(ctx, bat);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [duration, onComplete, drawBat]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[9999] pointer-events-none"
    />
  );
}

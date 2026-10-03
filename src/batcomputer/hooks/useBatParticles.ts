'use client';

import { useCallback, useRef } from 'react';

interface BatParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  scaleSpeed: number;
  opacity: number;
  life: number;
  maxLife: number;
}

function drawBat(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  rotation: number,
  opacity: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(scale, scale);
  ctx.globalAlpha = opacity;

  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath();
  // Bat silhouette path
  ctx.moveTo(0, -3);
  ctx.bezierCurveTo(-3, -3, -8, -8, -14, -10);
  ctx.bezierCurveTo(-10, -5, -8, -2, -6, 0);
  ctx.bezierCurveTo(-8, -1, -12, -2, -16, 0);
  ctx.bezierCurveTo(-12, 2, -8, 4, -4, 3);
  ctx.bezierCurveTo(-3, 5, -2, 7, 0, 8);
  ctx.bezierCurveTo(2, 7, 3, 5, 4, 3);
  ctx.bezierCurveTo(8, 4, 12, 2, 16, 0);
  ctx.bezierCurveTo(12, -2, 8, -1, 6, 0);
  ctx.bezierCurveTo(8, -2, 10, -5, 14, -10);
  ctx.bezierCurveTo(8, -8, 3, -3, 0, -3);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function useBatParticles() {
  const particlesRef = useRef<BatParticle[]>([]);
  const animFrameRef = useRef<number>(0);

  const spawnBats = useCallback(
    (
      canvas: HTMLCanvasElement,
      originX: number,
      originY: number,
      count: number,
      duration: number,
      outward = true
    ) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const particles: BatParticle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
        const speed = 3 + Math.random() * 5;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed * (outward ? 1 : -1),
          vy: Math.sin(angle) * speed * (outward ? 1 : -1),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          scale: 0.8 + Math.random() * 0.6,
          scaleSpeed: 0.005 + Math.random() * 0.01,
          opacity: 1,
          life: 0,
          maxLife: duration / 16, // frames at ~60fps
        });
      }

      particlesRef.current = particles;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        if (elapsed > duration) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particlesRef.current = [];
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particlesRef.current) {
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;
          p.scale += p.scaleSpeed;
          p.life++;
          p.opacity = Math.max(0, 1 - p.life / p.maxLife);

          if (p.opacity > 0) {
            drawBat(ctx, p.x, p.y, p.scale, p.rotation, p.opacity);
          }
        }

        animFrameRef.current = requestAnimationFrame(animate);
      };

      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    },
    []
  );

  const cleanup = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    particlesRef.current = [];
  }, []);

  return { spawnBats, cleanup };
}

'use client';

import { useEffect, useRef } from 'react';

interface GothamRainProps {
  isMuted: boolean;
}

interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  width: number;
  drift: number;
}

interface GlassDroplet {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

interface Splash {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
}

const DROP_COUNT_DESKTOP = 220;
const DROP_COUNT_MOBILE = 70;
const GLASS_DROPLET_COUNT = 12;
const MAX_SPLASHES = 15;

export default function GothamRain({ isMuted }: GothamRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let active = true;
    let animFrame: number;
    let lightningTimeout: ReturnType<typeof setTimeout>;

    const isMobile = window.innerWidth < 768;
    const dropCount = isMobile ? DROP_COUNT_MOBILE : DROP_COUNT_DESKTOP;

    // ── Initialize raindrops ──
    const drops: Raindrop[] = [];
    const initDrops = (w: number, h: number) => {
      drops.length = 0;
      for (let i = 0; i < dropCount; i++) {
        drops.push({
          x: Math.random() * w,
          y: Math.random() * h,
          speed: 8 + Math.random() * 10,
          length: 8 + Math.random() * 8,
          opacity: 0.5 + Math.random() * 0.2,
          width: 1.5 + Math.random() * 0.5,
          drift: (Math.random() - 0.3) * 2,
        });
      }
    };

    // ── Initialize glass droplets ──
    const glassDroplets: GlassDroplet[] = [];
    const initGlass = (w: number, h: number) => {
      glassDroplets.length = 0;
      for (let i = 0; i < GLASS_DROPLET_COUNT; i++) {
        glassDroplets.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: 3 + Math.random() * 3,
          opacity: 0.05 + Math.random() * 0.03,
        });
      }
    };

    // ── Splashes ──
    const splashes: Splash[] = [];

    // ── Sizing ──
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGlass(canvas.width, canvas.height);
    };
    resize();
    initDrops(canvas.width, canvas.height);
    window.addEventListener('resize', resize);

    // ── Animation loop ──
    const animate = () => {
      if (!active) return;
      const w = canvas.width;
      const h = canvas.height;
      const splashZone = h * 0.9;
      ctx.clearRect(0, 0, w, h);

      // Glass droplets (stationary)
      for (const d of glassDroplets) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(170, 195, 220, ${d.opacity})`;
        ctx.fill();
      }

      // Raindrops
      for (const drop of drops) {
        drop.y += drop.speed;
        drop.x += drop.drift;

        // Splash when entering bottom 10%
        if (drop.y > splashZone && drop.y - drop.speed <= splashZone && splashes.length < MAX_SPLASHES) {
          if (Math.random() < 0.15) {
            splashes.push({
              x: drop.x,
              y: drop.y,
              radius: 1,
              opacity: 0.4,
              maxRadius: 3 + Math.random() * 3,
            });
          }
        }

        if (drop.y > h) {
          drop.y = -drop.length;
          drop.x = Math.random() * w;
        }
        if (drop.x > w) drop.x = 0;
        if (drop.x < 0) drop.x = w;

        const endX = drop.x + drop.drift * 0.5;
        const endY = drop.y + drop.length;

        // Glow pass — wider, dimmer
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(180, 200, 220, 0.1)`;
        ctx.lineWidth = drop.width + 2;
        ctx.stroke();

        // Main drop — sharp
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(180, 200, 220, ${drop.opacity})`;
        ctx.lineWidth = drop.width;
        ctx.stroke();
      }

      // Splashes — expanding circles that fade
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.radius += 0.8;
        s.opacity -= 0.12;

        if (s.opacity <= 0 || s.radius >= s.maxRadius) {
          splashes.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180, 200, 220, ${s.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animFrame = requestAnimationFrame(animate);
    };
    animate();

    // ── Lightning system ──
    const triggerLightning = () => {
      if (!active) return;

      // Double flash: bright → normal → less bright → normal
      document.documentElement.style.filter = 'brightness(1.8)';
      setTimeout(() => {
        if (!active) return;
        document.documentElement.style.filter = '';
        setTimeout(() => {
          if (!active) return;
          document.documentElement.style.filter = 'brightness(1.4)';
          setTimeout(() => {
            if (!active) return;
            document.documentElement.style.filter = '';
          }, 50);
        }, 100);
      }, 80);

      // Thunder sound 1.5-2s after flash
      if (!isMutedRef.current) {
        const thunderDelay = 1500 + Math.random() * 500;
        setTimeout(() => {
          if (!active) return;
          try {
            const audioCtx = new AudioContext();
            const bufLen = audioCtx.sampleRate * 3;
            const buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < bufLen; i++) {
              data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.8));
            }
            const source = audioCtx.createBufferSource();
            source.buffer = buf;

            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 200;
            filter.Q.value = 1;

            const gain = audioCtx.createGain();
            gain.gain.value = 0.08;
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);

            source.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);
            source.start();

            setTimeout(() => audioCtx.close().catch(() => {}), 3500);
          } catch {
            // Audio unavailable
          }
        }, thunderDelay);
      }

      // Schedule next lightning
      scheduleLightning();
    };

    const scheduleLightning = () => {
      if (!active) return;
      const delay = 20_000 + Math.random() * 20_000;
      lightningTimeout = setTimeout(triggerLightning, delay);
    };

    scheduleLightning();

    // ── Cleanup ──
    return () => {
      active = false;
      cancelAnimationFrame(animFrame);
      clearTimeout(lightningTimeout);
      window.removeEventListener('resize', resize);
      document.documentElement.style.filter = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 35,
      }}
    />
  );
}

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import TextReveal from '@/batcomputer/components/ui/TextReveal';
import MagneticWrap from '@/batcomputer/components/ui/MagneticWrap';
import { sectionContainerVariants, sectionItemVariants } from '@/batcomputer/lib/animations';
import { site } from '@/content/site';

const CONNECTION_LINES = [
  'INITIATING SECURE CHANNEL...',
  'ENCRYPTION: AES-512 // STATUS: ACTIVE',
  'ROUTING THROUGH 7 PROXY NODES...',
  'SIGNAL INTEGRITY: 98.2%',
  'CONNECTION ESTABLISHED \u2014 AWAITING TRANSMISSION',
];

const PROCESSING_INDICES = new Set([0, 2]);

const CHANNELS = [
  { label: 'CHANNEL 01', name: 'GITHUB', href: site.github, Icon: Github, external: true },
  { label: 'CHANNEL 02', name: 'LINKEDIN', href: site.linkedin, Icon: Linkedin, external: true },
  { label: 'CHANNEL 03', name: 'EMAIL', href: `mailto:${site.email}`, Icon: Mail, external: false },
];

const EMAIL = site.email;

export default function Contact() {
  const [lineTexts, setLineTexts] = useState<string[]>([]);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [waveformVisible, setWaveformVisible] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const playBeep = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 880;
      const gain = ctx.createGain();
      gain.gain.value = 0.08;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
      setTimeout(() => ctx.close().catch(() => {}), 300);
    } catch {
      // Audio unavailable
    }
  }, []);

  const typeText = useCallback(
    (text: string, onUpdate: (t: string) => void, charDelay: number): Promise<void> =>
      new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
          i++;
          onUpdate(text.slice(0, i));
          if (i >= text.length) {
            clearInterval(interval);
            resolve();
          }
        }, charDelay);
      }),
    [],
  );

  // Master animation sequence
  useEffect(() => {
    if (reducedMotion) {
      setLineTexts([...CONNECTION_LINES]);
      setSequenceComplete(true);
      setCardsVisible(true);
      setWaveformVisible(true);
      setEmailText(EMAIL);
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const run = async () => {
      const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
      const charDelay = isMobile ? 20 : 25;

      await sleep(400);

      for (let i = 0; i < CONNECTION_LINES.length; i++) {
        if (cancelled) return;

        // Add empty slot for this line
        setLineTexts((prev) => [...prev, '']);

        if (PROCESSING_INDICES.has(i)) {
          // Type text before the "..."
          const base = CONNECTION_LINES[i].slice(0, -3);
          await typeText(base, (t) => {
            if (!cancelled) setLineTexts((prev) => { const n = [...prev]; n[i] = t; return n; });
          }, charDelay);
          if (cancelled) return;

          // Blink dots one at a time
          for (let d = 1; d <= 3; d++) {
            await sleep(150);
            if (cancelled) return;
            setLineTexts((prev) => { const n = [...prev]; n[i] = base + '.'.repeat(d); return n; });
          }
        } else {
          await typeText(CONNECTION_LINES[i], (t) => {
            if (!cancelled) setLineTexts((prev) => { const n = [...prev]; n[i] = t; return n; });
          }, charDelay);
        }

        if (cancelled) return;
        playBeep();
        await sleep(200);
      }

      if (cancelled) return;
      setSequenceComplete(true);

      await sleep(300);
      if (cancelled) return;
      setCardsVisible(true);

      await sleep(500);
      if (cancelled) return;
      setWaveformVisible(true);

      await sleep(200);
      if (cancelled) return;
      await typeText(EMAIL, (t) => { if (!cancelled) setEmailText(t); }, 30);
    };

    run();
    return () => { cancelled = true; };
  }, [reducedMotion, typeText, playBeep]);

  // Blinking cursor
  useEffect(() => {
    if (!sequenceComplete) return;
    const id = setInterval(() => setCursorOn((p) => !p), 530);
    return () => clearInterval(id);
  }, [sequenceComplete]);

  // Waveform canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !waveformVisible) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = 60;
    };
    resize();

    const waveY = (x: number, phase: number) =>
      30 +
      Math.sin(x * 0.03 + phase) * 10 +
      Math.sin(x * 0.015 + phase * 0.7) * 5 +
      Math.sin(x * 0.06 + phase * 1.3) * 3;

    if (reducedMotion) {
      const w = canvas.width;
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const y = waveY(x, 0);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      return;
    }

    let phase = 0;

    const draw = () => {
      const w = canvas.width;
      ctx.clearRect(0, 0, w, 60);

      // Glow pass
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.1)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const y = waveY(x, phase);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Main line
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const y = waveY(x, phase);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.03;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [waveformVisible, reducedMotion]);

  return (
    <motion.div
      variants={sectionContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center px-4 py-12"
    >
      {/* Header */}
      <motion.h2
        variants={sectionItemVariants}
        className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wider text-center mb-10 text-accent red-glow-text"
      >
        <TextReveal text="ESTABLISH CONTACT" delay={0.3} />
      </motion.h2>

      {/* Phase 1: Connection sequence */}
      <div className="w-full max-w-2xl mb-10">
        <div className="font-mono text-[11px] md:text-xs leading-loose space-y-0.5">
          {lineTexts.map((text, i) => {
            if (!text) return null;
            const isLast = i === CONNECTION_LINES.length - 1;
            return (
              <div
                key={i}
                style={{
                  color: isLast && sequenceComplete ? '#dc2626' : 'rgba(163, 163, 163, 0.7)',
                }}
              >
                <span style={{ color: 'rgba(220, 38, 38, 0.4)', marginRight: '8px' }}>{'>'}</span>
                {text}
                {isLast && sequenceComplete && (
                  <span style={{ opacity: cursorOn ? 1 : 0, color: '#dc2626', marginLeft: '2px' }}>_</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase 2: Channel cards */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12 w-full max-w-2xl md:justify-center">
        {CHANNELS.map((channel, i) => (
          <div
            key={channel.name}
            style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.4s ease-out ${i * 0.2}s, transform 0.4s ease-out ${i * 0.2}s`,
            }}
          >
            <MagneticWrap>
              <a
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="group block"
              >
                <div
                  className="relative w-full md:w-[180px] h-[200px] flex flex-col items-center justify-between py-5 px-4 transition-all duration-300 group-hover:border-accent/50"
                  style={{
                    backgroundColor: '#0a0a0a',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 30px rgba(220, 38, 38, 0.08), 0 0 20px rgba(220, 38, 38, 0.12)' }}
                  />

                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />

                  {/* Channel label */}
                  <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-text-secondary/60 uppercase">
                    {channel.label}
                  </span>

                  {/* Icon */}
                  <channel.Icon
                    size={48}
                    strokeWidth={1.2}
                    className="text-text-secondary group-hover:text-accent transition-colors duration-300"
                  />

                  {/* Name */}
                  <span className="font-heading text-sm md:text-base font-bold uppercase tracking-wider text-text-secondary group-hover:text-foreground transition-colors duration-300">
                    {channel.name}
                  </span>

                  {/* Status */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: '#22c55e',
                        boxShadow: '0 0 4px rgba(34, 197, 94, 0.6)',
                        animation: 'contact-pulse-dot 2s ease-in-out infinite',
                      }}
                    />
                    <span className="font-mono text-[8px] md:text-[9px] text-text-secondary/50 tracking-wider">
                      STATUS: ACTIVE
                    </span>
                  </div>
                </div>
              </a>
            </MagneticWrap>
          </div>
        ))}
      </div>

      {/* Phase 3: Waveform */}
      <div
        className="w-[95%] md:w-[80%] max-w-2xl mb-8"
        style={{ opacity: waveformVisible ? 1 : 0, transition: 'opacity 0.8s ease-out' }}
      >
        <canvas ref={canvasRef} className="w-full" style={{ height: '60px' }} />
        <p className="font-mono text-[9px] md:text-[10px] text-text-secondary/40 text-center mt-2 tracking-wider">
          SIGNAL ACTIVE // MONITORING FREQUENCY 142.8 MHz
        </p>
      </div>

      {/* Phase 4: Email */}
      <div style={{ opacity: emailText ? 1 : 0, transition: 'opacity 0.3s' }}>
        <a
          href={`mailto:${site.email}`}
          className="group font-mono text-xs text-text-secondary hover:text-accent transition-colors duration-200"
        >
          {emailText}
          <span className="block h-px w-0 group-hover:w-full bg-accent/50 transition-all duration-300 mt-0.5" />
        </a>
      </div>

      <style>{`
        @keyframes contact-pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </motion.div>
  );
}

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';

interface ScarecrowEffectProps {
  enabled: boolean;
  isMuted: boolean;
}

const IDLE_TIMEOUT = 10_000;
const GLITCH_CHARS = '!@#$%^&*<>{}[]|/\\~`±§¥£€';

export default function ScarecrowEffect({ enabled, isMuted }: ScarecrowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const savedTextsRef = useRef<{ el: Element; original: string }[]>([]);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const scrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isMutedRef = useRef(isMuted);
  const isPlayingRef = useRef(false);

  const [isActive, setIsActive] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  // Keep muted ref in sync
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Trigger function — just flips state, effect handles the rest
  const triggerEffect = useCallback(() => {
    if (isPlayingRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    isPlayingRef.current = true;
    setIsActive(true);
  }, []);

  // ── Idle timer ──
  useEffect(() => {
    if (!enabled) return;

    const resetTimer = () => {
      if (isPlayingRef.current) return;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(triggerEffect, IDLE_TIMEOUT);
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [enabled, triggerEffect]);

  // ── GSAP timeline — runs when isActive flips to true ──
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const flickerOverlay = container.querySelector('.scarecrow-flicker') as HTMLElement;
    const greenTint = container.querySelector('.scarecrow-green-tint') as HTMLElement;
    const tears = container.querySelectorAll('.scarecrow-tear') as NodeListOf<HTMLElement>;
    const blackout = container.querySelector('.scarecrow-blackout') as HTMLElement;
    const fearMsg = container.querySelector('.scarecrow-fear-msg') as HTMLElement;

    if (!flickerOverlay || !greenTint || !blackout || !fearMsg) return;

    // ── Audio: low-frequency hum via Web Audio API ──
    let audioCtx: AudioContext | null = null;
    let gainNode: GainNode | null = null;
    let noiseSource: AudioBufferSourceNode | null = null;

    if (!isMutedRef.current) {
      try {
        audioCtx = new AudioContext();
        audioCtxRef.current = audioCtx;

        const osc = audioCtx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = 55;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 150;
        filter.Q.value = 5;

        gainNode = audioCtx.createGain();
        gainNode.gain.value = 0;

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();

        // Fade hum in gently over 1s
        gainNode.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 1);
      } catch {
        // Audio unavailable — effect is purely visual
      }
    }

    // ── Helper: scramble visible text ──
    const scrambleTexts = () => {
      restoreTexts();
      const candidates = document.querySelectorAll('h2, h3, span, p, a, button');
      const visible: Element[] = [];
      candidates.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (
          rect.top >= 0 && rect.bottom <= window.innerHeight &&
          rect.width > 0 && rect.height > 0 &&
          el.textContent && el.textContent.trim().length > 2 &&
          el.children.length === 0
        ) {
          visible.push(el);
        }
      });
      const count = Math.min(visible.length, 2 + Math.floor(Math.random() * 2));
      const selected = [...visible].sort(() => Math.random() - 0.5).slice(0, count);
      selected.forEach(el => {
        const original = el.textContent || '';
        savedTextsRef.current.push({ el, original });
        el.textContent = original
          .split('')
          .map(c => (c === ' ' ? ' ' : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]))
          .join('');
      });
    };

    const restoreTexts = () => {
      savedTextsRef.current.forEach(({ el, original }) => {
        el.textContent = original;
      });
      savedTextsRef.current = [];
    };

    // ── Helper: inject/remove dynamic CSS ──
    const injectStyle = (css: string) => {
      if (styleRef.current) {
        styleRef.current.textContent = css;
      } else {
        const s = document.createElement('style');
        s.setAttribute('data-scarecrow', '');
        s.textContent = css;
        document.head.appendChild(s);
        styleRef.current = s;
      }
    };

    const removeStyle = () => {
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
    };

    // ── Helper: full cleanup ──
    const cleanupAll = () => {
      removeStyle();
      restoreTexts();
      document.documentElement.style.filter = '';
      document.documentElement.style.transform = '';
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
        scrambleIntervalRef.current = null;
      }
      tears.forEach(tear => {
        tear.style.opacity = '0';
        tear.style.transform = 'translateX(0)';
      });
      flickerOverlay.style.opacity = '0';
      greenTint.style.opacity = '0';
      blackout.style.opacity = '0';
      fearMsg.style.opacity = '0';
      if (audioCtx) {
        audioCtx.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };

    // ── Set tear positions ──
    const tearYs = ['12%', '33%', '56%', '79%'];
    const tearHs = ['4%', '3%', '5%', '3%'];
    tears.forEach((tear, i) => {
      tear.style.top = tearYs[i] || '50%';
      tear.style.height = tearHs[i] || '3%';
    });

    // ════════════════════════════════════════
    //  BUILD THE GSAP TIMELINE
    // ════════════════════════════════════════
    const tl = gsap.timeline({
      onComplete: () => {
        cleanupAll();
        isPlayingRef.current = false;
        setIsActive(false);
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 2500);
      },
    });
    timelineRef.current = tl;

    // ── STAGE 1: Subtle warning (0–1s) ──
    tl.to(flickerOverlay, { opacity: 0.05, duration: 0.08 }, 0.2);
    tl.to(flickerOverlay, { opacity: 0, duration: 0.08 }, 0.35);
    tl.to(flickerOverlay, { opacity: 0.05, duration: 0.08 }, 0.6);
    tl.to(flickerOverlay, { opacity: 0, duration: 0.08 }, 0.75);

    // ── STAGE 2: Building distortion (1–2.5s) ──

    // Screen tears — jump to new offsets every 200ms
    for (let t = 1.0; t < 2.5; t += 0.2) {
      tl.call(
        () => {
          tears.forEach(tear => {
            tear.style.transform = `translateX(${(Math.random() - 0.5) * 30}px)`;
            tear.style.opacity = '1';
          });
        },
        [],
        t,
      );
    }

    // Chromatic aberration via dynamic stylesheet
    tl.call(
      () =>
        injectStyle(`
        h1,h2,h3,h4,span,p,a,button,div {
          text-shadow: 2px 0 rgba(220,38,38,0.4), -2px 0 rgba(0,255,255,0.3) !important;
        }
      `),
      [],
      1.2,
    );

    // Text scramble bursts (100ms each)
    [1.3, 1.8, 2.2].forEach(t => {
      tl.call(() => scrambleTexts(), [], t);
      tl.call(() => restoreTexts(), [], t + 0.1);
    });

    // Intensify audio at 1.5s
    tl.call(() => {
      if (audioCtx && gainNode) {
        gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.5);

        // Add noise/static
        try {
          const bufLen = audioCtx.sampleRate * 2;
          const buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
          noiseSource = audioCtx.createBufferSource();
          noiseSource.buffer = buf;
          const ng = audioCtx.createGain();
          ng.gain.value = 0.02;
          ng.gain.linearRampToValueAtTime(0.07, audioCtx.currentTime + 1.5);
          noiseSource.connect(ng);
          ng.connect(audioCtx.destination);
          noiseSource.start();
        } catch {
          /* noop */
        }
      }
    }, [], 1.5);

    // Green toxic tint fades in
    tl.to(greenTint, { opacity: 0.05, duration: 0.5 }, 1.0);
    tl.to(greenTint, { opacity: 0.12, duration: 1.0 }, 1.5);

    // ── STAGE 3: Full distortion (2.5–3.5s) ──

    // Heavy screen tears
    for (let t = 2.5; t < 3.4; t += 0.1) {
      tl.call(
        () => {
          tears.forEach(tear => {
            tear.style.transform = `translateX(${(Math.random() - 0.5) * 80}px)`;
            tear.style.height = `${3 + Math.random() * 5}%`;
          });
        },
        [],
        t,
      );
    }

    // Stronger chromatic aberration
    tl.call(
      () =>
        injectStyle(`
        h1,h2,h3,h4,span,p,a,button,div {
          text-shadow: 4px 0 rgba(220,38,38,0.6), -4px 0 rgba(0,255,255,0.5) !important;
        }
      `),
      [],
      2.5,
    );

    // Color inversion flashes
    tl.call(() => { document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)'; }, [], 2.6);
    tl.call(() => { document.documentElement.style.filter = ''; }, [], 2.8);
    tl.call(() => { document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)'; }, [], 2.9);
    tl.call(() => { document.documentElement.style.filter = ''; }, [], 3.0);

    // Rapid text scramble
    tl.call(() => {
      scrambleIntervalRef.current = setInterval(() => {
        restoreTexts();
        scrambleTexts();
      }, 80);
    }, [], 2.5);

    // "FEAR IS A TOOL" flash
    tl.to(fearMsg, { opacity: 1, duration: 0.05 }, 2.8);
    tl.to(fearMsg, { opacity: 0, duration: 0.05 }, 3.1);

    // Screen shake (±3px at ~30ms intervals)
    for (let t = 2.7; t < 3.4; t += 0.03) {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      tl.call(() => { document.documentElement.style.transform = `translate(${x}px, ${y}px)`; }, [], t);
    }
    tl.call(() => { document.documentElement.style.transform = ''; }, [], 3.4);

    // ── STAGE 4: Snap back (3.5–4.5s) ──

    // Stop scramble, restore text
    tl.call(() => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
        scrambleIntervalRef.current = null;
      }
      restoreTexts();
    }, [], 3.4);

    // Kill tears + chromatic
    tl.call(() => {
      tears.forEach(tear => { tear.style.opacity = '0'; tear.style.transform = 'translateX(0)'; });
      removeStyle();
    }, [], 3.4);

    // Hard cut to black
    tl.to(blackout, { opacity: 1, duration: 0.01 }, 3.5);

    // Remove all root-level effects
    tl.call(() => {
      document.documentElement.style.filter = '';
      document.documentElement.style.transform = '';
    }, [], 3.5);

    // Snap back to normal
    tl.to(blackout, { opacity: 0, duration: 0.01 }, 3.7);
    tl.to(greenTint, { opacity: 0, duration: 0.05 }, 3.7);

    return () => {
      tl.kill();
      cleanupAll();
    };
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  // Unmount cleanup
  useEffect(() => {
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      if (styleRef.current) { styleRef.current.remove(); styleRef.current = null; }
      savedTextsRef.current.forEach(({ el, original }) => { el.textContent = original; });
      savedTextsRef.current = [];
      document.documentElement.style.filter = '';
      document.documentElement.style.transform = '';
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
      if (audioCtxRef.current) { audioCtxRef.current.close().catch(() => {}); }
    };
  }, []);

  if (!isActive && !showStatus) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100000,
      }}
    >
      {isActive && (
        <>
          {/* Flicker overlay — opacity animated by GSAP */}
          <div
            className="scarecrow-flicker"
            style={{ position: 'absolute', inset: 0, backgroundColor: '#000', opacity: 0 }}
          />

          {/* Green toxic tint — opacity animated by GSAP */}
          <div
            className="scarecrow-green-tint"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#00ff00',
              opacity: 0,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Screen tear slices */}
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="scarecrow-tear"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                opacity: 0,
                backgroundColor: i % 2 === 0
                  ? 'rgba(220, 38, 38, 0.08)'
                  : 'rgba(0, 255, 255, 0.06)',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            />
          ))}

          {/* "FEAR IS A TOOL" message — opacity animated by GSAP */}
          <div
            className="scarecrow-fear-msg"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
            }}
          >
            <div
              className="glitch-text font-heading"
              style={{
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                fontWeight: 'bold',
                color: '#00ff00',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                textShadow:
                  '0 0 30px rgba(0, 255, 0, 0.8), 0 0 60px rgba(0, 255, 0, 0.4), 0 0 100px rgba(0, 255, 0, 0.2)',
              }}
            >
              FEAR IS A TOOL
            </div>
          </div>

          {/* Blackout overlay — opacity animated by GSAP */}
          <div
            className="scarecrow-blackout"
            style={{ position: 'absolute', inset: 0, backgroundColor: '#000', opacity: 0 }}
          />
        </>
      )}

      {/* Status text after snap-back */}
      {showStatus && (
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'scarecrow-status-fade 2.5s ease-out forwards',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: '11px',
              color: '#dc2626',
              letterSpacing: '0.1em',
              textShadow: '0 0 10px rgba(220, 38, 38, 0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            {'>'} TOXIN NEUTRALIZED // SYSTEM RESTORED
          </span>
        </div>
      )}

      <style>{`
        @keyframes scarecrow-status-fade {
          0%, 60% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

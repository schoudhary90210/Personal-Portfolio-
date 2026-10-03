'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';

// ── Data ──
const HEADER_FIELDS = [
  { label: 'DESIGNATION', value: 'B.S. Computer Science & Mathematics' },
  { label: 'INSTITUTION', value: 'University of Wisconsin-Madison' },
  { label: 'GRADUATION', value: 'MAY 2028' },
  { label: 'STATUS', value: 'ACTIVE' },
];

const STAT_BARS = [
  { label: 'QUANTITATIVE ANALYSIS', value: 92 },
  { label: 'MACHINE LEARNING', value: 82 },
  { label: 'SYSTEMS ENGINEERING', value: 87 },
  { label: 'DATA INFRASTRUCTURE', value: 78 },
  { label: 'LOW-LEVEL PROGRAMMING', value: 84 },
];

const FOCUS_TAGS = ['QUANTITATIVE FINANCE', 'MACHINE LEARNING & AI'];

const BIO =
  'Computer Science and Mathematics student at UW-Madison, graduating May 2028. I build things at the intersection of quantitative finance, machine learning, and low-level systems. Currently a student researcher in the Stefely Lab at the Morgridge Institute for Research; previously at UNDP, MD Anderson Cancer Center, and Qatar Computing Research Institute.';

const SKILL_TICKER =
  'PYTHON // C // C++ // TYPESCRIPT // PYTORCH // NUMPY // PANDAS // DUCKDB // DOCKER // FASTAPI // POSTGRESQL // GOOGLE CLOUD // LINUX // GIT // ONNX RUNTIME // SCIKIT-LEARN // PYTEST // OLLAMA // CONCURRENCY';

export default function OperativeProfile() {
  const cardRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // ── Phase 1 state ──
  const [fileLabel, setFileLabel] = useState('');
  const [cardVisible, setCardVisible] = useState(false);

  // ── Phase 2 state ──
  const [operativeName, setOperativeName] = useState('');
  const [fieldTexts, setFieldTexts] = useState<string[]>(HEADER_FIELDS.map(() => ''));
  const [activeTypingLine, setActiveTypingLine] = useState(-1);

  // ── Phase 3 state ──
  const [statsVisible, setStatsVisible] = useState(false);
  const [barWidths, setBarWidths] = useState<number[]>(STAT_BARS.map(() => 0));
  const [barNumbers, setBarNumbers] = useState<number[]>(STAT_BARS.map(() => 0));

  // ── Phase 4 state ──
  const [tagsVisible, setTagsVisible] = useState(false);
  const [bioVisible, setBioVisible] = useState(false);

  // ── Phase 5 state ──
  const [stamp1Visible, setStamp1Visible] = useState(false);
  const [stamp2Visible, setStamp2Visible] = useState(false);

  // ── Phase 6 state ──
  const [tickerVisible, setTickerVisible] = useState(false);

  // ── Reduced motion check ──
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // ── Typing helper ──
  const typeText = useCallback(
    (text: string, onUpdate: (t: string) => void, charDelay: number): Promise<void> => {
      return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
          i++;
          onUpdate(text.slice(0, i));
          if (i >= text.length) {
            clearInterval(interval);
            resolve();
          }
        }, charDelay);
      });
    },
    [],
  );

  // ── Stamp thud sound ──
  const playStampSound = useCallback(() => {
    try {
      const ctx = new AudioContext();
      // Short low-frequency thump
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 80;
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);

      const gain = ctx.createGain();
      gain.gain.value = 0.3;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      // Add a noise burst for the "thud" texture
      const bufLen = ctx.sampleRate;
      const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.03));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.value = 300;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.15;
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();

      setTimeout(() => ctx.close().catch(() => {}), 500);
    } catch {
      // Audio unavailable
    }
  }, []);

  // ── Master animation sequence ──
  useEffect(() => {
    if (reducedMotion) {
      // Show everything immediately
      setCardVisible(true);
      setFileLabel('FILE LOADED');
      setOperativeName('OPERATIVE: SIDDHANT CHOUDHARY');
      setFieldTexts(HEADER_FIELDS.map(f => f.value));
      setActiveTypingLine(HEADER_FIELDS.length);
      setStatsVisible(true);
      setBarWidths(STAT_BARS.map(s => s.value));
      setBarNumbers(STAT_BARS.map(s => s.value));
      setTagsVisible(true);
      setBioVisible(true);
      setStamp1Visible(true);
      setStamp2Visible(true);
      setTickerVisible(true);
      return;
    }

    const card = cardRef.current;
    const scanLine = scanLineRef.current;
    if (!card || !scanLine) return;

    let cancelled = false;

    const runSequence = async () => {
      // ════════════════════════════════
      // PHASE 1: Scan effect (0-1.2s)
      // ════════════════════════════════

      // Type "ACCESSING FILE..."
      await typeText('ACCESSING FILE...', t => {
        if (!cancelled) setFileLabel(t);
      }, 40);

      if (cancelled) return;

      // Scan line sweep
      const scanTl = gsap.timeline();
      scanTl.fromTo(
        scanLine,
        { top: '0%', opacity: 1 },
        { top: '100%', duration: 1, ease: 'power1.inOut' },
      );

      // Card border fades in as scan passes
      setTimeout(() => {
        if (!cancelled) setCardVisible(true);
      }, 200);

      // Wait for scan to finish
      await new Promise<void>(resolve => {
        scanTl.eventCallback('onComplete', resolve);
      });

      if (cancelled) return;

      // Update label
      setFileLabel('FILE LOADED');

      // ════════════════════════════════
      // PHASE 2: Header info types (1.2-2.2s)
      // ════════════════════════════════

      // Type operative name
      setActiveTypingLine(0);
      await typeText('OPERATIVE: SIDDHANT CHOUDHARY', t => {
        if (!cancelled) setOperativeName(t);
      }, 30);

      if (cancelled) return;

      // Type each field
      for (let i = 0; i < HEADER_FIELDS.length; i++) {
        if (cancelled) return;
        setActiveTypingLine(i + 1);
        await typeText(HEADER_FIELDS[i].value, t => {
          if (!cancelled) {
            setFieldTexts(prev => {
              const next = [...prev];
              next[i] = t;
              return next;
            });
          }
        }, 30);
      }

      if (cancelled) return;
      setActiveTypingLine(-1);

      // ════════════════════════════════
      // PHASE 3: Stat bars (2.2-3.5s)
      // ════════════════════════════════

      // Brief pause
      await new Promise(r => setTimeout(r, 200));
      if (cancelled) return;

      setStatsVisible(true);

      // Fill bars one by one
      for (let i = 0; i < STAT_BARS.length; i++) {
        if (cancelled) return;
        const target = STAT_BARS[i].value;

        // Animate bar width and number counter
        const obj = { width: 0, num: 0 };
        await new Promise<void>(resolve => {
          gsap.to(obj, {
            width: target,
            num: target,
            duration: 0.4,
            ease: 'power2.out',
            onUpdate: () => {
              if (cancelled) return;
              setBarWidths(prev => {
                const next = [...prev];
                next[i] = obj.width;
                return next;
              });
              setBarNumbers(prev => {
                const next = [...prev];
                next[i] = Math.round(obj.num);
                return next;
              });
            },
            onComplete: resolve,
          });
        });

        // Stagger delay between bars
        if (i < STAT_BARS.length - 1) {
          await new Promise(r => setTimeout(r, 150));
        }
      }

      if (cancelled) return;

      // ════════════════════════════════
      // PHASE 4: Focus areas + bio (3.5-4.5s)
      // ════════════════════════════════

      await new Promise(r => setTimeout(r, 300));
      if (cancelled) return;
      setTagsVisible(true);

      await new Promise(r => setTimeout(r, 400));
      if (cancelled) return;
      setBioVisible(true);

      // ════════════════════════════════
      // PHASE 5: Classification stamps (4.5-5.5s)
      // ════════════════════════════════

      await new Promise(r => setTimeout(r, 500));
      if (cancelled) return;

      setStamp1Visible(true);
      playStampSound();

      // Animate stamp 1
      const stamp1 = card.querySelector('.stamp-1') as HTMLElement;
      if (stamp1) {
        gsap.fromTo(
          stamp1,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' },
        );
      }

      await new Promise(r => setTimeout(r, 300));
      if (cancelled) return;

      setStamp2Visible(true);
      playStampSound();

      const stamp2 = card.querySelector('.stamp-2') as HTMLElement;
      if (stamp2) {
        gsap.fromTo(
          stamp2,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.7, duration: 0.3, ease: 'back.out(1.7)' },
        );
      }

      // ════════════════════════════════
      // PHASE 6: Skill ticker (5s+)
      // ════════════════════════════════

      await new Promise(r => setTimeout(r, 400));
      if (cancelled) return;
      setTickerVisible(true);
    };

    runSequence();

    return () => {
      cancelled = true;
      if (timelineRef.current) timelineRef.current.kill();
      gsap.killTweensOf('*');
    };
  }, [reducedMotion, typeText, playStampSound]);

  // ── Stat bar rendering helper ──
  const renderStatBar = (label: string, width: number, displayNum: number, index: number) => {
    const filled = Math.round((width / 100) * 20);
    return (
      <div key={index} className="flex items-center gap-2 md:gap-3">
        <span className="text-text-secondary w-44 md:w-52 shrink-0 uppercase tracking-wider text-[9px] md:text-[10px] font-mono">
          {label}
        </span>
        <span className="font-mono text-[10px] md:text-xs" style={{ color: '#dc2626' }}>
          [{'█'.repeat(filled)}
          {'░'.repeat(20 - filled)}]
        </span>
        <span className="text-text-secondary text-[10px] md:text-xs font-mono w-8 text-right">
          {displayNum}%
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[700px] mx-auto">
        {/* ── File access label ── */}
        <div className="font-mono text-[10px] md:text-xs text-accent/60 mb-3 h-4">
          {fileLabel}
          {fileLabel && fileLabel !== 'FILE LOADED' && (
            <span className="typewriter-caret">&nbsp;</span>
          )}
        </div>

        {/* ── Main dossier card ── */}
        <div
          ref={cardRef}
          className="relative"
          style={{
            border: cardVisible ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid transparent',
            backgroundColor: '#080808',
            padding: 'clamp(20px, 4vw, 32px)',
            transition: 'border-color 0.5s ease-out',
            overflow: 'hidden',
          }}
        >
          {/* Corner brackets */}
          {cardVisible && (
            <>
              <div className="absolute -top-px -left-px w-5 h-5 border-t border-l border-accent/50" />
              <div className="absolute -top-px -right-px w-5 h-5 border-t border-r border-accent/50" />
              <div className="absolute -bottom-px -left-px w-5 h-5 border-b border-l border-accent/50" />
              <div className="absolute -bottom-px -right-px w-5 h-5 border-b border-r border-accent/50" />
            </>
          )}

          {/* ── Scan line ── */}
          <div
            ref={scanLineRef}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '2px',
              top: '0%',
              opacity: 0,
              backgroundColor: '#dc2626',
              boxShadow: '0 0 15px rgba(220, 38, 38, 0.6), 0 0 30px rgba(220, 38, 38, 0.3)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />

          {/* ════════════════════════════════
              PHASE 2: Header info
              ════════════════════════════════ */}
          <div style={{ opacity: cardVisible ? 1 : 0, transition: 'opacity 0.3s' }}>
            {/* Operative name */}
            <div className="font-heading text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-accent mb-4">
              {operativeName}
              {activeTypingLine === 0 && operativeName.length < 29 && (
                <span className="typewriter-caret">&nbsp;</span>
              )}
            </div>

            {/* Field lines */}
            <div className="flex flex-col gap-1.5 mb-6 border-t border-border/30 pt-4">
              {HEADER_FIELDS.map((field, i) => (
                <div key={field.label} className="flex gap-2 font-mono text-[11px] md:text-xs">
                  <span className="text-accent/50 w-28 md:w-36 shrink-0 uppercase tracking-wider">
                    {field.label}:
                  </span>
                  <span className="text-foreground">
                    {fieldTexts[i]}
                    {activeTypingLine === i + 1 && fieldTexts[i].length < field.value.length && (
                      <span className="typewriter-caret">&nbsp;</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════
              PHASE 3: Stat bars
              ════════════════════════════════ */}
          <div
            style={{
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s, transform 0.4s',
            }}
          >
            <div className="font-heading text-sm md:text-base font-bold uppercase tracking-widest text-accent mb-3 red-glow-text">
              CAPABILITY ASSESSMENT
            </div>
            <div className="flex flex-col gap-1.5 mb-6">
              {STAT_BARS.map((stat, i) =>
                renderStatBar(stat.label, barWidths[i], barNumbers[i], i),
              )}
            </div>
          </div>

          {/* ════════════════════════════════
              PHASE 4: Focus areas + bio
              ════════════════════════════════ */}
          <div
            style={{
              opacity: tagsVisible ? 1 : 0,
              transform: tagsVisible ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 0.4s, transform 0.4s',
            }}
          >
            <div className="flex flex-wrap gap-3 mb-5">
              {FOCUS_TAGS.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent border border-accent/40 px-3 py-1.5"
                  style={{
                    boxShadow: '0 0 8px rgba(220, 38, 38, 0.15)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              opacity: bioVisible ? 1 : 0,
              transform: bioVisible ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.5s, transform 0.5s',
            }}
          >
            <p className="font-mono text-[11px] md:text-xs text-text-secondary leading-relaxed">
              {BIO}
            </p>
          </div>

          {/* ════════════════════════════════
              PHASE 5: Classification stamps
              ════════════════════════════════ */}
          {stamp1Visible && (
            <div
              className="stamp-1 absolute"
              style={{
                top: '35%',
                right: '-8px',
                transform: 'rotate(-12deg) scale(0)',
                transformOrigin: 'center center',
                zIndex: 20,
              }}
            >
              <div
                className="font-heading text-sm md:text-base font-bold uppercase tracking-widest px-4 py-2"
                style={{
                  color: '#dc2626',
                  border: '2px solid #dc2626',
                  textShadow: '0 0 10px rgba(220, 38, 38, 0.5)',
                  boxShadow: '0 0 15px rgba(220, 38, 38, 0.2)',
                  backgroundColor: 'rgba(8, 8, 8, 0.9)',
                  whiteSpace: 'nowrap',
                }}
              >
                THREAT LEVEL: EXPERT
              </div>
            </div>
          )}

          {stamp2Visible && (
            <div
              className="stamp-2 absolute"
              style={{
                top: '50%',
                right: '15px',
                transform: 'rotate(8deg) scale(0)',
                transformOrigin: 'center center',
                opacity: 0,
                zIndex: 20,
              }}
            >
              <div
                className="font-heading text-xs md:text-sm font-bold uppercase tracking-widest px-3 py-1.5"
                style={{
                  color: '#dc2626',
                  border: '1.5px solid rgba(220, 38, 38, 0.7)',
                  textShadow: '0 0 8px rgba(220, 38, 38, 0.4)',
                  backgroundColor: 'rgba(8, 8, 8, 0.85)',
                  whiteSpace: 'nowrap',
                }}
              >
                CLEARANCE: LEVEL 5
              </div>
            </div>
          )}

          {/* ════════════════════════════════
              PHASE 6: Skill ticker
              ════════════════════════════════ */}
          <div
            style={{
              opacity: tickerVisible ? 1 : 0,
              transition: 'opacity 0.5s',
              marginTop: '24px',
              borderTop: '1px solid rgba(42, 42, 42, 0.5)',
              paddingTop: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              className="font-mono text-[9px] md:text-[10px] whitespace-nowrap"
              style={{
                color: 'rgba(163, 163, 163, 0.5)',
                animation: tickerVisible ? 'ticker-scroll 25s linear infinite' : 'none',
              }}
            >
              <span>{SKILL_TICKER}&nbsp;&nbsp;&nbsp;{SKILL_TICKER}&nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

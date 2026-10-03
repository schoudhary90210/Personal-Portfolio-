'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
  playSound: (id: 'gothamAmbient' | 'bootBeep') => void;
  fadeOutSound: (id: 'gothamAmbient', duration?: number) => void;
}

// ── Terminal lines for Phase 2 ──
const BOOT_LINES = [
  { text: 'WAYNE ENTERPRISES — APPLIED SCIENCES DIVISION', style: 'header' },
  { text: 'BATCOMPUTER v7.4.1 // BUILD 2026.03', style: 'header' },
  { text: '=============================================', style: 'dim' },
  { text: '[OK] CORE SYSTEMS INITIALIZED', style: 'ok' },
  { text: '[OK] MEMORY ALLOCATION: 128TB MAPPED', style: 'ok' },
  { text: '[OK] NEURAL NETWORK PROCESSOR: ONLINE', style: 'ok' },
  { text: '[OK] GCPD DATABASE: CONNECTED', style: 'ok' },
  { text: '[OK] ORACLE NETWORK: SYNCED', style: 'ok' },
  { text: '[OK] WAYNE SATELLITE UPLINK: ACTIVE', style: 'ok' },
  { text: '[OK] BIOMETRIC SCAN: AUTHORIZED', style: 'ok' },
  { text: '[OK] ENCRYPTION MODULE: AES-512 ACTIVE', style: 'ok' },
  { text: '[  ] LOADING OPERATIVE DATABASE...', style: 'pending' },
];

const BOOT_LINES_MOBILE = [
  { text: 'WAYNE ENTERPRISES — APPLIED SCIENCES', style: 'header' },
  { text: 'BATCOMPUTER v7.4.1', style: 'header' },
  { text: '====================================', style: 'dim' },
  { text: '[OK] CORE SYSTEMS INITIALIZED', style: 'ok' },
  { text: '[OK] MEMORY: 128TB MAPPED', style: 'ok' },
  { text: '[OK] NEURAL PROCESSOR: ONLINE', style: 'ok' },
  { text: '[OK] ORACLE NETWORK: SYNCED', style: 'ok' },
  { text: '[OK] BIOMETRIC SCAN: AUTHORIZED', style: 'ok' },
  { text: '[OK] ENCRYPTION: AES-512 ACTIVE', style: 'ok' },
  { text: '[  ] LOADING OPERATIVE DATABASE...', style: 'pending' },
];

// ── Hex data for Phase 3 ──
function generateHexLine(): string {
  const segments: string[] = [];
  for (let i = 0; i < 12; i++) {
    segments.push('0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0'));
  }
  return segments.join(' ');
}

// ── Progress bar labels ──
const PROGRESS_BARS = [
  'THREAT ANALYSIS ENGINE',
  'EVIDENCE PROCESSOR',
  'FIELD OPERATIVE RECORDS',
];

type Phase = 'title' | 'flicker' | 'terminal' | 'hex' | 'progress' | 'symbol' | 'granted' | 'fadeout' | 'done';

export default function BootSequence({ onComplete, playSound, fadeOutSound }: BootSequenceProps) {
  const [phase, setPhase] = useState<Phase>('title');
  const [flickerOpacity, setFlickerOpacity] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [titleGlitchOut, setTitleGlitchOut] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(false);
  const [hexLines, setHexLines] = useState<string[]>([]);
  const [progressValues, setProgressValues] = useState([0, 0, 0]);
  const [batDrawProgress, setBatDrawProgress] = useState(0);
  const [showGranted, setShowGranted] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  }, []);

  // Detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const lines = isMobile ? BOOT_LINES_MOBILE : BOOT_LINES;
  const lineDelay = isMobile ? 30 : 40;
  const totalLineTime = lines.length * lineDelay;

  // ── Master timeline ──
  useEffect(() => {
    playSound('gothamAmbient');

    const P0 = 0; // Phase 0 offset

    // ── Phase 0: Title card "SIDDHANT ENTERPRISES" (0–1.2s) ──
    // Glitch flicker in
    addTimer(() => setTitleVisible(true), P0 + 100);
    addTimer(() => setTitleVisible(false), P0 + 150);
    addTimer(() => setTitleVisible(true), P0 + 220);
    addTimer(() => setTitleVisible(false), P0 + 260);
    addTimer(() => setTitleVisible(true), P0 + 350);
    // Hold title visible
    // Glitch out at ~1.0s
    addTimer(() => setTitleGlitchOut(true), P0 + 1000);
    addTimer(() => {
      setTitleVisible(false);
      setPhase('flicker');
    }, P0 + 1200);

    const P1 = 1200; // Phase 1 offset (everything shifts by 1.2s)

    // ── Phase 1: CRT Flicker (P1 – P1+0.5s) ──
    const flickerTimings = [50, 120, 200, 300, 420];
    flickerTimings.forEach((t, i) => {
      addTimer(() => setFlickerOpacity(i % 2 === 0 ? 0.6 : 0), P1 + t);
    });
    addTimer(() => {
      setFlickerOpacity(1);
      setShowCursor(true);
    }, P1 + 500);

    // ── Phase 2: Terminal scroll (P1+0.6s – ~P1+2.0s) ──
    addTimer(() => {
      setPhase('terminal');
      playSound('bootBeep');
    }, P1 + 600);

    // Stagger each line
    lines.forEach((_, i) => {
      addTimer(() => {
        setVisibleLines(i + 1);
        // Auto-scroll to bottom
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, P1 + 600 + i * lineDelay);
    });

    const phase2End = P1 + 600 + totalLineTime + 300;

    // ── Phase 3: Hex stream + progress ──
    addTimer(() => {
      setPhase('hex');
      setHexLines([generateHexLine(), generateHexLine()]);
    }, phase2End);

    // Cycle hex lines a few times
    for (let i = 1; i <= 4; i++) {
      addTimer(() => {
        setHexLines([generateHexLine(), generateHexLine()]);
      }, phase2End + i * 80);
    }

    // Progress bars
    const progressStart = phase2End + 400;
    addTimer(() => {
      setPhase('progress');
      playSound('bootBeep');
    }, progressStart);

    PROGRESS_BARS.forEach((_, i) => {
      addTimer(() => {
        setProgressValues(prev => {
          const next = [...prev];
          next[i] = 100;
          return next;
        });
      }, progressStart + i * 250);
    });

    // ── Phase 4: Bat symbol ──
    const symbolStart = progressStart + 900;
    addTimer(() => {
      setPhase('symbol');
    }, symbolStart);

    // Animate bat draw over 800ms
    const drawSteps = 20;
    for (let i = 1; i <= drawSteps; i++) {
      addTimer(() => {
        setBatDrawProgress(i / drawSteps);
      }, symbolStart + (i * 800) / drawSteps);
    }

    // ACCESS GRANTED
    addTimer(() => {
      setShowGranted(true);
      setScreenFlash(true);
    }, symbolStart + 850);

    addTimer(() => setScreenFlash(false), symbolStart + 950);

    // ── Phase 5: Fade out ──
    addTimer(() => {
      setFadeOut(true);
      fadeOutSound('gothamAmbient', 800);
    }, symbolStart + 1200);

    addTimer(() => {
      setPhase('done');
      onComplete();
    }, symbolStart + 1700);

    return () => timersRef.current.forEach(clearTimeout);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'done') return null;

  const lineColor = (style: string) => {
    switch (style) {
      case 'header': return '#dc2626';
      case 'ok': return '#dc2626';
      case 'dim': return '#555';
      case 'pending': return '#a3a3a3';
      default: return '#a3a3a3';
    }
  };

  const batPath = 'M250 140 C240 120 230 110 220 110 C215 110 210 115 205 125 C195 105 175 90 155 90 C135 90 125 100 120 115 C112 108 100 100 85 100 L50 115 C65 125 80 140 90 155 C75 150 55 155 40 170 C60 165 85 168 105 185 C90 200 80 210 75 225 L105 200 C115 215 130 230 150 240 C160 230 170 225 175 220 C190 230 200 240 215 250 L250 230 L285 250 C300 240 310 230 325 220 C330 225 340 230 350 240 C370 230 385 215 395 200 L425 225 C420 210 410 200 395 185 C415 168 440 165 460 170 C445 155 425 150 410 155 C420 140 435 125 450 115 L415 100 C400 100 388 108 380 115 C375 100 365 90 345 90 C325 90 305 105 295 125 C290 115 285 110 280 110 C270 110 260 120 250 140 Z';
  const batPathLength = 1800;

  return (
    <div
      className="absolute inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-auto"
      style={{
        backgroundColor: '#050505',
        opacity: fadeOut ? 0 : phase === 'title' ? 1 : flickerOpacity,
        transition: fadeOut ? 'opacity 0.5s ease-out' : 'opacity 0.05s',
      }}
    >
      {/* Screen flash */}
      {screenFlash && (
        <div className="absolute inset-0 bg-white/10" />
      )}

      {/* ── Phase 0: Title card ── */}
      {phase === 'title' && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: titleVisible ? 1 : 0,
            transition: titleGlitchOut ? 'opacity 0.15s ease-out' : 'none',
          }}
        >
          <div
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.15em] text-center"
            style={{
              color: '#dc2626',
              textShadow: '0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.4), 0 0 100px rgba(220, 38, 38, 0.2)',
              filter: titleGlitchOut ? 'blur(2px)' : 'none',
              transform: titleGlitchOut ? 'scaleY(1.1) translateX(-2px)' : 'none',
            }}
          >
            SIDDHANT ENTERPRISES
          </div>
        </div>
      )}

      {/* ── Terminal content area ── */}
      <div
        ref={scrollRef}
        className="w-full max-w-2xl px-6 md:px-8 overflow-hidden"
        style={{
          maxHeight: '80%',
          opacity: phase === 'title' ? 0 : phase === 'symbol' || phase === 'granted' || phase === 'fadeout' ? 0.08 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        {/* Blinking cursor (Phase 1) */}
        {phase === 'flicker' && showCursor && (
          <div className="font-mono text-xs text-accent">
            <span className="typewriter-caret">&nbsp;</span>
          </div>
        )}

        {/* Terminal lines (Phase 2+) */}
        {phase !== 'flicker' && (
          <div className="font-mono text-[11px] md:text-xs leading-relaxed">
            {lines.slice(0, visibleLines).map((line, i) => (
              <div key={i} style={{ color: lineColor(line.style) }}>
                {line.style === 'ok' && (
                  <span style={{ color: '#dc2626' }}>[OK]</span>
                )}
                {line.style === 'ok' ? line.text.replace('[OK]', '') : line.text}
              </div>
            ))}

            {/* Cursor at end of terminal lines */}
            {visibleLines === lines.length && phase === 'terminal' && (
              <span className="typewriter-caret">&nbsp;</span>
            )}
          </div>
        )}

        {/* Hex data stream (Phase 3) */}
        {(phase === 'hex' || phase === 'progress') && hexLines.length > 0 && (
          <div className="font-mono text-[9px] md:text-[10px] mt-3 leading-relaxed" style={{ color: '#333' }}>
            {hexLines.map((hex, i) => (
              <div key={i}>{hex}</div>
            ))}
          </div>
        )}

        {/* Progress bars (Phase 3) */}
        {(phase === 'progress' || phase === 'symbol' || phase === 'granted') && (
          <div className="font-mono text-[10px] md:text-xs mt-4 space-y-1.5">
            {PROGRESS_BARS.map((label, i) => {
              const filled = Math.round((progressValues[i] / 100) * 20);
              return (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-text-secondary w-48 uppercase tracking-wider text-[9px] md:text-[10px] shrink-0">
                    {label}
                  </span>
                  <span style={{ color: '#dc2626' }}>
                    [{'█'.repeat(filled)}{'░'.repeat(20 - filled)}]
                  </span>
                  <span className="text-text-secondary text-[9px] md:text-[10px] w-8 text-right">
                    {progressValues[i]}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Bat symbol SVG stroke animation (Phase 4) ── */}
      {(phase === 'symbol' || phase === 'granted' || phase === 'fadeout') && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 0.4s ease-out',
          }}
        >
          <svg
            viewBox="0 0 500 350"
            className="w-[160px] md:w-[220px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={batPath}
              fill="none"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: batPathLength,
                strokeDashoffset: batPathLength * (1 - batDrawProgress),
                filter: 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))',
              }}
            />
            {/* Fill fades in after stroke completes */}
            <path
              d={batPath}
              fill="#dc2626"
              stroke="none"
              style={{
                opacity: batDrawProgress >= 1 ? 0.3 : 0,
                transition: 'opacity 0.3s ease-in',
              }}
            />
          </svg>

          {/* ACCESS GRANTED */}
          {showGranted && (
            <div
              className="mt-6 font-heading text-lg md:text-2xl font-bold uppercase tracking-[0.3em] text-accent"
              style={{
                textShadow: '0 0 20px rgba(220, 38, 38, 0.6), 0 0 40px rgba(220, 38, 38, 0.3)',
              }}
            >
              ACCESS GRANTED
            </div>
          )}
        </div>
      )}
    </div>
  );
}

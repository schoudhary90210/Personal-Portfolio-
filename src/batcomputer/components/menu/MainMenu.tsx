'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MENU_ITEMS, type SectionId } from '@/batcomputer/lib/constants';
import { menuContainerVariants, menuItemVariants } from '@/batcomputer/lib/animations';

const GLITCH_CHARS = '!@#$%^&*<>{}[]';

interface MainMenuProps {
  onSelect: (id: SectionId, e: React.MouseEvent) => void;
  onHover: () => void;
}

// ── Per-item glitchy text with random character flicker ──
function GlitchyLabel({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let active = true;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const addTimeout = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timeouts.push(t);
      return t;
    };

    const scheduleFlicker = () => {
      if (!active) return;
      const delay = 3000 + Math.random() * 2000;
      addTimeout(() => {
        if (!active) return;
        const chars = text.split('');
        const swapCount = 1 + Math.floor(Math.random() * 2);
        for (let s = 0; s < swapCount; s++) {
          const idx = Math.floor(Math.random() * chars.length);
          if (chars[idx] !== ' ') {
            chars[idx] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
        }
        setDisplayText(chars.join(''));

        addTimeout(() => {
          if (!active) return;
          setDisplayText(text);
          scheduleFlicker();
        }, 80 + Math.random() * 20);
      }, delay);
    };

    scheduleFlicker();

    return () => {
      active = false;
      timeouts.forEach(clearTimeout);
    };
  }, [text]);

  return <>{displayText}</>;
}

export default function MainMenu({ onSelect, onHover }: MainMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [chromaticOffset, setChromaticOffset] = useState({ r: 2, c: -2 });
  const [tornItemIndex, setTornItemIndex] = useState<number | null>(null);
  const chromaticIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Horizontal glitch tear: one random item shifts left briefly every 8-12s ──
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let active = true;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const addTimeout = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timeouts.push(t);
      return t;
    };

    const scheduleTear = () => {
      if (!active) return;
      const delay = 8000 + Math.random() * 4000;
      addTimeout(() => {
        if (!active) return;
        const idx = Math.floor(Math.random() * MENU_ITEMS.length);
        setTornItemIndex(idx);
        addTimeout(() => {
          if (!active) return;
          setTornItemIndex(null);
          scheduleTear();
        }, 50);
      }, delay);
    };

    scheduleTear();

    return () => {
      active = false;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // ── Chromatic aberration jitter while hovering ──
  useEffect(() => {
    if (hoveredIndex === null) {
      if (chromaticIntervalRef.current) {
        clearInterval(chromaticIntervalRef.current);
        chromaticIntervalRef.current = null;
      }
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    chromaticIntervalRef.current = setInterval(() => {
      setChromaticOffset({
        r: 1 + Math.random() * 2,
        c: -(1 + Math.random() * 2),
      });
    }, 100);

    return () => {
      if (chromaticIntervalRef.current) {
        clearInterval(chromaticIntervalRef.current);
        chromaticIntervalRef.current = null;
      }
    };
  }, [hoveredIndex]);

  return (
    <div className="relative flex flex-col items-center gap-1 md:gap-2">
      {/* Red radial glow behind menu */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(185, 28, 28, 0.2) 0%, transparent 55%)',
        }}
      />

      {/* Photosensitivity warning */}
      <p
        className="relative z-10 font-mono text-[10px] md:text-[11px] select-none pointer-events-none"
        style={{ color: 'rgba(255, 255, 255, 0.25)', marginBottom: '15px' }}
      >
        ⚠ THIS SITE CONTAINS FLASHING EFFECTS
      </p>

      {/* Batman emblem */}
      <img
        src="/images/batman-logo.png"
        alt=""
        className="relative z-10 w-[140px] md:w-[230px]"
        style={{
          height: 'auto',
          opacity: 0.9,
          filter: 'brightness(0.3) sepia(1) hue-rotate(-30deg) saturate(4)',
          mixBlendMode: 'lighten',
          marginBottom: '15px',
          pointerEvents: 'none',
        }}
      />

      <motion.nav
        variants={menuContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-1 md:gap-2"
      >
        {MENU_ITEMS.map((item, index) => (
          <motion.button
            key={item.id}
            variants={menuItemVariants}
            onClick={(e) => onSelect(item.id, e)}
            onMouseEnter={() => {
              onHover();
              setHoveredIndex(index);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{
              scale: 1.08,
              y: -4,
              transition: { duration: 0.15, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-8 py-2 md:py-3"
          >
            {/* Hover background glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded"
              style={{
                boxShadow: '0 0 40px rgba(220, 38, 38, 0.5), 0 0 80px rgba(220, 38, 38, 0.25), 0 0 120px rgba(185, 28, 28, 0.15)',
              }}
            />

            <span
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.08em] text-accent transition-colors duration-200 inline-block group-hover:text-[#ef4444]"
              style={{
                textShadow: hoveredIndex === index
                  ? `${chromaticOffset.r}px 0 rgba(220, 38, 38, 0.7), ${chromaticOffset.c}px 0 rgba(14, 165, 233, 0.5), 0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(220, 38, 38, 0.4), 0 0 80px rgba(185, 28, 28, 0.3)`
                  : '0 0 0px transparent',
                transform: tornItemIndex === index ? 'translateX(-4px)' : undefined,
              }}
            >
              <GlitchyLabel text={item.label} />
            </span>

            {/* Underline accent */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-4/5 bg-accent transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.6)]" />
          </motion.button>
        ))}
      </motion.nav>
    </div>
  );
}

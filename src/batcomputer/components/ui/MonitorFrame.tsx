'use client';

import { ReactNode } from 'react';

interface MonitorFrameProps {
  children: ReactNode;
  overlays?: ReactNode;
}

export default function MonitorFrame({ children, overlays }: MonitorFrameProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030303' }}>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 1: SCROLLABLE CONTENT
          Normal page flow. Centered column with padding matching bezels.
          Scrolls with the browser's native scroll.
          ═══════════════════════════════════════════════════════════ */}
      <div
        className="monitor-content"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '68vw',
          margin: '0 auto',
          paddingTop: '50px',
          paddingBottom: '60px',
          minHeight: '100vh',
          backgroundColor: '#050505',
        }}
      >
        {children}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 2: FIXED MONITOR BEZEL OVERLAY
          Visual-only frame that sits on top of the viewport.
          All pointer-events: none so scrolling/clicking passes through.
          ═══════════════════════════════════════════════════════════ */}

      {/* Ambient screen glow — behind everything */}
      <div
        className="monitor-ambient-glow"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 2,
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(220, 38, 38, 0.07) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />

      {/* ─── TOP BEZEL ─── */}
      <div
        className="monitor-bezel-top"
        style={{
          position: 'fixed',
          top: 0,
          left: 'calc((100vw - 68vw) / 2)',
          width: '68vw',
          height: '45px',
          background: `linear-gradient(170deg, #3a3a3a 0%, #2e2e2e 2%, #222 8%, #1c1c1c 20%, #191919 50%, #141414 80%, #0e0e0e 95%, #0a0a0a 100%)`,
          zIndex: 50,
          pointerEvents: 'none',
          borderRadius: '6px 6px 0 0',
          boxShadow: `
            0 -5px 30px rgba(0,0,0,0.9),
            inset 0 1px 0 rgba(255,255,255,0.18),
            inset 0 2px 1px rgba(255,255,255,0.06),
            inset 0 -2px 0 rgba(0,0,0,0.5)
          `,
        }}
      >
        {/* Brushed metal texture */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '6px 6px 0 0',
          background: `repeating-linear-gradient(92deg, transparent, transparent 1px, rgba(255,255,255,0.015) 1px, rgba(255,255,255,0.015) 2px)`,
        }} />
        {/* Top screws */}
        <div className="monitor-screw" style={{ position: 'absolute', top: '14px', left: '14px' }} />
        <div className="monitor-screw" style={{ position: 'absolute', top: '14px', right: '14px' }} />
      </div>

      {/* ─── BOTTOM BEZEL ─── */}
      <div
        className="monitor-bezel-bottom"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 'calc((100vw - 68vw) / 2)',
          width: '68vw',
          height: '55px',
          background: `linear-gradient(170deg, #3a3a3a 0%, #2e2e2e 2%, #222 8%, #1c1c1c 20%, #191919 50%, #141414 80%, #0e0e0e 95%, #0a0a0a 100%)`,
          zIndex: 50,
          pointerEvents: 'none',
          borderRadius: '0 0 6px 6px',
          boxShadow: `
            0 5px 30px rgba(0,0,0,0.9),
            inset 0 1px 0 rgba(255,255,255,0.06),
            inset 0 -2px 0 rgba(0,0,0,0.7)
          `,
        }}
      >
        {/* Brushed metal texture */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '0 0 6px 6px',
          background: `repeating-linear-gradient(92deg, transparent, transparent 1px, rgba(255,255,255,0.015) 1px, rgba(255,255,255,0.015) 2px)`,
        }} />
        {/* Bottom screws */}
        <div className="monitor-screw" style={{ position: 'absolute', bottom: '16px', left: '14px' }} />
        <div className="monitor-screw" style={{ position: 'absolute', bottom: '16px', right: '14px' }} />
        {/* WAYNE TECH brand label */}
        <div
          className="monitor-brand"
          style={{
            position: 'absolute',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <span
            className="font-heading text-[10px] uppercase tracking-[0.35em]"
            style={{
              color: '#333',
              textShadow: '0 1px 0 rgba(255,255,255,0.06), 0 -1px 0 rgba(0,0,0,0.6)',
            }}
          >
            WAYNE TECH
          </span>
        </div>
        {/* LED indicator */}
        <div
          className="monitor-led"
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '40px',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#dc2626',
            boxShadow: '0 0 4px rgba(220, 38, 38, 0.8), 0 0 8px rgba(220, 38, 38, 0.4)',
          }}
        />
      </div>

      {/* ─── LEFT BEZEL ─── */}
      <div className="monitor-bezel-side monitor-bezel-left" style={{
        position: 'fixed',
        top: 0,
        left: 'calc((100vw - 68vw) / 2)',
        width: '40px',
        height: '100vh',
        background: `linear-gradient(90deg, #2a2a2a 0%, #1a1a1a 30%, #141414 100%)`,
        zIndex: 49,
        pointerEvents: 'none',
        boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1), inset -2px 0 4px rgba(0,0,0,0.6)',
      }} />

      {/* ─── RIGHT BEZEL ─── */}
      <div className="monitor-bezel-side monitor-bezel-right" style={{
        position: 'fixed',
        top: 0,
        right: 'calc((100vw - 68vw) / 2)',
        width: '40px',
        height: '100vh',
        background: `linear-gradient(270deg, #2a2a2a 0%, #1a1a1a 30%, #141414 100%)`,
        zIndex: 49,
        pointerEvents: 'none',
        boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.1), inset 2px 0 4px rgba(0,0,0,0.6)',
      }} />

      {/* ─── INNER RECESS shadow (all 4 sides) ─── */}
      <div className="monitor-inner-recess" style={{
        position: 'fixed',
        top: '45px',
        left: 'calc((100vw - 68vw) / 2 + 40px)',
        right: 'calc((100vw - 68vw) / 2 + 40px)',
        bottom: '55px',
        pointerEvents: 'none',
        zIndex: 51,
        borderRadius: '2px',
        boxShadow: `
          inset 4px 4px 10px rgba(0,0,0,0.85),
          inset 2px 2px 4px rgba(0,0,0,0.7),
          inset -2px -2px 6px rgba(255,255,255,0.03),
          0 0 0 1px rgba(0,0,0,0.8),
          0 0 0 2px rgba(255,255,255,0.04)
        `,
      }} />

      {/* ═══════════════════════════════════════════════════════════
          LAYER 3: CRT SCREEN EFFECTS — fixed overlays
          Scan lines, vignette, glass reflection, carbon fiber
          ═══════════════════════════════════════════════════════════ */}
      <div className="monitor-screen-area" style={{
        position: 'fixed',
        top: '45px',
        left: 'calc((100vw - 68vw) / 2 + 40px)',
        right: 'calc((100vw - 68vw) / 2 + 40px)',
        bottom: '55px',
        pointerEvents: 'none',
        zIndex: 40,
      }}>
        {/* Carbon fiber background + red gradient */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `
            radial-gradient(ellipse at 50% 0%, rgba(127, 29, 29, 0.12) 0%, transparent 60%),
            repeating-conic-gradient(rgba(255, 255, 255, 0.04) 0% 25%, transparent 0% 50%)
          `,
          backgroundSize: '100% 100%, 8px 8px',
        }} />
        {/* CRT convex vignette */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          boxShadow: `
            inset 0 0 120px rgba(0,0,0,0.6),
            inset 0 0 250px rgba(0,0,0,0.3),
            inset 0 0 50px rgba(0,0,0,0.5)
          `,
        }} />
        {/* CRT glass reflection */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: `linear-gradient(
            135deg,
            transparent 0%, transparent 28%,
            rgba(255,255,255,0.025) 38%,
            rgba(255,255,255,0.045) 41%,
            rgba(255,255,255,0.025) 44%,
            transparent 54%, transparent 100%
          )`,
        }} />
        {/* Scan lines */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: `repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px
          )`,
        }} />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 4: INTERACTIVE OVERLAYS (boot, bats, HUD, back button)
          Fixed to screen area. pointer-events: none on wrapper,
          individual interactive elements use pointer-events: auto.
          ═══════════════════════════════════════════════════════════ */}
      {overlays && (
        <div className="monitor-screen-area" style={{
          position: 'fixed',
          top: '45px',
          left: 'calc((100vw - 68vw) / 2 + 40px)',
          right: 'calc((100vw - 68vw) / 2 + 40px)',
          bottom: '55px',
          pointerEvents: 'none',
          zIndex: 60,
        }}>
          {overlays}
        </div>
      )}

      {/* ─── BATCAVE DARKNESS — covers areas outside monitor ─── */}
      {/* Left darkness */}
      <div className="monitor-cave-dark monitor-cave-left" style={{
        position: 'fixed', top: 0, left: 0,
        width: 'calc((100vw - 68vw) / 2)',
        height: '100vh',
        backgroundColor: '#030303',
        zIndex: 48,
        pointerEvents: 'none',
      }} />
      {/* Right darkness */}
      <div className="monitor-cave-dark monitor-cave-right" style={{
        position: 'fixed', top: 0, right: 0,
        width: 'calc((100vw - 68vw) / 2)',
        height: '100vh',
        backgroundColor: '#030303',
        zIndex: 48,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

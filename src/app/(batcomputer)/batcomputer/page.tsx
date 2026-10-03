'use client';

import { useState, useCallback, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import MonitorFrame from '@/batcomputer/components/ui/MonitorFrame';
import BootSequence from '@/batcomputer/components/boot/BootSequence';
import PanelTransition from '@/batcomputer/components/effects/PanelTransition';
import MainMenu from '@/batcomputer/components/menu/MainMenu';
import BackButton from '@/batcomputer/components/ui/BackButton';
import MuteToggle from '@/batcomputer/components/ui/MuteToggle';
import HUDOverlay from '@/batcomputer/components/ui/HUDOverlay';
import { useAudio } from '@/batcomputer/hooks/useAudio';
import type { SectionId } from '@/batcomputer/lib/constants';

// Canvas/window-dependent components — client-only to prevent hydration mismatch
const BatSwarm = dynamic(() => import('@/batcomputer/components/effects/BatSwarm'), { ssr: false });
const BatScatter = dynamic(() => import('@/batcomputer/components/effects/BatScatter'), { ssr: false });
const GothamRain = dynamic(() => import('@/batcomputer/components/effects/GothamRain'), { ssr: false });
const CursorGlow = dynamic(() => import('@/batcomputer/components/effects/CursorGlow'), { ssr: false });
const ScarecrowEffect = dynamic(() => import('@/batcomputer/components/effects/ScarecrowEffect'), { ssr: false });

// Lazy load sections
const OperativeProfile = lazy(() => import('@/batcomputer/components/sections/OperativeProfile'));
const Arsenal = lazy(() => import('@/batcomputer/components/sections/Arsenal'));
const Gadgets = lazy(() => import('@/batcomputer/components/sections/Gadgets'));
const CaseHistory = lazy(() => import('@/batcomputer/components/sections/CaseHistory'));
const Contact = lazy(() => import('@/batcomputer/components/sections/Contact'));

type AppState = 'boot' | 'bat-swarm' | 'menu' | 'section';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('boot');
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [batScatter, setBatScatter] = useState<{ x: number; y: number } | null>(null);
  const [hasVisitedSection, setHasVisitedSection] = useState(false);
  const { play, fadeOut, isMuted, toggleMute } = useAudio();

  const handleBootComplete = useCallback(() => {
    setAppState('bat-swarm');
  }, []);

  const handleSwarmComplete = useCallback(() => {
    setAppState('menu');
  }, []);

  const handleMenuSelect = useCallback(
    (id: SectionId, e: React.MouseEvent) => {
      play('mechanicalPress');
      play('batScreech');
      setBatScatter({ x: e.clientX, y: e.clientY });

      setTimeout(() => {
        play('panelSlide');
        setActiveSection(id);
        setAppState('section');
        setBatScatter(null);
        setHasVisitedSection(true);
      }, 400);
    },
    [play]
  );

  const handleBack = useCallback(() => {
    play('panelSlide');
    setActiveSection(null);
    setAppState('menu');
  }, [play]);

  const handleMenuHover = useCallback(() => {
    play('mechanicalClick');
  }, [play]);

  const renderSection = () => {
    switch (activeSection) {
      case 'operative-profile':
        return <OperativeProfile />;
      case 'arsenal':
        return <Arsenal />;
      case 'gadgets':
        return <Gadgets />;
      case 'case-history':
        return <CaseHistory />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <>
    <CursorGlow />
    <GothamRain isMuted={isMuted} />
    <ScarecrowEffect enabled={hasVisitedSection} isMuted={isMuted} />
    <MonitorFrame
      overlays={
        <>
          {/* Boot Sequence */}
          {appState === 'boot' && (
            <BootSequence
              onComplete={handleBootComplete}
              playSound={(id) => play(id)}
              fadeOutSound={(id, d) => fadeOut(id, d)}
            />
          )}

          {/* Bat Swarm (post-boot) */}
          {appState === 'bat-swarm' && (
            <BatSwarm onComplete={handleSwarmComplete} duration={2000} />
          )}

          {/* Bat Scatter on click */}
          {batScatter && (
            <BatScatter
              originX={batScatter.x}
              originY={batScatter.y}
              onComplete={() => setBatScatter(null)}
            />
          )}

          {/* Persistent UI */}
          {appState !== 'boot' && appState !== 'bat-swarm' && (
            <>
              {appState === 'section' && <BackButton onClick={handleBack} />}
              <MuteToggle isMuted={isMuted} onToggle={toggleMute} />
              <HUDOverlay />
            </>
          )}
        </>
      }
    >
      {/* Content inside MonitorFrame — scrolls with native page scroll */}
      <AnimatePresence mode="wait">
        {appState === 'menu' && (
          <PanelTransition transitionKey="menu">
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '2vh' }}>
              <MainMenu onSelect={handleMenuSelect} onHover={handleMenuHover} />
            </div>
          </PanelTransition>
        )}

        {appState === 'section' && activeSection && (
          <PanelTransition transitionKey={activeSection}>
            <Suspense
              fallback={
                <div style={{ padding: '3rem', textAlign: 'center' }} className="font-mono text-xs text-text-secondary">
                  LOADING...
                </div>
              }
            >
              {renderSection()}
            </Suspense>
          </PanelTransition>
        )}
      </AnimatePresence>
    </MonitorFrame>
    </>
  );
}

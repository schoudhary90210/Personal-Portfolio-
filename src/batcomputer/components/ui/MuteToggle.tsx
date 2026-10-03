'use client';

import { Volume2, VolumeX } from 'lucide-react';
import MagneticWrap from './MagneticWrap';

interface MuteToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

export default function MuteToggle({ isMuted, onToggle }: MuteToggleProps) {
  return (
    <MagneticWrap className="absolute top-6 right-6 z-50 pointer-events-auto">
      <button
        onClick={onToggle}
        className="p-3 text-text-secondary hover:text-accent transition-colors duration-200"
        style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </MagneticWrap>
  );
}

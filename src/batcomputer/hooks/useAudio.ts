'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';

const AUDIO_FILES = {
  mechanicalClick: '/audio/mechanical-click.mp3',
  mechanicalPress: '/audio/mechanical-press.mp3',
  gothamAmbient: '/audio/gotham-ambient.mp3',
  bootBeep: '/audio/boot-beep.mp3',
  panelSlide: '/audio/panel-slide.mp3',
  batScreech: '/audio/bat-screech.mp3',
} as const;

type SoundId = keyof typeof AUDIO_FILES;

export function useAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const soundsRef = useRef<Record<string, Howl>>({});

  useEffect(() => {
    const sounds: Record<string, Howl> = {};

    Object.entries(AUDIO_FILES).forEach(([key, src]) => {
      sounds[key] = new Howl({
        src: [src],
        volume: key === 'gothamAmbient' ? 0.3 : key === 'batScreech' ? 0.4 : 0.5,
        preload: true,
        loop: key === 'gothamAmbient',
      });
    });

    soundsRef.current = sounds;

    return () => {
      Object.values(sounds).forEach((h) => h.unload());
    };
  }, []);

  const play = useCallback(
    (id: SoundId) => {
      if (isMuted) return;
      // Resume AudioContext on user interaction (browser autoplay policy)
      if (Howler.ctx && Howler.ctx.state === 'suspended') {
        Howler.ctx.resume();
      }
      soundsRef.current[id]?.play();
    },
    [isMuted]
  );

  const stop = useCallback((id: SoundId) => {
    soundsRef.current[id]?.stop();
  }, []);

  const fadeOut = useCallback((id: SoundId, duration = 1000) => {
    const sound = soundsRef.current[id];
    if (sound) {
      sound.fade(sound.volume(), 0, duration);
      setTimeout(() => sound.stop(), duration);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return { play, stop, fadeOut, isMuted, toggleMute };
}

'use client';

import { useEffect, useState } from 'react';

const coords = [
  'LAT 43.0731 // LONG -89.4012',
  'LAT 43.0753 // LONG -89.3934',
  'LAT 43.0689 // LONG -89.4101',
  'LAT 43.0712 // LONG -89.3987',
];

const signals = [
  'SIGNAL STRENGTH: ████████░░ 82%',
  'SIGNAL STRENGTH: █████████░ 91%',
  'SIGNAL STRENGTH: ███████░░░ 73%',
  'SIGNAL STRENGTH: ██████████ 99%',
];

function useCycleValue(arr: string[], interval: number) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % arr.length), interval);
    return () => clearInterval(timer);
  }, [arr.length, interval]);
  return arr[idx];
}

function useFormattedTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', { hour12: false }) +
          '.' +
          String(now.getMilliseconds()).padStart(3, '0')
      );
    };
    update();
    const timer = setInterval(update, 100);
    return () => clearInterval(timer);
  }, []);
  return time;
}

export default function DataTicker() {
  const coord = useCycleValue(coords, 4000);
  const signal = useCycleValue(signals, 3000);
  const time = useFormattedTime();

  return (
    <>
      <div className="absolute top-4 left-4 z-[9997] font-mono text-[10px] text-text-secondary/40 hidden md:block">
        {coord}
      </div>
      <div className="absolute top-4 right-14 z-[9997] font-mono text-[10px] text-text-secondary/40 hidden md:block">
        {time}
      </div>
      <div className="absolute bottom-4 left-4 z-[9997] font-mono text-[10px] text-text-secondary/40 hidden md:block">
        {signal}
      </div>
      <div className="absolute bottom-4 right-4 z-[9997] font-mono text-[10px] text-text-secondary/40 hidden md:block">
        ENCRYPTION: AES-256 // STATUS: SECURE
      </div>
    </>
  );
}

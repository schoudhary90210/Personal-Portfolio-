'use client';

export default function ScanLines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(255,255,255,0.03) 2px,
          rgba(255,255,255,0.03) 4px
        )`,
      }}
    />
  );
}

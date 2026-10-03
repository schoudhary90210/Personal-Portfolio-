import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          backgroundColor: '#0a0a0b',
          backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(220, 38, 38, 0.28), transparent 60%)',
          color: '#f5f5f5',
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 999,
            backgroundColor: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 700,
            color: '#ffffff',
          }}
        >
          {site.initials}
        </div>
        <div style={{ marginTop: 56, fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>{site.name}</div>
        <div style={{ marginTop: 20, fontSize: 36, color: '#a3a3a3' }}>
          Computer Science &amp; Mathematics &middot; UW&ndash;Madison
        </div>
        <div style={{ marginTop: 'auto', fontSize: 28, color: '#f87171' }}>{site.url.replace('https://', '')}</div>
      </div>
    ),
    size,
  );
}

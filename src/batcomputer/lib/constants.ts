// ── Color Palette ──
export const COLORS = {
  bg: '#050505',
  bgLight: '#0a0a0a',
  accent: '#dc2626',
  accentDark: '#b91c1c',
  accentDeep: '#7f1d1d',
  textPrimary: '#f5f5f5',
  textSecondary: '#a3a3a3',
  border: '#2a2a2a',
  scanLine: 'rgba(255,255,255,0.03)',
} as const;

// ── Timing (ms) ──
export const TIMING = {
  bootTotal: 5200,
  bootGlitchStart: 300,
  bootTypeStart: 1000,
  bootBarsStart: 1500,
  bootBarsComplete: 2800,
  bootFlash: 3000,
  bootFade: 3200,
  batSwarmDuration: 2000,
  batScatterDuration: 800,
  panelTransition: 600,
  glitchFrame: 50,
} as const;

// ── Breakpoints ──
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// ── Menu Items ──
export const MENU_ITEMS = [
  { id: 'operative-profile', label: 'OPERATIVE PROFILE' },
  { id: 'case-history', label: 'CASE HISTORY' },
  { id: 'arsenal', label: 'ARSENAL' },
  { id: 'gadgets', label: 'GADGETS' },
  { id: 'contact', label: 'CONTACT' },
] as const;

export type SectionId = (typeof MENU_ITEMS)[number]['id'];

import { DefaultTheme } from 'styled-components';

const baseTheme = {
  fonts: {
    primary: 'var(--font-inter, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
  },
  sizes: {
    container: '1200px',
    radius: '20px',
  },
  shadows: {
    soft: '0 20px 80px rgba(0, 0, 0, 0.25)',
  },
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  mode: 'light',
  colors: {
    background: '#f6f7fb',
    surface: '#ffffff',
    contrast: '#0E1018',
    muted: '#6b7280',
    accent: '#5B5CFF',
    accentSecondary: '#ff0073',
    border: 'rgba(14, 16, 24, 0.08)',
  },
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  mode: 'dark',
  colors: {
    background: '#05060d',
    surface: '#0f111c',
    contrast: '#f0f4ff',
    muted: '#9CA3AF',
    accent: '#8B5CFF',
    accentSecondary: '#ff0073',
    border: 'rgba(255, 255, 255, 0.08)',
  },
};

export type AppTheme = typeof lightTheme;

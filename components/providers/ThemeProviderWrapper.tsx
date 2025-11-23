'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { darkTheme, lightTheme } from '@/styles/theme';

type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
};

const ThemeModeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'studio-theme-mode';

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored) {
      setThemeMode(stored);
    } else {
      setThemeMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const applyMode = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, mode);
      document.documentElement.dataset.theme = mode;
    }
  }, []);

  const toggleTheme = useCallback(() => {
    applyMode(themeMode === 'light' ? 'dark' : 'light');
  }, [applyMode, themeMode]);

  const value = useMemo(
    () => ({ themeMode, toggleTheme, setTheme: applyMode }),
    [themeMode, toggleTheme, applyMode],
  );

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used within ThemeProviderWrapper');
  }
  return ctx;
};

'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useThemeMode } from '@/components/providers/ThemeProviderWrapper';

const ToggleButton = styled(motion.button)`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.contrast};
  cursor: pointer;
  outline: none;
`;

export const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useThemeMode();

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label="Переключить тему"
      whileTap={{ scale: 0.9 }}
      whileHover={{ rotate: themeMode === 'light' ? 15 : -15 }}
    >
      {themeMode === 'light' ? '🌞' : '🌙'}
    </ToggleButton>
  );
};

'use client'

import React, { forwardRef } from 'react'
import { motion, MotionProps } from 'framer-motion'
import styled from 'styled-components'


const ButtonBase = styled.button<{ $variant?: 'primary' | 'ghost' }>`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.95rem 1.8rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  color: ${({ $variant, theme }) =>
    $variant === 'ghost' ? theme.colors.contrast : '#fff'};

  border: ${({ $variant, theme }) =>
    $variant === 'ghost' ? `1px solid ${theme.colors.border}` : 'none'};

  background: ${({ $variant, theme }) =>
    $variant === 'ghost'
      ? 'transparent'
      : `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSecondary})`};

  box-shadow: ${({ $variant }) =>
    $variant === 'ghost' ? 'none' : '0 15px 40px rgba(91, 92, 255, 0.35)'};

  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    box-shadow: 0 20px 50px rgba(91, 92, 255, 0.45);
  }
`

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

// Комбинируем кастомные пропсы + HTML атрибуты + motion-пропсы
export type ButtonProps = React.ComponentProps<typeof ButtonBase> &
  MotionProps & {
    variant?: 'primary' | 'ghost'
  }

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

// Создаём motion-компонент с безопасной типизацией
const MotionButtonBase = motion(ButtonBase)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'primary', children, ...rest }, ref) {
    return (
      <MotionButtonBase
        ref={ref}
        $variant={variant}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        {...rest}
      >
        {children}
      </MotionButtonBase>
    )
  }
)

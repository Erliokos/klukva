'use client'

import React, { ElementType, forwardRef } from 'react'
import { motion, MotionProps } from 'framer-motion'
import styled from 'styled-components'

/* Styled root */
const ButtonBase = styled.button<{ $variant?: 'primary' | 'ghost' }>`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.95rem 1.8rem;
  border-radius: 999px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  color: ${({ $variant, theme }) =>
    $variant === 'ghost' ? theme.colors.contrast : '#fff'};
  border: ${({ $variant, theme }) =>
    $variant === 'ghost' ? `1px solid ${theme.colors.border}` : 'none'};
  background: ${({ $variant, theme }) =>
    $variant === 'ghost'
      ? 'transparent'
      : `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSecondary})`};
`

/* Own props */
type OwnProps = {
  variant?: 'primary' | 'ghost'
  as?: ElementType
}

/* Polymorphic props for consumer — they get MotionProps + ability to pass props of target element.
   We keep this broad and then cast when passing to MotionBase (library typing limitation). */
export type ButtonProps = OwnProps &
  MotionProps & {
    // allow arbitrary props so TypeScript does not complain when passing href, target, etc.
    [key: string]: any
  }

/* Create motion wrapper.
   motion(ButtonBase) typing is limited and may not accept `as` in its declared props,
   so we cast it to `any` for flexible usage below. */
const MotionBase = motion(ButtonBase) as unknown as React.ComponentType<any>

/* Polymorphic component with forwardRef.
   We keep ref typed as generic HTMLElement so it works for button, a, div, etc. */
export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    { as: Component = 'button', variant = 'primary', children, ...rest },
    ref
  ) => {
    return (
      <MotionBase
        // pass as and ref using casts to work around library typing restrictions
        as={Component as any}
        ref={ref as any}
        $variant={variant}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        {...rest}
      >
        {children}
      </MotionBase>
    )
  }
)

Button.displayName = 'Button'

'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { WatermarkPattern } from '@/components/WatermarkPattern';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(16px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(5, 6, 13, 0.55)' : 'rgba(246, 247, 251, 0.8)'};
  overflow: hidden;
`;

const HeaderInner = styled.div`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  position: relative;
  z-index: 1;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  a {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.muted};
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.contrast};
    }
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Burger = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.contrast};
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 900px) {
    display: inline-flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  padding: 120px 2rem 2rem;
  gap: 1.5rem;
`;

const navItems = [
  { label: 'Услуги', href: '#services' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Процесс', href: '#process' },
  { label: 'Контакты', href: '#contacts' },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <HeaderWrapper>
      <WatermarkPattern count={20} minSize={10} maxSize={80} />
      <HeaderInner>
        <Logo />
        <Nav>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </Nav>
        <Actions>
          <ThemeToggle />
          <Button as="a" href="#form">
            Оставить заявку
          </Button>
          <Burger onClick={() => setIsOpen((prev) => !prev)} aria-label="Меню">
            ☰
          </Burger>
        </Actions>
      </HeaderInner>
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {item.label}
              </motion.a>
            ))}
            <Button as="a" href="#form" onClick={handleNavClick}>
              Оставить заявку
            </Button>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderWrapper>
  );
};

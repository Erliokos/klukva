'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { contacts } from '@/lib/content';
import { fadeInUp, staggerChildren } from '@/lib/motion';
import { WatermarkPattern } from '@/components/WatermarkPattern';

const FooterWrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 4rem 1.5rem 2rem;
  position: relative;
  overflow: hidden;
`;

const FooterInner = styled(motion.div)`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.contrast};
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.muted};
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.85rem;
  margin: 0;
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.85rem;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const navItems = [
  { label: 'Услуги', href: '#services' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Процесс', href: '#process' },
  { label: 'Технологии', href: '#technologies' },
  { label: 'Контакты', href: '#contacts' },
];

const socialLinks = [
  { name: 'Telegram', href: `https://t.me/${contacts.telegram.replace('@', '')}`, icon: '✈️' },
  { name: 'GitHub', href: 'https://github.com', icon: '💻' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
  { name: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
];

export const Footer = () => {
  const phoneLink = contacts.phone.replace(/[\s()-]/g, '');

  return (
    <FooterWrapper>
      <WatermarkPattern count={20} minSize={10} maxSize={100} />
      <FooterInner variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <FooterColumn variants={fadeInUp}>
          <Logo />
          <FooterText>
            Студия полного цикла: дизайн, разработка, поддержка и продвижение цифровых продуктов.
          </FooterText>
          <SocialLinks>
            {socialLinks.map((social) => (
              <SocialLink
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </SocialLink>
            ))}
          </SocialLinks>
        </FooterColumn>

        <FooterColumn variants={fadeInUp}>
          <ColumnTitle>Навигация</ColumnTitle>
          {navItems.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn variants={fadeInUp}>
          <ColumnTitle>Услуги</ColumnTitle>
          <FooterLink href="#services">Разработка сайтов</FooterLink>
          <FooterLink href="#services">UI/UX дизайн</FooterLink>
          <FooterLink href="#services">Брендинг</FooterLink>
          <FooterLink href="#services">Реклама и продвижение</FooterLink>
          <FooterLink href="#services">Техподдержка</FooterLink>
        </FooterColumn>

        <FooterColumn variants={fadeInUp}>
          <ColumnTitle>Контакты</ColumnTitle>
          <FooterLink href={`mailto:${contacts.email}`}>{contacts.email}</FooterLink>
          <FooterLink href={`tel:${phoneLink}`}>{contacts.phone}</FooterLink>
          <FooterLink href={`https://t.me/${contacts.telegram.replace('@', '')}`} target="_blank" rel="noreferrer">
            {contacts.telegram}
          </FooterLink>
        </FooterColumn>
      </FooterInner>

      <FooterBottom>
        <Copyright>© {new Date().getFullYear()} Studio. Все права защищены.</Copyright>
        <FooterNav>
          <a href="#top">Наверх</a>
          <a href="#form">Оставить заявку</a>
        </FooterNav>
      </FooterBottom>
    </FooterWrapper>
  );
};


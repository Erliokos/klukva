'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { ParticlesCanvas } from '@/components/canvas/ParticlesCanvas';
import { fadeInUp } from '@/lib/motion';
import { StarfieldCanvas } from '@/components/canvas/StarfieldCanvas';

const HeroSection = styled.section`
  position: relative;
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  padding: 6rem 1.5rem 4rem;
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1.5rem;
  text-align: left;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.75rem, 5vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.accentSecondary} 25%,
    #22D3EE 50%,
    ${({ theme }) => theme.colors.accentSecondary} 75%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 8s ease infinite;

  @keyframes gradientShift {
    0% {
      background-position: 0% center;
    }
    50% {
      background-position: 100% center;
    }
    100% {
      background-position: 0% center;
    }
  }
`

const Subtitle = styled(motion.p)`
  max-width: 540px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 2rem;
`;

const CTAGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const AccentBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.35rem 1rem;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const ThreeScene = dynamic(
  () => import('@/components/canvas/ThreeScene').then((mod) => mod.ThreeScene),
  { ssr: false, loading: () => null },
);

export const Hero = () => (
  <HeroSection id="top">
    {/* <ParticlesCanvas /> */}
    <StarfieldCanvas/>
    <ThreeScene />
    <HeroContainer>
      <AccentBadge
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
      >
        Digital-студия полного цикла
      </AccentBadge>
      <Title variants={fadeInUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
        Разрабатываем современные сайты под ключ
      </Title>
      <Subtitle variants={fadeInUp} initial="hidden" animate="show" transition={{ delay: 0.45 }}>
        Делаем дизайн, разработку и поддержку. Интегрируем анимацию, 3D и перформанс-подход для системных брендов.
      </Subtitle>
      <CTAGroup variants={fadeInUp} initial="hidden" animate="show" transition={{ delay: 0.55 }}>
        <Button as="a" href="#form">
          Оставить заявку
        </Button>
        <Button as="a" href="#portfolio" variant="ghost">
          Смотреть проекты
        </Button>
      </CTAGroup>
    </HeroContainer>
  </HeroSection>
);

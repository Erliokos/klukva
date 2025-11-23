'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LogoWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  font-size: 1rem;
  text-transform: uppercase;
`;

const LogoImage = styled(Image)`
  height: auto;
  width: auto;
  max-height: 32px;
  object-fit: contain;
`;

const LogoMainColor = styled.span`
  color: ${({ theme }) => theme.colors.accentSecondary};
`;

export const Logo = () => (
  <LogoWrapper whileHover={{ scale: 1.05 }}>
    <LogoImage src="/assets/klukva.svg" alt="KLUKVA" width={32} height={32} />
    <LogoMainColor>KLUKVA</LogoMainColor>
    <LogoImage src="/assets/berry_2.svg" alt="KLUKVA" width={32} height={32} />
    STUDIO
  </LogoWrapper>
)

'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import LogoSvg from '@/public/assets/kalina.svg'
import BerrySvg from '@/public/assets/berry_2.svg'
import { media } from '@/styles/GlobalStyles';

const LogoWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  text-transform: uppercase;
  ${media.sm`
    font-size: 1rem;
  `}
`

const LogoImage = styled(LogoSvg)`
  height: 48px;
  width: 48px;
  ${media.sm`
    height: 64px;
    width: 64px;
  `}
`

const BerryImage = styled(BerrySvg)`
  height: 20px;
  width: 20px;
  ${media.sm`
    height: 30px;
    width: 30px;
  `}
`

const LogoMainColor = styled.span`
  color: ${({ theme }) => theme.colors.accentSecondary};
`;

export const Logo = () => (
  <LogoWrapper whileHover={{ scale: 1.05 }}>
    <LogoImage/>
    <LogoMainColor>KALINA</LogoMainColor>
    <BerryImage/>
    STUDIO
  </LogoWrapper>
)

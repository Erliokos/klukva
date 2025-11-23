'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';

const Wrapper = styled(motion.div)`
  text-align: left;
  margin-bottom: 2rem;
  max-width: ${({ theme }) => theme.sizes.container};
  margin: auto;

  h2 {
    font-size: clamp(1.8rem, 2.5vw, 3rem);
    margin-bottom: 0.75rem;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
    max-width: 520px;
  }
`

type Props = {
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export const SectionHeading = ({ title, description, align = 'left' }: Props) => (
  <Wrapper
    variants={fadeInUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    style={{ textAlign: align }}
  >
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </Wrapper>
);

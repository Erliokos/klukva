'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { advantages } from '@/lib/content';
import { fadeInUp, staggerChildren } from '@/lib/motion';
import { SectionHeading } from '@/components/SectionHeading';

const Section = styled.section`
  padding: 5rem 1.5rem;
  background: radial-gradient(circle at top, rgba(91, 92, 255, 0.15), transparent 45%);
`;

const Grid = styled(motion.div)`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
`;

const Item = styled(motion.div)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(15, 17, 28, 0.7)' : theme.colors.surface)};
  border-radius: ${({ theme }) => theme.sizes.radius};
  padding: 1.5rem;
  color: ${({ theme }) => theme.colors.contrast};
`;

export const Benefits = () => (
  <Section>
    <SectionHeading
      title="Преимущества работы с нами"
      description="Гарантируем прозрачность процессов, глубокое погружение в задачи и поддержку после релиза."
    />
    <Grid variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {advantages.map((item) => (
        <Item key={item.title} variants={fadeInUp}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </Item>
      ))}
    </Grid>
  </Section>
);

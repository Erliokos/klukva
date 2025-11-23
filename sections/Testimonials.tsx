'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { testimonials } from '@/lib/content';
import { SectionHeading } from '@/components/SectionHeading';
import { fadeInUp, staggerChildren } from '@/lib/motion';

const Section = styled.section`
  padding: 5rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
`;

const Grid = styled(motion.div)`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const Card = styled(motion.article)`
  border-radius: ${({ theme }) => theme.sizes.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  min-height: 220px;

  span {
    display: block;
    margin-top: 0.25rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const Testimonials = () => (
  <Section>
    <SectionHeading title="Отзывы" description="Фрагменты обратной связи от клиентов (заглушки)." />
    <Grid variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {testimonials.map((review) => (
        <Card key={review.author} variants={fadeInUp}>
          <p>{review.text}</p>
          <strong>{review.author}</strong>
          <span style={{ color: 'inherit', opacity: 0.6 }}>{review.role}</span>
        </Card>
      ))}
    </Grid>
  </Section>
);

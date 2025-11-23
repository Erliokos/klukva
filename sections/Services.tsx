'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { services } from '@/lib/content';
import { fadeInUp, staggerChildren } from '@/lib/motion';
import { SectionHeading } from '@/components/SectionHeading';

const Section = styled.section`
  padding: 5rem 1.5rem;
`;

const Grid = styled(motion.div)`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.sizes.radius};
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 200px;
`;

export const Services = () => (
  <Section id="services">
    <SectionHeading
      title="Услуги"
      description="Проводим полный цикл работ — от стратегии и дизайна до разработки и поддержки."
    />
    <Grid variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {services.map((service) => (
        <Card key={service.title} variants={fadeInUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 120 }}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </Card>
      ))}
    </Grid>
  </Section>
);

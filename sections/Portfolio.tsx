'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { portfolio } from '@/lib/content';
import { SectionHeading } from '@/components/SectionHeading';
import { fadeInUp, staggerChildren } from '@/lib/motion';

const Section = styled.section`
  padding: 5rem 1.5rem;
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
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};

  h3 {
    margin: 1.25rem;
  }

  span {
    margin: 0 1.25rem 1.5rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const Portfolio = () => (
  <Section id="portfolio">
    <SectionHeading title="Портфолио" description="Последние проекты студии. Изображения заменены заглушками." />
    <Grid variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {portfolio.map((item) => (
        <Card key={item.title} variants={fadeInUp}>
          <Image src={item.image} alt={item.title} width={640} height={380} style={{ width: '100%', height: 'auto' }} />
          <h3>{item.title}</h3>
          <span>{item.category}</span>
        </Card>
      ))}
    </Grid>
  </Section>
);

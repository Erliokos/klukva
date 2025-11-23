'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { processSteps } from '@/lib/content';
import { SectionHeading } from '@/components/SectionHeading';
import { fadeInUp } from '@/lib/motion';

const Section = styled.section`
  padding: 5rem 1.5rem;
`;

const Steps = styled.div`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
`;

const Step = styled(motion.div)`
  border-radius: ${({ theme }) => theme.sizes.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.25rem;

  h4 {
    margin: 0.5rem 0;
  }
`;

export const Process = () => (
  <Section id="process">
    <SectionHeading title="Процесс работы" description="Проводим клиента через прозрачные этапы. Каждый шаг фиксируем в Notion/ClickUp и предоставляем доступ." />
    <Steps>
      {processSteps.map((step, index) => (
        <Step
          key={step.title}
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: index * 0.05 }}
        >
          <div style={{ fontSize: '2rem' }}>{step.icon}</div>
          <h4>{step.title}</h4>
          <p>{step.description}</p>
        </Step>
      ))}
    </Steps>
  </Section>
);

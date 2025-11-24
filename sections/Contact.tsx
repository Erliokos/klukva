'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { contacts } from '@/lib/content';
import { SectionHeading } from '@/components/SectionHeading';
import { fadeInUp } from '@/lib/motion';
import { Button } from '@/components/ui/Button';

const Section = styled.section`
  padding: 5rem 1.5rem;
`;

const Layout = styled.div`
  max-width: ${({ theme }) => theme.sizes.container};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ContactCard = styled(motion.div)`
  border-radius: ${({ theme }) => theme.sizes.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormCard = styled(ContactCard)`
  form {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  input,
  textarea {
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: transparent;
    padding: 0.9rem 1rem;
    color: ${({ theme }) => theme.colors.contrast};
    font-family: inherit;
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }

  span.error {
    color: #f87171;
    font-size: 0.85rem;
  }
  div{
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const ErrorMessage = styled.span`
  position: absolute;
  left: 15px;
  bottom: -27px;
  font-size: 0.85rem;
  color: #f87171;
`

type FormValues = {
  name: string;
  phone: string;
  message: string;
};

export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const phoneLink = contacts.phone.replace(/[\\s()-]/g, '');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = async (values: FormValues) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to send form');
      }

      setStatus('success');
      reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <Section id="contacts">
      <SectionHeading
        title="Связаться с нами"
        description="Опишите задачу, и мы вернёмся с предложением в течение рабочего дня."
      />
      <Layout>
        <ContactCard variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3>Контакты</h3>
          <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
          <a href={`tel:${phoneLink}`}>{contacts.phone}</a>
          <a href={`https://t.me/${contacts.telegram.replace('@', '')}`} target="_blank" rel="noreferrer">
            {contacts.telegram}
          </a>
        </ContactCard>
        <FormCard
          id="form"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h3>Оставить заявку</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input placeholder="Имя" {...register('name', { required: 'Введите имя' })} />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>
            <div>
              <input
                placeholder="Телефон"
                {...register('phone', {
                  required: 'Введите телефон',
                  pattern: {
                    value: /^\+?[0-9\s()-]{6,}$/,
                    message: 'Введите корректный номер',
                  },
                })}
              />
              {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
            </div>
            <div>
              <textarea placeholder="Сообщение" {...register('message', { required: 'Введите сообщение', minLength: 10 })} />
              {errors.message && <ErrorMessage>{errors.message.message || 'Минимум 10 символов'}</ErrorMessage>}
            </div>
            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Отправляем...' : 'Отправить'}
            </Button>
            {status === 'success' && <span>Спасибо! Мы вернёмся с ответом.</span>}
            {status === 'error' && <span>Ошибка отправки. Попробуйте ещё раз.</span>}
          </form>
        </FormCard>
      </Layout>
    </Section>
  );
};

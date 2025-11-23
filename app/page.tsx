'use client';

import styled from 'styled-components';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { Benefits } from '@/sections/Benefits';
import { Portfolio } from '@/sections/Portfolio';
import { Process } from '@/sections/Process';
import { Technologies } from '@/sections/Technologies';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export default function HomePage() {
  return (
    <>
      <Header />
      <Main>
        <Hero />
        <Services />
        <Benefits />
        <Portfolio />
        <Process />
        <Technologies />
        <Testimonials />
        <Contact />
      </Main>
      <Footer />
    </>
  );
}

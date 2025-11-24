import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/styles/StyledComponentsRegistry';
import { ThemeProviderWrapper } from '@/components/providers/ThemeProviderWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export const metadata = {
  title: 'Kalina Studio — Современная веб-разработка',
  description:
    'Студия полного цикла: дизайн, разработка, поддержка и продвижение цифровых продуктов.',
  openGraph: {
    title: 'Kalina Studio',
    description:
      'Делаем современные сайты под ключ: дизайн, разработка, поддержка и продвижение.',
    url: 'https://www.kalina-studio.ru',
    siteName: 'Kalina Studio',
    images: [
      {
        url: 'https://www.kalina-studio.ru/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kalina Studio Logo'
      }
    ],
    locale: 'ru_RU',
    type: 'website'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/berry_2.svg" />
      </head>
      <body className={inter.variable}>
        <StyledComponentsRegistry>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

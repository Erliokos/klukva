import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/styles/StyledComponentsRegistry';
import { ThemeProviderWrapper } from '@/components/providers/ThemeProviderWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Studio — Современная веб-разработка',
  description:
    'Студия полного цикла: дизайн, разработка, поддержка и продвижение цифровых продуктов.',
  openGraph: {
    title: 'Studio — Современная веб-разработка',
    description:
      'Делаем современные сайты под ключ: дизайн, разработка, поддержка и продвижение.',
    type: 'website',
    locale: 'ru_RU',
    url: 'https://example.com',
  },
  metadataBase: new URL('https://example.com'),
};

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

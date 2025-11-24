import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    color-scheme: ${({ theme }) => (theme.mode === 'dark' ? 'dark' : 'light')};
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.contrast};
    font-family: ${({ theme }) => theme.fonts.primary};
    min-height: 100vh;
    transition: background 0.4s ease, color 0.4s ease;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }
`;

export const media = {
  sm: (styles: any) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      ${styles}
    }
  `,
  md: (styles: any) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      ${styles}
    }
  `,
  lg: (styles: any) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      ${styles}
    }
  `,
  xl: (styles: any) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      ${styles}
    }
  `,
}

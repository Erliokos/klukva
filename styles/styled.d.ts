import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      primary: string
    },
    sizes: {
      container: string
      radius: string
    },
    shadows: {
      soft: string
    },
    mode: string
    colors: {
      background: string
      surface: string
      contrast: string
      muted: string
      accent: string
      accentSecondary: string
      border: string
    },
  }
}

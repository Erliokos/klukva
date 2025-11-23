import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/particles/index.ts'),
      name: 'ParticlesEngine',
      formats: ['es', 'cjs'],
      fileName: (format) => `particles-engine.${format}.js`,
    },
    outDir: 'public/assets/particles-lib',
    emptyOutDir: false,
  },
});

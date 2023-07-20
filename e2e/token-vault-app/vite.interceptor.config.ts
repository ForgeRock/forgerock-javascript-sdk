import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
  build: {
    minify: false,
    emptyOutDir: false,
    rollupOptions: {
      input: 'e2e/token-vault-app/src/interceptor.ts',
      output: {
        entryFileNames: 'interceptor.js',
        format: 'iife',
        esModule: false,
      },
    },
  },
});

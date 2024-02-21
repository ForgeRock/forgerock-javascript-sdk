import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  plugins: [nxViteTsPaths()],
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

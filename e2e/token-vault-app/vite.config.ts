import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: './e2e/token-vault-app/src/main.ts',
      },
      output: {
        entryFileNames: 'main.js',
      },
    },
  },
  server: {
    port: 5823,
    headers: {
      'Service-Worker-Allowed': '/',
      'Service-Worker': 'script',
    },
    strictPort: true,
  },
  plugins: [nxViteTsPaths()],
});

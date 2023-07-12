import { defineConfig } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';

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
  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
});

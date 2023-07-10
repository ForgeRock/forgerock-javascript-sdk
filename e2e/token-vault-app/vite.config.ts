import { defineConfig } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        interceptor: 'e2e/token-vault-app/src/interceptor.ts',
        main: 'e2e/token-vault-app/src/main.ts',
      },
      output: {
        // dir: 'e2e/token-vault-app/public',
        entryFileNames: '[name].js',
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

  worker: {
    plugins: [
      viteTsConfigPaths({
        root: '../../',
      }),
    ],
    format: 'es',
  },
});

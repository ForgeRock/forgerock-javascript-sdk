import { defineConfig } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
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

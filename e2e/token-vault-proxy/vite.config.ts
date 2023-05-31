import { defineConfig } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 5833,
    strictPort: true,
  },

  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
});

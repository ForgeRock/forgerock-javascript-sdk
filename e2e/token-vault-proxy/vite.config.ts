import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  server: {
    port: 5833,
    strictPort: true,
  },

  plugins: [nxViteTsPaths()],
});

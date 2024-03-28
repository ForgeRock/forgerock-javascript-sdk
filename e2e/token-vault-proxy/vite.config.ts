import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: '../../dist/e2e/token-vault-proxy',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 5833,
    strictPort: true,
  },

  plugins: [nxViteTsPaths()],
});

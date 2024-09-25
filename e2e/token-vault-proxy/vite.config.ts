import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

// // These options were migrated by @nx/vite:convert-to-inferred from the project.json file.
// const configValues = { default: {}, development: {}, production: {} };

// // Determine the correct configValue to use based on the configuration
// const nxConfiguration = process.env.NX_TASK_TARGET_CONFIGURATION ?? 'default';

// const options = {
//   ...configValues.default,
//   ...(configValues[nxConfiguration] ?? {}),
// };

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

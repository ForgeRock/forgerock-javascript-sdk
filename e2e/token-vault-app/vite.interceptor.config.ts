import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

// // These options were migrated by @nx/vite:convert-to-inferred from the project.json file.
// const configValues = { default: {} };

// // Determine the correct configValue to use based on the configuration
// const nxConfiguration = process.env.NX_TASK_TARGET_CONFIGURATION ?? 'default';

// const options = {
//   ...configValues.default,
//   ...(configValues[nxConfiguration] ?? {}),
// };

export default defineConfig({
  root: __dirname,
  plugins: [nxViteTsPaths()],
  build: {
    outDir: '../../e2e/token-vault-app/public/',
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
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

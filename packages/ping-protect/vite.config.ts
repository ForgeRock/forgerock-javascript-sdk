/// <reference types="vitest" />
import { defineConfig } from 'vite';

// // These options were migrated by @nx/vite:convert-to-inferred from the project.json file.
// const configValues = { default: {} };

// // Determine the correct configValue to use based on the configuration
// const nxConfiguration = process.env.NX_TASK_TARGET_CONFIGURATION ?? 'default';

// const options = {
//   ...configValues.default,
//   ...(configValues[nxConfiguration] ?? {}),
// };

export default defineConfig({
  cacheDir: '../../node_modules/.vite/ping-protect',

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
  build: {
    lib: {
      name: 'ping-protect',
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => `src/index.js`,
    },
    rollupOptions: {
      output: {
        dir: '../../dist/packages/ping-protect',
        preserveModules: true,
        preserveModulesRoot: './src',
      },
    },
  },
  test: {
    reporters: ['default'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    watch: !!process.env['CI'],
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../coverage/packages/ping-protect',
    },
    deps: {
      optimizer: {
        web: {
          include: ['vitest-canvas-mock'],
        },
      },
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});

/// <reference types="vitest" />
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

const config = defineConfig({
  cacheDir: '../../node_modules/.vite/token-vault',
  plugins: [
    dts({
      root: '../../',
      entryRoot: 'packages/token-vault/src',
      tsConfigFilePath: 'packages/token-vault/tsconfig.lib.json',
      include: ['packages/token-vault/src/**/*.ts'],
      outputDir: 'dist/packages/token-vault',
      skipDiagnostics: false,
      noEmitOnError: true,
    }),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'token-vault',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
  },
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
export default config;

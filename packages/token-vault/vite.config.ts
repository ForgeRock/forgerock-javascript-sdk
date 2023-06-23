/// <reference types="vitest" />
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { joinPathFragments } from '@nx/devkit';

const config = defineConfig({
  cacheDir: '../../node_modules/.vite/token-vault',
  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
    dts({
      entryRoot: 'src',
      tsConfigFilePath: joinPathFragments(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),
  ],
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'token-vault',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist/packages/token-vault/',
      },
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

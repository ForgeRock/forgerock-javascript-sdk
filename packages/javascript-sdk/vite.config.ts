/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { copyFileSync } from 'fs';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/javascript-sdk',

  build: {
    outDir: './dist',
    lib: {
      entry: 'src/index.ts',
      name: 'javascript-sdk',
      formats: ['es', 'cjs'],
      fileName: (format, fileName) => {
        const extension = format === 'es' ? 'js' : 'cjs';
        return `${fileName}.${extension}`;
      },
    },
    rollupOptions: {
      output: {
        dir: './dist',
        preserveModulesRoot: './src',
        preserveModules: true,
      },
    },
  },
  plugins: [
    dts({
      declarationOnly: false,
      entryRoot: 'src',
      rollupTypes: true,
      tsconfigPath: './tsconfig.lib.json',
      afterBuild: () => {
        copyFileSync('dist/index.ts.d.ts', 'dist/index.ts.d.cts');
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    watch: !process.env['CI'],
    reporters: ['default'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../coverage/packages/javascript-sdk',
    },
    deps: {
      optimizer: {
        web: {
          include: ['vitest-canvas-mock'],
        },
      },
    },
  },
});

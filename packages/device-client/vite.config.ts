import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(() => ({
  cacheDir: '../../node_modules/.vite/ping-protect',
  build: {
    outDir: './dist',
    lib: {
      entry: 'src/index.ts',
      name: 'self-service',
      formats: ['es'],
      fileName: (extension, filename) => `${filename}.js`,
    },
    rollupOptions: {
      external: [/node_modules/, '@forgerock/javascript-sdk'],
      output: {
        dir: './dist',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
  plugins: [
    dts({
      declarationOnly: false,
      rollupTypes: false,
      entryRoot: 'src',
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  test: {
    reporters: ['default'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    passWithNoTests: true,
    watch: !process.env['CI'],
    coverage: {
      enabled: Boolean(process.env['CI']),
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      provider: 'v8',
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
}));

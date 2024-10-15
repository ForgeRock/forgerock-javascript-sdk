import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: './public',
    reportCompressedSize: true,
    minify: false,
    emptyOutDir: false,
    rollupOptions: {
      input: './src/interceptor.ts',
      output: {
        entryFileNames: 'interceptor.js',
        format: 'iife',
        esModule: false,
      },
    },
  },
});

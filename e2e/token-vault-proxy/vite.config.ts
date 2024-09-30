import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: './dist',
    reportCompressedSize: true,
  },
  server: {
    port: 5833,
    strictPort: true,
  },
});

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  test: {
    global: true,
    environment: 'jsdom',
  },
});

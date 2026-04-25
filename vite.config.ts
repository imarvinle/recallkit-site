import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    sourcemap: false,
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    strictPort: true,
  },
});

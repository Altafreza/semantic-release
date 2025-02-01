import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    build: {
      sourcemap: mode !== 'production',
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      open: true,
      cors: true,
    }
  };
});
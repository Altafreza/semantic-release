import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, '.', 'VITE_');
  
  console.log(`Loading environment for mode: ${mode}`);
  console.log('Environment variables:', {
    VITE_APP_ENV: env.VITE_APP_ENV,
    VITE_API_URL: env.VITE_API_URL,
    VITE_APP_TITLE: env.VITE_APP_TITLE,
    VITE_APP_DEBUG: env.VITE_APP_DEBUG,
  });

  return {
    plugins: [react()],
    envPrefix: 'VITE_',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      open: true,
      cors: true,
      host: true,
    }
  };
});
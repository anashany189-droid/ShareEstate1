import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use '.' instead of process.cwd() to avoid TS errors in some environments
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    // Base needs to be relative to ensure it works on subpaths
    base: './', 
    define: {
      // Polyfill process.env.API_KEY so it works in the browser. 
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});
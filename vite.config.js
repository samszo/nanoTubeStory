import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxy /omk_tubestory/* → http://localhost/omk_tubestory/*
      // Contourne le CORS entre localhost:3000 et localhost:80
      '/omk_tubestory': {
        target: 'http://localhost',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
});

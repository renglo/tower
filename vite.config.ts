import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { fileURLToPath } from 'url'
import path from 'path';




export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const apiUrl = `${env.VITE_API_URL ?? ''}`;

  return {
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        //'@tools': path.resolve(__dirname, './tools'),
        '@tools': path.resolve(__dirname, '../tools')
        //'@tools': "../tools"
      },
    },
    server: {
      proxy: {
        // Proxy API requests to the Flask server
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/,'/' ),
        },
      },
      host: '127.0.0.1',
      port: 5173,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['../tools','..','../tools/*'],
        strict:false
      },
    },
    json: {
      stringify: true
    },
    optimizeDeps: {
      include: [
        '../tools/**/*.tsx',
        'react-router-dom'
      ],
    },
    build: {
      commonjsOptions: {
        include: [/tools/, /node_modules/],
      },
      rollupOptions: {
        external: []
      },
    },
  };
});
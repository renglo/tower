import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"




export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const apiUrl = `${env.VITE_API_URL ?? ''}`;

  return {
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
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
    },
  };
});









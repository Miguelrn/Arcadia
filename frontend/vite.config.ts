import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  server: {
      host: true,
      port: Number.parseInt(process.env.FRONTEND_PORT!),
      watch: {
        usePolling: true
      }
  },
  plugins: [react()],
  
})

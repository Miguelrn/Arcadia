import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: true,
		port: Number.parseInt(process.env.VITE_FRONTEND_PORT), // TODO: cannot access to import.meta.env.VITE_BACKEND_PORT
		watch: {
			usePolling: true,
		},
	},
	plugins: [react()],
});

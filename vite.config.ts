import 'dotenv/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io';
import { defineConfig } from 'vite';
import type { Server as HttpServer } from 'http';
import { setupSocketIo } from './src/lib/websocket-server';

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'socket.io',
			configureServer(server) {
				const io = new Server(server.httpServer as HttpServer);

				setupSocketIo(io);
			}
		}
	]
});

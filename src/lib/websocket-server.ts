import type { Server, Socket } from 'socket.io';
import { kafka } from './kafka';

export async function setupSocketIo(server: Server) {
	const consumer = kafka.consumer({
		groupId: 'log-consumer'
	});

	const sockets: Socket[] = [];

	await consumer.connect();

	await consumer.subscribe({
		topic: 'logs'
	});

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			if (message.value) {
				try {
					const data = JSON.parse(message.value.toString());
					server.emit('newLog', data);
				} catch (e) {
					console.error(e);
				}
			}
		}
	});

	server.on('connection', (socket) => {
		console.log('Client connected');
		sockets.push(socket);

		socket.on('disconnect', () => {
			console.log('Client disconnected remove socket');
			const i = sockets.findIndex((s) => s.id === socket.id);
			if (i > -1) {
				sockets.slice(i, 1);
			}
		});
	});
}

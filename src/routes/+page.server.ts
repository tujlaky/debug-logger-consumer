import { redis } from '$lib/redis';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const logs = await redis.hgetall('logs');

	return logs;
}

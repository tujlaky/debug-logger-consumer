import { redis } from '$lib/redis';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const logs = await redis.hgetall('logs');

	return json(logs);
}

export async function DELETE() {
	await redis.del('logs');

	return new Response(undefined, { status: 201 });
}

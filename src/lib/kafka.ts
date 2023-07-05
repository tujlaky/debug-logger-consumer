import {
	UPSTASH_KAFKA_REST_URL,
	UPSTASH_KAFKA_REST_USERNAME,
	UPSTASH_KAFKA_REST_PASSWORD
} from '$env/static/private';
import { Kafka } from '@upstash/kafka';

export const kafka = new Kafka({
	url: UPSTASH_KAFKA_REST_URL,
	username: UPSTASH_KAFKA_REST_USERNAME,
	password: UPSTASH_KAFKA_REST_PASSWORD
});

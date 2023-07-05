/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Kafka } from 'kafkajs';

console.log(process.env);

export const kafka = new Kafka({
	brokers: [process.env.UPSTASH_KAFKA_BROKER!],
	sasl: {
		mechanism: 'scram-sha-256',
		username: process.env.UPSTASH_KAFKA_REST_USERNAME!,
		password: process.env.UPSTASH_KAFKA_REST_PASSWORD!
	},
	ssl: true
});

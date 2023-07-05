<script lang="ts">
	import Highlight, { LineNumbers } from "svelte-highlight";
  import json from "svelte-highlight/languages/json";
  import atomOneDark from "svelte-highlight/styles/atom-one-dark";
	import { format } from 'date-fns';
	import { io } from 'socket.io-client';
	import { afterUpdate, onMount } from "svelte";

	export let data: { [key: string]: {
		event: string,
		timestamp: number,
		data: object
	}};

	onMount(async () => {
		const socket = io();

		socket.on("connect", () => {
			console.log(socket.id); // x8WIv7-mJelg7on_ALbx
		});

		socket.on("newLog", (message: {

				event: string,
				timestamp: number,
				data: object
		}) => {
			const newKey = Date.now();
			data[newKey] = message;
		});

		
  });

	afterUpdate(() => {
		window.scrollTo(0, document.body.scrollHeight);
	});



</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
	{@html atomOneDark}
	<style>
		pre {
			padding: 0;
		}
	</style>
</svelte:head>

<section>
	<h1>Logs</h1>
	
	<div class="logs">
		{#each Object.entries(data) as [key, log]}
			<div class="log">
				<div class="log-header">
					<b>{log.event}</b> <small>{format(new Date(log.timestamp), "HH:mm:ss")}</small>
				</div>
				
				{#if log.data}
				<Highlight language={json} code={JSON.stringify(log.data, null, 2)} let:highlighted>
				</Highlight>
				{/if}
				
			</div>
		{/each}
	</div>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.logs {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.log {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border: 1px solid #AFAFAF;
		border-radius: 4px;
		padding: 20px;

		margin-bottom: 5px;
	}

	.log-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	h1 {
		width: 100%;
	}
</style>

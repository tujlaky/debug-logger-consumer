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

			console.log(message);
		});

		
  });

	afterUpdate(() => {
		window.scrollTo(0, document.body.scrollHeight);
	});

	async function deleteLogs() {
		await fetch('/api/logs', {
			method: 'DELETE'
		});

		data = {};
		console.clear();
	}

	async function refreshLogs() {
		const response = await fetch('/api/logs', {
			method: 'GET'
		});

		data = await response.json();
		console.log(data);
	}

	function clearLogs() {
		data = {};
		console.clear();
	}



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
	<div class="buttons">
		<button class="clear-button danger" on:click={deleteLogs}>Delete logs</button>
		<button class="clear-button" on:click={clearLogs}>Clear logs</button>
		<button class="clear-button refresh-button" on:click={refreshLogs}>Refresh</button>
	</div>

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

	.buttons {
		justify-content: flex-end;
		margin-bottom: 20px;
		display: flex;
	}

	.clear-button {
		margin-left: 5px;
		padding: 5px;
		border-radius: 4px;
		border: 1px solid #AFAFAF;
		cursor: pointer;
	}

	.danger {
		background: red;
		border: darkred;
		color: white;
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

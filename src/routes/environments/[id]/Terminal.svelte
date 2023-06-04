<script>
	import { onMount } from 'svelte';
	import '../../../styles/terminal.scss';
	import { basehost } from '$lib/stores/host';
	import token from '$lib/stores/token';
	import { browser } from '$app/environment';
	import Loader from '../../../common/Loader.svelte';
	import { page } from '$app/stores';

	let socket;
	let userInput = '';
	let promptLines = [];
	let terminal;
	let loading = true;

	onMount(() => {
		if (browser) {
			// document.cookie = `X-Authorization=${$token}`
			let envrionment_uuid = $page.params.id;

			setTimeout(async () => {
				socket = new WebSocket(
					`wss://${$basehost}/v1/terminal?environment_uuid=${envrionment_uuid}`
				);
				socket.addEventListener('open', () => {
					console.log('Opened');
					loading = false;
				});

				socket.onmessage = (event) => {
					console.log(event.data);
					promptLines.push(event.data);
					promptLines = [...promptLines];
					scrollToBottom(terminal);
				};
			}, 3000);
		}
	});

	function sendCommand() {
		promptLines.push(userInput);
		promptLines = [...promptLines];
		sendRequest(userInput);
		userInput = '';
	}

	function sendRequest(command) {
		console.log(command);
		socket.send(command);
	}

	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};
</script>

{#if loading}
	<Loader />
{/if}

<section class="terminal" bind:this={terminal}>
	<div class="bar">
		<svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
			<g fill="none" fill-rule="evenodd" transform="translate(1 1)">
				<circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5" />
				<circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5" />
				<circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5" />
			</g>
		</svg>
	</div>
	{#each promptLines as line}
		<p>{line}</p>
	{/each}

	<form on:submit|preventDefault={sendCommand}>
		<p><span class="prompt">&gt; </span><input type="text" bind:value={userInput} /></p>
		<input type="submit" hidden />
	</form>
</section>

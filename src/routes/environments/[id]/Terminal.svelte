<script>
	import { onMount } from 'svelte'
    import '../../../styles/terminal.scss'

    let socket
    let userInput = ""
    let promptLines = []

    onMount(() => {
        socket = new WebSocket("ws://localhost:8000/chat")
        socket.addEventListener("open", ()=> {
            console.log("Opened")
        })
    })

    function sendCommand() {
        promptLines.push(userInput)
        promptLines = [...promptLines]
        sendRequest(userInput)
        userInput = ""
    }

    function sendRequest(command) {
        console.log(command);//Send to server
        promptLines.push("Response example")
    }
</script>


<section class="terminal">
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

    <form on:submit|preventDefault={sendCommand}><p><span class="prompt">&gt; </span><input type="text" bind:value={userInput}/></p><input type="submit" hidden/></form>
</section>

<script>
	import { onMount } from 'svelte'
    import '../../../styles/terminal.scss'
    const HOST = "3f86-188-138-181-144.ngrok-free.app"
    import token from '$lib/stores/store'
    import { browser } from '$app/environment'

    let socket
    let userInput = ""
    let promptLines = []

    let uuid ="7e885389-36cf-4e81-970a-7de55ee8ce6c"

    // export function load({ cookies }) {
    //     // cookies.set('X-Authorization', $token, { path: '/' })
    // }

    // onMount(() => {
    if (browser) {
        // document.cookie = `X-Authorization=${$token}`
        
        socket = new WebSocket(`wss://${HOST}/v1/terminal?environment_uuid=${uuid}`)
        socket.addEventListener("open", ()=> {
            console.log("Opened")
        })

        socket.onmessage = (event) => {
            console.log(event.data);
            promptLines.push(event.data)
            promptLines = [...promptLines]
        }
    }

    function sendCommand() {
        promptLines.push(userInput)
        promptLines = [...promptLines]
        sendRequest(userInput)
        userInput = ""
    }

    function sendRequest(command) {
        console.log(command);//Send to server
        socket.send(command)
        // promptLines.push("Response example")
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

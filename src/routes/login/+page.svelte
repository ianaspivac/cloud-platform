<script>
    import Login from "./Login.svelte"
    import token from "$lib/stores/token.js"
	import { goto } from "$app/navigation"
    import { onMount } from "svelte"

    if ($token) {
        goto("/courses")
    }
</script>

<div class="login-page">
    <Login/>
</div>

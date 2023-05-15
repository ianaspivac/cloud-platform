<script>
    import Login from "./Login.svelte"
    import store from "$lib/stores/store.js"
	import { goto } from "$app/navigation"
    import { onMount } from "svelte"

    onMount(() => {
        if ($store) {
            goto("/courses")
        }
    })
</script>

<div class="login-page">
    <Login/>
</div>

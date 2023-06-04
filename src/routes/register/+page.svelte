<script>
	import { goto } from "$app/navigation"
    import Register from "./Register.svelte"
    import token from "$lib/stores/token.js"

    if ($token) {
        goto("/courses")
    }
</script>

<div class="register-page">
    <Register/>
</div>

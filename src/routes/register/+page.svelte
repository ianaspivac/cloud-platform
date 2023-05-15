<script>
	import { goto } from "$app/navigation"
    import Register from "./Register.svelte"
    import store from "$lib/stores/store.js"

    if ($store) {
        goto("/courses")
    }
</script>

<div class="register-page">
    <Register/>
</div>

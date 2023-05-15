<script>
	import store from "$lib/stores/store.js"
	import { browser } from "$app/environment"
	import { redirect } from "@sveltejs/kit"

	if (browser) {
		if ($store) {
			window.location.href = "/courses"
		} else {
			window.location.href = "/login"
		}
	}

</script>

<svelte:head>
	<title>ScholarLabs</title>
	<meta name="description" content="ScholarLabs for Students" />
</svelte:head>

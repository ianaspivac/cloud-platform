<script>
	import token from "$lib/stores/token.js"
	import { browser } from "$app/environment"
	import { redirect } from "@sveltejs/kit"

	if (browser) {
		if ($token) {
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

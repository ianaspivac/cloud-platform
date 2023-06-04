<script>
	import Header from './Header.svelte';
	import '../styles/styles.scss';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<!-- <p>ScholarLabs</p> -->
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
		padding: 15px 25px;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>

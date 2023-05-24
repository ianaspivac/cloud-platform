<script>
	import '../styles/header.scss'
	import { browser } from "$app/environment"
	import token from '$lib/stores/token'
	import { goto } from '$app/navigation';

	function logout() {
		token.update(() => "")
		goto("/")
	}
</script>

<header>
	<div class="header-container">
		<div class="application-name">
			<a href="/">
				ScholarLabs
			</a>
		</div>
	
		<nav>
			<ul><li><a href="/courses">All courses</a></li>
				{#if $token}
					<li><a href="/environments">My environments</a></li>
					<li><a href="/enrolled-courses">Enrolled courses</a></li>
					<li><a href="/created-courses">Created courses</a></li>
					<li><a href="/account">Account</a></li>
					<li class="btn-container red-fill"><button on:click={logout}>Logout</button></li>
				{/if}
			</ul>
		</nav>
	</div>
</header>


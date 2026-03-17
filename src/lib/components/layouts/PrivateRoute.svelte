<script>
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/authStore.svelte';
	const { children } = $props();

	$effect(() => {
		if (!authStore.isLoggedIn && !authStore.isLoading) {
			goto('/auth/login');
		}
	});
</script>

{#if authStore.isLoading}
	<div>
		<h1>Loading</h1>
	</div>
{:else if authStore.isLoggedIn}
	<main>
		{@render children()}
	</main>
{/if}

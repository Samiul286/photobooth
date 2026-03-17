<script lang="ts">
	import favicon from '$lib/assets/logo.webp';

	let { children } = $props();
  import "../app.css";
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

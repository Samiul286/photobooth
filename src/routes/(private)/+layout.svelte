<script lang="ts">
	import PrivateRoute from '$lib/components/layouts/PrivateRoute.svelte';
	import type { Snippet } from 'svelte';
	const { children }: { children?: Snippet } = $props();
</script>

<PrivateRoute>
	{@render children?.()}
</PrivateRoute>

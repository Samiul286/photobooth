<script>
	import { authStore } from '$lib/stores/authStore.svelte';
	let profileUser = $derived(
		`Username: ${authStore.userProfile?.username} and fullname: ${authStore.userProfile?.fullname}`
	);
</script>

<h1>{profileUser}</h1>

<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Data statistik dummy
	let stats = $state({
		totalPhotos: 42,
		favorites: 18,
		albums: 6,
		recentUploads: 5
	});

	let recentPhotos = $state([
		// 	{
		// 		id: 1,
		// 		url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0',
		// 		caption: 'Sunset at Beach',
		// 		date: '2024-01-15',
		// 		likes: 24
		// 	},
		// 	{
		// 		id: 2,
		// 		url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
		// 		caption: 'Mountain Adventure',
		// 		date: '2024-01-14',
		// 		likes: 18
		// 	},
		// 	{
		// 		id: 3,
		// 		url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
		// 		caption: 'City Lights',
		// 		date: '2024-01-13',
		// 		likes: 32
		// 	},
		// 	{
		// 		id: 4,
		// 		url: 'https://images.unsplash.com/photo-1492684223066-e9e4aab4d25e',
		// 		caption: 'Festival Moments',
		// 		date: '2024-01-12',
		// 		likes: 15
		// 	},
		// 	{
		// 		id: 5,
		// 		url: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455',
		// 		caption: 'Coffee Date',
		// 		date: '2024-01-11',
		// 		likes: 28
		// 	}
	]);

	let albums = $state([
		{
			id: 1,
			name: 'Beach Vacation',
			count: 12,
			cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
		},
		{
			id: 2,
			name: 'Birthday Party',
			count: 8,
			cover: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622'
		},
		{
			id: 3,
			name: 'Mountain Trip',
			count: 15,
			cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
		},
		{
			id: 4,
			name: 'City Adventures',
			count: 7,
			cover: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000'
		}
	]);

	// Check authentication
	onMount(() => {
		if (!authStore.isLoggedIn) {
			goto('/login');
		}
	});

	// Logout function
	const handleLogout = () => {
		authStore.logout();
	};

	// Format date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	};
</script>

<svelte:head>
	<title>Dashboard | Photobooth Memories</title>
	<meta name="description" content="Your personal photobooth dashboard" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
	<!-- Header -->
	<header class="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="p-2 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl">
						<svg
							class="w-6 h-6 text-white"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M16 8V8.01"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
					<div>
						<h1 class="text-xl font-bold text-purple-900">Photobooth Memories</h1>
						<p class="text-xs text-pink-600">Dashboard</p>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<div class="hidden md:flex items-center gap-3 px-4 py-2 bg-pink-50 rounded-full">
						<div
							class="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium"
						>
							{authStore.userProfile?.username?.charAt(0).toUpperCase() || 'U'}
						</div>
						<div>
							<p class="text-sm font-medium text-purple-900">
								{authStore.userProfile?.fullname || 'User'}
							</p>
							<p class="text-xs text-pink-600">@{authStore.userProfile?.username || 'username'}</p>
						</div>
					</div>

					<button
						on:click={handleLogout}
						class="flex items-center gap-2 px-4 py-2 text-sm text-pink-700 hover:text-pink-900
						       bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors duration-200"
					>
						<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M16 17L21 12L16 7"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M21 12H9"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="hidden md:inline">Logout</span>
					</button>
				</div>
			</div>
		</div>
	</header>

	<main class="container mx-auto px-4 py-6 md:py-8">
		<!-- Welcome Section -->
		<div class="mb-8">
			<div
				class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-6 md:p-8 border border-pink-200/50"
			>
				<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div>
						<h2 class="text-2xl md:text-3xl font-bold text-purple-900 mb-2">
							Welcome back, {authStore.userProfile?.fullname || 'Beautiful'}! ✨
						</h2>
						<p class="text-pink-700">
							Your memories are waiting. Explore your special moments captured forever.
						</p>
					</div>
					<button
						class="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700
					              text-white font-medium rounded-xl shadow-lg shadow-pink-500/25
					              hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2
					              whitespace-nowrap"
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12 5V19"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M5 12H19"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Upload New Photo
					</button>
				</div>
			</div>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
			<!-- Total Photos Card -->
			<div
				class="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow duration-300"
			>
				<div class="flex items-center justify-between mb-4">
					<div class="p-3 bg-pink-100 rounded-xl">
						<svg
							class="w-6 h-6 text-pink-600"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M22 12V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H10"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
					<span class="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
						+3 new
					</span>
				</div>
				<h3 class="text-3xl font-bold text-purple-900 mb-1">{stats.totalPhotos}</h3>
				<p class="text-pink-600">Total Photos</p>
			</div>

			<!-- Favorites Card -->
			<div
				class="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow duration-300"
			>
				<div class="flex items-center justify-between mb-4">
					<div class="p-3 bg-rose-100 rounded-xl">
						<svg
							class="w-6 h-6 text-rose-600"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
				<h3 class="text-3xl font-bold text-purple-900 mb-1">{stats.favorites}</h3>
				<p class="text-pink-600">Favorite Photos</p>
			</div>

			<!-- Albums Card -->
			<div
				class="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow duration-300"
			>
				<div class="flex items-center justify-between mb-4">
					<div class="p-3 bg-purple-100 rounded-xl">
						<svg
							class="w-6 h-6 text-purple-600"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M9 3V21"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M16 8H12"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M16 12H12"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
				<h3 class="text-3xl font-bold text-purple-900 mb-1">{stats.albums}</h3>
				<p class="text-pink-600">Photo Albums</p>
			</div>

			<!-- Recent Uploads Card -->
			<div
				class="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow duration-300"
			>
				<div class="flex items-center justify-between mb-4">
					<div class="p-3 bg-amber-100 rounded-xl">
						<svg
							class="w-6 h-6 text-amber-600"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 6V12L16 14"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
				<h3 class="text-3xl font-bold text-purple-900 mb-1">{stats.recentUploads}</h3>
				<p class="text-pink-600">Recent Uploads</p>
			</div>
		</div>

		<!-- Content Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
			<!-- Recent Photos Section -->
			<div class="lg:col-span-2">
				<div class="flex items-center justify-between mb-6">
					<h3 class="text-xl font-bold text-purple-900">Recent Photos</h3>
					<a
						href="/photos"
						class="text-sm text-pink-600 hover:text-pink-800 font-medium flex items-center gap-1"
					>
						View All
						<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M9 18L15 12L9 6"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</a>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
					{#each recentPhotos as photo}
						<div
							class="bg-white rounded-2xl overflow-hidden shadow-sm border border-pink-100 hover:shadow-lg transition-all duration-300 group"
						>
							<div class="relative h-48 md:h-56 overflow-hidden">
								<img
									src={photo.url}
									alt={photo.caption}
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<div class="absolute top-3 right-3">
									<button
										class="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
									>
										<svg
											class="w-5 h-5 text-rose-500"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
												fill="currentColor"
												stroke="currentColor"
												stroke-width="1"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</button>
								</div>
								<div
									class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4"
								>
									<h4 class="text-white font-medium text-lg">{photo.caption}</h4>
									<p class="text-white/80 text-sm">{formatDate(photo.date)}</p>
								</div>
							</div>
							<div class="p-4">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4">
										<div class="flex items-center gap-1 text-pink-600">
											<svg
												class="w-4 h-4"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
											<span class="text-sm font-medium">{photo.likes}</span>
										</div>
										<div class="flex items-center gap-1 text-blue-600">
											<svg
												class="w-4 h-4"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
											<span class="text-sm font-medium">3</span>
										</div>
									</div>
									<button class="text-sm text-pink-600 hover:text-pink-800 font-medium">
										View Details
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Sidebar -->
			<div class="space-y-6 md:space-y-8">
				<!-- Albums Section -->
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
					<div class="flex items-center justify-between mb-6">
						<h3 class="text-xl font-bold text-purple-900">Your Albums</h3>
						<a href="/albums" class="text-sm text-pink-600 hover:text-pink-800 font-medium">
							See All
						</a>
					</div>

					<div class="space-y-4">
						{#each albums as album}
							<div
								class="flex items-center gap-4 p-3 rounded-xl hover:bg-pink-50 transition-colors duration-200 group cursor-pointer"
							>
								<div class="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
									<img
										src={album.cover}
										alt={album.name}
										class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
									/>
								</div>
								<div class="flex-1 min-w-0">
									<h4 class="font-medium text-purple-900 truncate">{album.name}</h4>
									<p class="text-sm text-pink-600">{album.count} photos</p>
								</div>
								<svg
									class="w-5 h-5 text-pink-400 group-hover:text-pink-600 transition-colors"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9 18L15 12L9 6"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						{/each}
					</div>

					<button
						class="w-full mt-6 py-3 border-2 border-dashed border-pink-300 text-pink-600
					              hover:border-pink-400 hover:text-pink-700 rounded-xl font-medium
					              transition-colors duration-200 flex items-center justify-center gap-2"
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12 5V19"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M5 12H19"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Create New Album
					</button>
				</div>

				<!-- Quick Actions -->
				<div class="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 text-white">
					<h3 class="text-xl font-bold mb-4">Quick Actions</h3>
					<div class="space-y-3">
						<button
							class="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
						>
							<div class="p-2 bg-white/20 rounded-lg">
								<svg
									class="w-5 h-5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 5V19"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M5 12H19"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<span class="font-medium">Upload Photos</span>
						</button>

						<button
							class="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
						>
							<div class="p-2 bg-white/20 rounded-lg">
								<svg
									class="w-5 h-5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M9 3V21"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<span class="font-medium">Create Album</span>
						</button>

						<button
							class="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
						>
							<div class="p-2 bg-white/20 rounded-lg">
								<svg
									class="w-5 h-5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<span class="font-medium">View Favorites</span>
						</button>

						<button
							class="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
						>
							<div class="p-2 bg-white/20 rounded-lg">
								<svg
									class="w-5 h-5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M21 12.79C21 18.43 15.96 22 12 22C8.04 22 3 18.43 3 12.79C3 7.15 8.04 4 12 4C15.96 4 21 7.15 21 12.79Z"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<span class="font-medium">Print Photos</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Recent Activity -->
		<div class="mt-8 md:mt-12">
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-xl font-bold text-purple-900">Recent Activity</h3>
				<button class="text-sm text-pink-600 hover:text-pink-800 font-medium">
					View All Activity
				</button>
			</div>

			<div class="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
				<div class="space-y-4">
					<div
						class="flex items-center gap-4 p-3 hover:bg-pink-50 rounded-xl transition-colors duration-200"
					>
						<div class="p-2 bg-green-100 rounded-lg">
							<svg
								class="w-5 h-5 text-green-600"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 5V19"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M5 12H19"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<div class="flex-1">
							<p class="text-purple-900">
								You uploaded <span class="font-medium">"Beach Sunset"</span> to
								<span class="font-medium">"Vacation Album"</span>
							</p>
							<p class="text-sm text-pink-600">2 hours ago</p>
						</div>
					</div>

					<div
						class="flex items-center gap-4 p-3 hover:bg-pink-50 rounded-xl transition-colors duration-200"
					>
						<div class="p-2 bg-rose-100 rounded-lg">
							<svg
								class="w-5 h-5 text-rose-600"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<div class="flex-1">
							<p class="text-purple-900">
								You liked <span class="font-medium">"Mountain Adventure"</span> photo
							</p>
							<p class="text-sm text-pink-600">Yesterday</p>
						</div>
					</div>

					<div
						class="flex items-center gap-4 p-3 hover:bg-pink-50 rounded-xl transition-colors duration-200"
					>
						<div class="p-2 bg-blue-100 rounded-lg">
							<svg
								class="w-5 h-5 text-blue-600"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<div class="flex-1">
							<p class="text-purple-900">
								You created a new album <span class="font-medium">"Birthday Memories"</span>
							</p>
							<p class="text-sm text-pink-600">2 days ago</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="mt-12 py-6 border-t border-pink-100">
		<div class="container mx-auto px-4">
			<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div class="text-center md:text-left">
					<div class="flex items-center justify-center md:justify-start gap-2 mb-2">
						<svg
							class="w-5 h-5 text-pink-600"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M16 8V8.01"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="text-purple-900 font-medium">Photobooth Memories</span>
					</div>
					<p class="text-sm text-pink-600">Capturing your special moments since 2024</p>
				</div>
				<div class="flex items-center justify-center gap-6">
					<a href="#" class="text-sm text-pink-600 hover:text-pink-800">Privacy</a>
					<a href="#" class="text-sm text-pink-600 hover:text-pink-800">Terms</a>
					<a href="#" class="text-sm text-pink-600 hover:text-pink-800">Help</a>
				</div>
			</div>
		</div>
	</footer>
</div>

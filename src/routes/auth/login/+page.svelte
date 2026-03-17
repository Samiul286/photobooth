<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { login } from '$lib/service/api';
	import { authStore } from '$lib/stores/authStore.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let username = $state<string>('');
	let password = $state<string>('');
	let isLoading = $state<boolean>(false);
	let errorMessage = $state<string>('');
	let showPassword = $state<boolean>(false);

	onMount(() => {
		if (authStore.isLoggedIn) {
			goto('/dashboard');
		}
	});

	function validateInput(): boolean {
		if (!username.trim() || !password.trim()) {
			errorMessage = 'Please enter both username and password';
			return false;
		}
		errorMessage = '';
		return true;
	}

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		if (!validateInput()) {
			return;
		}

		isLoading = true;
		errorMessage = '';

		try {
			const result = await login(username, password);
			authStore.login(result.token);
		} catch (error: any) {
			console.error('Login error:', error);
			errorMessage = error.message || 'Login failed. Please check your credentials.';
		} finally {
			isLoading = false;
		}
	};
</script>

<svelte:head>
	<title>Login | Photobooth</title>
	<meta name="description" content="Login to access your photobooth memories" />
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-4 md:p-6 relative overflow-hidden"
>
	<!-- Background decorations -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div
			class="absolute -top-32 -right-24 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-purple-200/10 rounded-full blur-2xl"
		></div>
		<div
			class="absolute -bottom-24 -left-16 w-64 h-64 bg-gradient-to-br from-pink-300/20 to-rose-200/10 rounded-full blur-2xl"
		></div>
		<div
			class="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-200/20 to-pink-200/10 rounded-full blur-2xl"
		></div>

		<!-- Polaroid frame decoration -->
		<div
			class="hidden lg:block absolute top-1/4 left-10 w-48 h-60 bg-white p-3 rounded shadow-lg rotate-12 opacity-70"
		>
			<div class="w-full h-40 bg-gradient-to-br from-pink-300 to-pink-400 rounded-sm mb-3"></div>
			<div class="text-center font-['Brush_Script_MT'] text-lg text-gray-700 opacity-80">
				Special Moments
			</div>
		</div>

		<div
			class="hidden lg:block absolute bottom-1/4 right-10 w-40 h-52 bg-white p-3 rounded shadow-lg -rotate-6 opacity-60"
		>
			<div
				class="w-full h-32 bg-gradient-to-br from-purple-300 to-purple-400 rounded-sm mb-3"
			></div>
			<div class="text-center font-['Brush_Script_MT'] text-base text-gray-700 opacity-80">
				Cherished Times
			</div>
		</div>
	</div>

	<!-- Login Card -->
	<div
		class="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/80 w-full max-w-md p-8 md:p-10 z-10"
	>
		<!-- Logo Section -->
		<div class="text-center mb-8">
			<div
				class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full shadow-lg mb-4"
			>
				<svg
					class="w-8 h-8 text-white"
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
			<h1 class="text-2xl md:text-3xl font-bold text-purple-900 mb-2 tracking-tight">
				Photobooth Memories
			</h1>
			<p class="text-pink-700/80 text-sm md:text-base">Sign in to view your special moments</p>
		</div>

		<!-- Login Form -->
		<form on:submit={handleSubmit} class="space-y-6">
			<!-- Username Input -->
			<div class="space-y-2">
				<label for="username" class="block text-sm font-medium text-purple-800"> Username </label>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg
							class="h-5 w-5 text-pink-500"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
					<input
						id="username"
						type="text"
						bind:value={username}
						name="username"
						placeholder="Enter your username"
						required
						disabled={isLoading}
						class="block w-full pl-10 pr-4 py-3 border border-pink-200 rounded-xl bg-white/50
						       text-gray-900 placeholder-pink-400/60 focus:outline-none focus:ring-2
						       focus:ring-pink-300 focus:border-pink-400 transition-all duration-200
						       disabled:opacity-60 disabled:cursor-not-allowed"
					/>
				</div>
			</div>

			<!-- Password Input -->
			<div class="space-y-2">
				<div class="flex justify-between items-center">
					<label for="password" class="block text-sm font-medium text-purple-800"> Password </label>
					<button
						type="button"
						on:click={() => (showPassword = !showPassword)}
						class="text-xs text-pink-600 hover:text-pink-800 px-2 py-1 rounded-lg hover:bg-pink-50 transition-colors"
						tabindex="-1"
					>
						{showPassword ? 'Hide' : 'Show'}
					</button>
				</div>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg
							class="h-5 w-5 text-pink-500"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
					<input
						id="password"
						type={showPassword ? 'text' : 'password'}
						bind:value={password}
						name="password"
						placeholder="Enter your password"
						required
						disabled={isLoading}
						class="block w-full pl-10 pr-4 py-3 border border-pink-200 rounded-xl bg-white/50
						       text-gray-900 placeholder-pink-400/60 focus:outline-none focus:ring-2
						       focus:ring-pink-300 focus:border-pink-400 transition-all duration-200
						       disabled:opacity-60 disabled:cursor-not-allowed"
					/>
				</div>
			</div>

			<!-- Error Message -->
			{#if errorMessage}
				<div
					role="alert"
					class="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
				>
					<svg
						class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 8V12"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12 16H12.01"
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
					<p class="text-sm text-red-700">{errorMessage}</p>
				</div>
			{/if}

			<!-- Submit Button -->
			<button
				type="submit"
				disabled={isLoading}
				aria-busy={isLoading}
				class="w-full py-3.5 px-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700
				       text-white font-medium rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-xl
				       hover:shadow-pink-500/30 transform hover:-translate-y-0.5 active:translate-y-0
				       transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
				       disabled:hover:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-2"
			>
				{#if isLoading}
					<svg
						class="animate-spin h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<span>Logging in...</span>
				{:else}
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10 17L15 12L10 7"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M15 12H3"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<span>Login</span>
				{/if}
			</button>
		</form>

		<!-- Footer Note -->
		<div class="mt-8 pt-6 border-t border-pink-200 text-center">
			<p class="text-sm text-pink-600/70 italic">A special space for your cherished memories</p>
		</div>

		<!-- Floating hearts decoration -->
		<div
			class="absolute -top-2 -right-2 w-4 h-4 bg-pink-300 rounded-full animate-ping opacity-20"
		></div>
		<div
			class="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-30"
		></div>
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	const imgs = [
		'/slider/slide1.webp',
		'/slider/slide2.webp',
		'/slider/slide3.webp',
		'/slider/slide4.webp'
	];

	let slide = $state(0);
	let direction = $state(1);
	let interval: any;
	let isHovering = $state(false);
	let isLoaded = $state(false);

	const startAutoplay = () => {
		interval = setInterval(() => {
			nextSlide();
		}, 5000);
	};

	const resetTimer = () => {
		clearInterval(interval);
		if (!isHovering) startAutoplay();
	};

	const nextSlide = () => {
		direction = 1;
		slide = (slide + 1) % imgs.length;
		resetTimer();
	};

	const prevSlide = () => {
		direction = -1;
		slide = (slide - 1 + imgs.length) % imgs.length;
		resetTimer();
	};

	const goToSlide = (index: number) => {
		direction = index > slide ? 1 : -1;
		slide = index;
		resetTimer();
	};

	const tryPhotobooth = () => {
		goto('/photobooth');
	};

	onMount(() => {
		isLoaded = true;
		startAutoplay();
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Photobooth For You 💞</title>
	<meta name="description" content="Photoboth for my love" />
</svelte:head>

<div class="min-h-dvh w-full bg-linear-to-br from-rose-50 via-white to-lavender-100 p-4 md:p-0">
	<div class="max-w-7xl mx-auto min-h-dvh flex flex-col justify-center">
		<!-- Main Content -->
		<section class="relative">
			<!-- Background Decorative Elements -->
			<div class="absolute inset-0 overflow-hidden pointer-events-none">
				<div
					class="absolute top-20 left-10 w-64 h-64 bg-linear-to-r from-rose-200/30 to-pink-200/20 rounded-full blur-3xl"
				></div>
				<div
					class="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-l from-purple-200/30 to-blue-200/20 rounded-full blur-3xl"
				></div>
			</div>

			<div class="relative z-10">
				<div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
					<!-- Text Content - More Romantic and Personal -->
					<div class="lg:w-2/5 text-center lg:text-left space-y-8">
						<div class="space-y-4" in:fade={{ duration: 800 }}>
							<h1 class="text-5xl md:text-6xl lg:text-7xl font-light text-gray-800 leading-tight">
								Capture
								<span class="block font-serif italic text-rose-600">Love's Sweetest</span>
								<span class="block font-bold">Moments</span>
							</h1>

							<div class="space-y-4">
								<p class="text-xl text-gray-600 font-light leading-relaxed">
									A special photobooth created with love, to preserve every precious smile, every
									tender glance, and every beautiful memory we share.
								</p>
								<p class="text-lg text-gray-500 italic">
									"For every moment that makes my heart skip a beat"
								</p>
							</div>
						</div>

						<div class="space-y-6" in:fade={{ delay: 300, duration: 800 }}>
							<!-- CTA Buttons -->
							<div class="flex flex-col sm:flex-row gap-4">
								<a
									href="/photobooth"
									class="group px-8 py-4 bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-medium text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-6 group-hover:scale-110 transition-transform"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
										/>
									</svg>
									<span>Create Our Memory</span>
								</a>

								<a
									href="/gallery"
									class="px-8 py-4 border-2 border-rose-300 text-rose-600 rounded-2xl font-medium hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 cursor-pointer"
								>
									View Our Gallery
								</a>
							</div>

							<!-- Romantic Quote -->
							<div class="pt-6 border-t border-rose-100">
								<p class="text-gray-500 text-sm">
									❤️ Every photograph tells our story, every smile captured is a promise kept
								</p>
							</div>
						</div>
					</div>

					<!-- Slider Container - Enhanced Visuals -->
					<div class="lg:w-3/5 relative">
						<div
							role="region"
							aria-label="Photo slider"
							class="relative group"
							onmouseenter={() => {
								isHovering = true;
								clearInterval(interval);
							}}
							onmouseleave={() => {
								isHovering = false;
								startAutoplay();
							}}
						>
							<!-- Main Slider Frame -->
							<div
								class="relative overflow-hidden rounded-3xl shadow-2xl bg-linear-to-br from-white to-rose-50 p-6 lg:p-8"
							>
								<!-- Polaroid Style Frame Effect -->
								<div
									class="absolute inset-4 border-8 border-white/80 rounded-2xl pointer-events-none"
								></div>
								<div
									class="absolute inset-6 border border-rose-200/50 rounded-xl pointer-events-none"
								></div>

								<div class="relative aspect-4/3 overflow-hidden rounded-xl">
									{#key slide}
										<img
											in:fly={{
												x: direction * 600,
												duration: 800,
												easing: (t) => t * (2 - t)
											}}
											out:fly={{
												x: direction * -600,
												duration: 800,
												easing: (t) => t * (2 - t)
											}}
											src={imgs[slide]}
											alt="Our beautiful memory {slide + 1}"
											class="absolute inset-0 h-full w-full object-cover"
										/>
									{/key}

									<div
										class="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent"
									></div>
								</div>

								<div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
									{#each imgs as _, i}
										<button
											onclick={() => goToSlide(i)}
											class="w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 {i ===
											slide
												? 'bg-white w-6 shadow-sm'
												: 'bg-[#eaeaea] hover:bg-rose-400'}"
											aria-label={`Go to memory ${i + 1}`}
										></button>
									{/each}
								</div>
							</div>

							<button
								onclick={prevSlide}
								class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 group/nav"
								aria-label="Previous memory"
							>
								<div
									class="p-3 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group-hover/nav:-translate-x-1"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-6 text-rose-600 group-hover/nav:scale-110 transition-transform"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15.75 19.5 8.25 12l7.5-7.5"
										/>
									</svg>
								</div>
							</button>

							<button
								onclick={nextSlide}
								class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 group/nav"
								aria-label="Next memory"
							>
								<div
									class="p-3 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group-hover/nav:translate-x-1"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-6 text-rose-600 group-hover/nav:scale-110 transition-transform"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="m8.25 4.5 7.5 7.5-7.5 7.5"
										/>
									</svg>
								</div>
							</button>
						</div>

						<div class="mt-6 text-center">
							<p class="text-gray-600 italic">
								{#if slide === 0}
									"That first smile that captured my heart"
								{:else if slide === 1}
									"Every laugh, a melody I never want to forget"
								{:else if slide === 2}
									"In your eyes, I found my home"
								{:else if slide === 3}
									"Moments turned into forever memories"
								{/if}
							</p>
						</div>
					</div>
				</div>
				{#if isLoaded}
					<div class="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-8 opacity-50">
						{#each Array(3) as _, i}
							<div class="text-2xl animate-bounce" style={`animation-delay: ${i * 0.2}s`}>❤️</div>
						{/each}
					</div>
				{/if}
			</div>
		</section>
	</div>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	img {
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
	}
</style>

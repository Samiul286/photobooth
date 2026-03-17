<script lang="ts">
	import { onMount } from 'svelte';
	import { scale, fade } from 'svelte/transition';

	const backgrounds = ['/photobooth/bg1.webp', '/photobooth/bg2.webp', '/photobooth/bg3.webp'];
	let selectedBg = $state(backgrounds[0]);
	let videoElement: HTMLVideoElement;
	let canvasExport: HTMLCanvasElement;
	let stream: MediaStream | null = $state(null);
	let capturedImages: string[] = $state([]);
	let isCountingDown = $state(false);
	let countdown = $state(3);
	let isProcessing = $state(false);

	const startCamera = async () => {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			alert('Browser Anda tidak mendukung akses kamera.');
			return;
		}

		try {
			const constraints = {
				video: {
					aspectRatio: 3 / 2,
					width: { ideal: 1280 },
					facingMode: 'user'
				},
				audio: false
			};

			stream = await navigator.mediaDevices.getUserMedia(constraints);

			if (videoElement) {
				videoElement.srcObject = stream;
				videoElement.play().catch((e) => console.error('Autoplay failed:', e));
			}
		} catch (err: any) {
			console.error('Detail Error Kamera:', err);

			if (err.name === 'NotAllowedError') {
				alert('Izin ditolak. Mohon aktifkan izin kamera di pengaturan browser.');
			} else if (err.name === 'NotFoundError') {
				alert('Kamera tidak ditemukan pada perangkat ini.');
			} else {
				alert('Gagal mengakses kamera: ' + err.message);
			}
		}
	};

	const startSession = async () => {
		capturedImages = [];
		for (let i = 0; i < 4; i++) {
			await runCountdown();
			captureToBuffer();
		}
	};

	const runCountdown = () => {
		return new Promise((resolve) => {
			isCountingDown = true;
			countdown = 3;
			const timer = setInterval(() => {
				countdown--;
				if (countdown === 0) {
					clearInterval(timer);
					isCountingDown = false;
					resolve(true);
				}
			}, 1000);
		});
	};

	const captureToBuffer = () => {
		const tempCanvas = document.createElement('canvas');
		tempCanvas.width = videoElement.videoWidth;
		tempCanvas.height = videoElement.videoHeight;
		const ctx = tempCanvas.getContext('2d');
		if (ctx) {
			ctx.translate(tempCanvas.width, 0);
			ctx.scale(-1, 1);
			ctx.drawImage(videoElement, 0, 0);
			capturedImages = [...capturedImages, tempCanvas.toDataURL('image/webp')];
		}
	};

	const downloadResult = async () => {
		if (capturedImages.length < 4) return;
		isProcessing = true;

		const ctx = canvasExport.getContext('2d');
		const bgImg = new Image();
		bgImg.src = selectedBg;

		bgImg.onload = async () => {
			const stripWidth = 450;
			const padding = 25;
			const gap = 15;
			const photoW = stripWidth - padding * 2;
			const photoH = photoW * (2 / 3);
			const totalHeight = photoH * 4 + gap * 3 + padding * 2 + 80;

			canvasExport.width = stripWidth;
			canvasExport.height = totalHeight;

			if (ctx) {
				ctx.drawImage(bgImg, 0, 0, stripWidth, totalHeight);
				ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
				ctx.fillRect(0, 0, stripWidth, totalHeight);

				for (let i = 0; i < capturedImages.length; i++) {
					const img = new Image();
					img.src = capturedImages[i];
					await new Promise((r) => (img.onload = r));

					const posX = padding;
					const posY = padding + i * (photoH + gap);

					const imgRatio = img.width / img.height;
					const targetRatio = photoW / photoH;
					let sX, sY, sW, sH;

					if (imgRatio > targetRatio) {
						sH = img.height;
						sW = img.height * targetRatio;
						sX = (img.width - sW) / 2;
						sY = 0;
					} else {
						sW = img.width;
						sH = img.width / targetRatio;
						sX = 0;
						sY = (img.height - sH) / 2;
					}

					ctx.save();
					ctx.shadowColor = 'rgba(0,0,0,0.3)';
					ctx.shadowBlur = 10;
					ctx.shadowOffsetY = 5;
					ctx.beginPath();
					ctx.roundRect(posX, posY, photoW, photoH, 5);
					ctx.clip();
					ctx.drawImage(img, sX, sY, sW, sH, posX, posY, photoW, photoH);
					ctx.restore();
				}
			}

			const link = document.createElement('a');
			link.download = `photobooth-${Date.now()}.jpg`;
			link.href = canvasExport.toDataURL('image/jpeg', 0.95);
			link.click();
			isProcessing = false;
		};
	};

	onMount(() => {
		startCamera();
		return () => stream?.getTracks().forEach((t) => t.stop());
	});
</script>

<svelte:head>
	<title>Capture The Moment 📸</title>
	<meta name="description" content="Photoboth for my love | Capture the moment" />
</svelte:head>

<div
	class="min-h-dvh bg-linear-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex flex-col items-center justify-center"
>
	<div class="mb-8 text-center">
		<h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Photo Booth Studio</h1>
		<p class="text-gray-600">Capture your memories in 4 beautiful shots</p>
	</div>

	<div class="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start">
		<div class="lg:w-1/4 space-y-6">
			<div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
				<h2 class="text-lg font-semibold text-gray-800 mb-3">Select Background</h2>
				<div class="space-y-3">
					{#each backgrounds as bg, i}
						<button
							onclick={() => (selectedBg = bg)}
							class="w-full group relative overflow-hidden rounded-lg transition-all duration-200 {selectedBg ===
							bg
								? 'ring-2 ring-purple-500 ring-offset-2'
								: 'hover:ring-1 hover:ring-gray-300'}"
						>
							<div class="aspect-3/2 relative overflow-hidden rounded-md">
								<img
									src={bg}
									alt="Background option"
									class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								{#if selectedBg === bg}
									<div class="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
								{/if}
							</div>
							<p class="mt-2 text-sm text-gray-600 text-center">
								Background {i + 1}
							</p>
						</button>
					{/each}
				</div>
			</div>

			<div
				class="bg-white rounded-xl p-4 shadow-sm border border-gray-200 bg-center bg-cover"
				style="background-image: url({selectedBg});"
			>
				<h2 class="text-lg font-semibold text-gray-800 mb-3">Your Photos</h2>
				<div class="space-y-4">
					{#each Array(4) as _, i}
						<div class="relative group">
							<div class="aspect-3/2 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
								{#if capturedImages[i]}
									<img
										src={capturedImages[i]}
										alt="Captured photo {i + 1}"
										class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
									/>
								{:else}
									<div class="w-full h-full flex items-center justify-center text-gray-400">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-8 w-8"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1"
												d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1"
												d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									</div>
								{/if}
							</div>
							<div class="mt-1 text-xs text-gray-500 text-center">
								Photo {i + 1}
							</div>
						</div>
					{/each}
				</div>

				{#if capturedImages.length === 4}
					<button
						onclick={downloadResult}
						disabled={isProcessing}
						class="w-full mt-6 px-4 py-3 bg-linear-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{#if isProcessing}
							<svg
								class="animate-spin h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							<span>Processing...</span>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								/>
							</svg>
							<span>Download Photo Strip</span>
						{/if}
					</button>
				{/if}
			</div>
		</div>

		<div class="lg:w-3/4">
			<div class="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
				<div class="relative aspect-3/2 overflow-hidden rounded-xl bg-black shadow-inner">
					<video
						bind:this={videoElement}
						autoplay
						playsinline
						class="w-full h-full object-cover scale-x-[-1]"
					></video>

					{#if isCountingDown}
						<div
							class="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
							in:fade
						>
							<div
								class="text-white text-8xl md:text-9xl font-bold"
								transition:scale={{ duration: 300 }}
							>
								{countdown}
							</div>
						</div>
					{/if}

					<div
						class="absolute top-4 right-4 flex items-center gap-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm"
					>
						<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
						<span>Camera Active</span>
					</div>
				</div>

				<div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
					<button
						onclick={startSession}
						disabled={isCountingDown || (capturedImages.length > 0 && capturedImages.length < 4)}
						class="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<span class="text-lg">Start Photo Session</span>
					</button>

					{#if capturedImages.length > 0}
						<button
							onclick={() => (capturedImages = [])}
							class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
							Clear Photos
						</button>
					{/if}
				</div>

				<div class="mt-6 text-center">
					<div
						class="inline-flex items-center gap-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-lg"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-purple-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>The camera will take 4 photos with a 3-second countdown each</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-8 text-center text-sm text-gray-500">
		<p>Your photos are processed locally and not stored on our servers</p>
	</div>

	<canvas bind:this={canvasExport} class="hidden"></canvas>
</div>

<style>
	/* Custom scrollbar for background selection if needed */
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}

	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #a1a1a1;
	}
</style>

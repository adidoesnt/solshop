<script lang="ts">
	import { goto } from '$app/navigation';
	import config from '$lib/config.json';

	let isHovering = $state(false);

	async function handleLogoClick() {
		const logo = document.getElementById('main-logo');
		logo?.classList.add('scale-out');
		await new Promise((resolve) => setTimeout(resolve, 500));
		await goto('/trending');
	}

	const testimonials1 = [
		{
			name: 'Alex Thompson',
			role: 'Verified Buyer',
			image: 'https://i.pravatar.cc/150?img=1',
			text: 'The quality of products here is outstanding. Best shopping experience ever!',
			rating: 5
		},
		{
			name: 'Sarah Chen',
			role: 'Regular Customer',
			image: 'https://i.pravatar.cc/150?img=2',
			text: 'Fast delivery and excellent customer service. Will definitely shop again!',
			rating: 5
		},
		{
			name: 'Michael Rodriguez',
			role: 'Verified Buyer',
			image: 'https://i.pravatar.cc/150?img=3',
			text: 'Great prices and amazing selection. Highly recommended!',
			rating: 4
		}
		// Add more to ensure continuous scroll
	];

	const testimonials2 = [
		{
			name: 'Emma Wilson',
			role: 'Fashion Blogger',
			image: 'https://i.pravatar.cc/150?img=4',
			text: 'The attention to detail and quality is remarkable. A must-visit store!',
			rating: 5
		},
		{
			name: 'James Lee',
			role: 'Tech Enthusiast',
			image: 'https://i.pravatar.cc/150?img=5',
			text: 'Innovative products and seamless shopping experience. Love it!',
			rating: 5
		},
		{
			name: 'Lisa Martinez',
			role: 'Verified Buyer',
			image: 'https://i.pravatar.cc/150?img=6',
			text: 'The customer support is exceptional. They go above and beyond!',
			rating: 4
		}
		// Add more to ensure continuous scroll
	];
</script>

<main class="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
	<div class="container mx-auto px-4">
		<section class="flex h-screen items-center justify-center">
			<div class="animate-fade-in mx-auto max-w-4xl space-y-8 text-center">
				<button
					id="main-logo"
					onclick={handleLogoClick}
					onmouseenter={() => (isHovering = true)}
					onmouseleave={() => (isHovering = false)}
					class="inline-block transition-all duration-300 hover:scale-110 {isHovering
						? 'animate-pulse'
						: ''}"
				>
					<h1
						class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-7xl font-bold text-transparent"
					>
						{config.name}
					</h1>
				</button>
				<p class="text-2xl text-gray-300">{config.description}</p>
			</div>
		</section>
	</div>
</main>

<section class="overflow-hidden bg-gray-900 py-20 text-white">
	<div class="mb-12 text-center">
		<h2 class="font-display mb-4 text-4xl font-bold">What Our Customers Say</h2>
		<p class="text-gray-400">Join thousands of satisfied customers who trust us</p>
	</div>

	<!-- First row - scrolling right -->
	<div class="relative">
		<div
			class="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-gray-900 to-transparent"
		></div>
		<div
			class="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-gray-900 to-transparent"
		></div>
		<div class="animate-scroll-right flex">
			{#each [...testimonials1, ...testimonials1] as testimonial}
				<div class="mx-4 w-80 flex-none p-6">
					<div class="rounded-lg bg-gray-800 p-6">
						<div class="mb-4 flex items-center">
							<img
								src={testimonial.image}
								alt={testimonial.name}
								class="mr-4 h-12 w-12 rounded-full"
							/>
							<div>
								<h3 class="font-semibold">{testimonial.name}</h3>
								<p class="text-sm text-gray-400">{testimonial.role}</p>
							</div>
						</div>
						<div class="mb-2 flex">
							{#each Array(testimonial.rating) as _}
								<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
									/>
								</svg>
							{/each}
						</div>
						<p class="text-gray-300">{testimonial.text}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Second row - scrolling left -->
	<div class="relative mt-8">
		<div
			class="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-gray-900 to-transparent"
		></div>
		<div
			class="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-gray-900 to-transparent"
		></div>
		<div class="animate-scroll-left flex">
			{#each [...testimonials2, ...testimonials2] as testimonial}
				<div class="mx-4 w-80 flex-none p-6">
					<div class="rounded-lg bg-gray-800 p-6">
						<div class="mb-4 flex items-center">
							<img
								src={testimonial.image}
								alt={testimonial.name}
								class="mr-4 h-12 w-12 rounded-full"
							/>
							<div>
								<h3 class="font-semibold">{testimonial.name}</h3>
								<p class="text-sm text-gray-400">{testimonial.role}</p>
							</div>
						</div>
						<div class="mb-2 flex">
							{#each Array(testimonial.rating) as _}
								<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
									/>
								</svg>
							{/each}
						</div>
						<p class="text-gray-300">{testimonial.text}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.animate-fade-in {
		opacity: 0;
		animation: fadeIn 1s ease-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes scaleOut {
		from {
			transform: scale(1);
			opacity: 1;
		}
		to {
			transform: scale(1.5);
			opacity: 0;
		}
	}

	button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	@keyframes scroll-right {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	@keyframes scroll-left {
		0% {
			transform: translateX(-50%);
		}
		100% {
			transform: translateX(0);
		}
	}

	.animate-scroll-right {
		animation: scroll-right 40s linear infinite;
	}

	.animate-scroll-left {
		animation: scroll-left 40s linear infinite;
	}

	/* Pause animation on hover */
	.animate-scroll-right:hover,
	.animate-scroll-left:hover {
		animation-play-state: paused;
	}
</style>

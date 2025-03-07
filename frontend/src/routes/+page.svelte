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
</style>

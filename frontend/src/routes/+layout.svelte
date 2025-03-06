<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	const isLandingPage = $derived(page.url.pathname === '/');

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
					await navigation.complete;
				});
			});
	});
</script>

{#if !isLandingPage}
	<div class="flex min-h-[100dvh]">
		<Sidebar />
		<div class="ml-64 flex-1 flex flex-col">
			<Header />
			<main class="container mx-auto px-6 py-8 bg-gray-700 flex-1 text-white">
				{@render children()}
			</main>
		</div>
	</div>
{:else}
	{@render children()}
{/if}

<script lang="ts">
	import type { PageData } from './$types';
	import ProductGrid from '../products/ProductGrid.svelte';
	import { fade } from 'svelte/transition';

	const { data }: { data: PageData } = $props();
	const { products } = data;

	const uniqueProducts = $derived(
		products.filter(
			(product: any, index: any, self: any) =>
				self.findIndex((t: any) => t.id === product.id) === index
		)
	);

	let maxQuantities = $derived(
		Object.fromEntries(
			products.map((product: { id: number; stock: number }) => [product.id, product.stock])
		)
	);

	let showToast = $state(false);
	let toastMessage = $state('');

	function handleAddToCart(event: CustomEvent) {
		const { product, quantity } = event.detail;
		const maxQuantity = maxQuantities[product.id];
		if (quantity > maxQuantity) {
			toastMessage = `Cannot add more than ${maxQuantity} items`;
			showToast = true;
			setTimeout(() => {
				showToast = false;
			}, 3000);
			return;
		}
		if (product.stock - quantity >= 0) {
			toastMessage = `Added ${quantity} ${product.name} to cart`;
			showToast = true;
			setTimeout(() => {
				showToast = false;
			}, 3000);
		}
	}
</script>

{#if showToast}
	<div
		transition:fade
		class="fixed top-4 right-4 z-50 rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg"
	>
		{toastMessage}
	</div>
{/if}

<div class="min-h-screen py-8">
	<div class="container mx-auto bg-inherit px-4">
		<h1 class="font-display mb-8 text-3xl font-bold">Recommended For You</h1>

		<ProductGrid products={Array.from(uniqueProducts)} onAddToCart={handleAddToCart} />
	</div>
</div>

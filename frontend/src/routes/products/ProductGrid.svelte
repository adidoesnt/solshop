<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import ProductDetails from './ProductDetails.svelte';
	import { addToCart } from '$lib/stores/cart';

	const { products, onAddToCart } = $props();

	let quantities = $state<Array<number>>(products.map(() => 1));
	let selectedProduct = $state<any>(null);
	let showModal = $state(false);

	function handleAddToCart(product: any) {
		addToCart(product.id, quantities[product.id], product.name, product.price);
		onAddToCart({
			detail: {
				product,
				quantity: quantities[product.id]
			}
		});
		quantities[product.id] = 1;
		showModal = false;
	}

	function openProductDetails(product: any) {
		console.log('openProductDetails', product);
		selectedProduct = product;
		showModal = true;
	}
</script>

<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
	{#each products as product (product.id)}
		<div class="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
			<div class="relative">
				<button
					type="button"
					class="block w-full"
					onclick={openProductDetails.bind(null, product)}
				>
					<img src={product.image} alt={product.name} class="h-48 w-full object-cover" />
					<div class="absolute top-2 right-2">
						<span
							class="rounded-full px-2 py-1 text-xs font-semibold text-white {product.stockBadgeColor}"
						>
							{product.stockBadgeText}
						</span>
					</div>
				</button>
			</div>
			<div class="p-4">
				<h3 class="font-display mb-2 text-lg font-semibold text-black">{product.name}</h3>
				<p class="mb-2 text-sm text-gray-600">{product.shortDescription}</p>
				<div class="flex items-center justify-between">
					<span class="font-bold text-purple-600">${product.price}</span>
					<span class="text-sm text-gray-500">{product.stock} in stock</span>
				</div>
				<div class="mt-4 flex items-center justify-end gap-2">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="text-sm text-gray-600">Quantity:</label>
					<input
						type="number"
						bind:value={quantities[product.id]}
						min="1"
						max={product.maxQuantity}
						disabled={product.stock === 0}
						class="w-20 rounded-lg border border-gray-300 px-2 py-1 text-black focus:border-purple-500 focus:outline-none disabled:opacity-50"
					/>
				</div>
				<button
					class="mt-4 w-full rounded-lg bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700"
					onclick={() => handleAddToCart(product)}
				>
					Add to Cart
				</button>
			</div>
		</div>
	{/each}
</div>

{#if showModal && selectedProduct}
	<Modal isOpen={showModal} onClose={() => (showModal = false)}>
		<ProductDetails
			product={selectedProduct}
			quantity={quantities[selectedProduct.id]}
			onQuantityChange={(value: any) => (quantities[selectedProduct.id] = value)}
			onAddToCart={() => handleAddToCart(selectedProduct)}
		/>
	</Modal>
{/if}

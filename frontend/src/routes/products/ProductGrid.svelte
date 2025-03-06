<script lang="ts">
	const { products, onAddToCart } = $props();
	import { addToCart } from '$lib/stores/cart';

	let quantities = $state<Array<number>>(products.map(() => 1));

	const onclick = (product: any) => {
		addToCart(product.id, quantities[product.id], product.name, product.price);
		onAddToCart({
			detail: {
				product,
				quantity: quantities[product.id]
			}
		});
		quantities[product.id] = 1;
	};
</script>

<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
	{#each products as product (product.id)}
		<div class="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
			<img src={product.image} alt={product.name} class="h-48 w-full object-cover" />
			<div class="p-4">
				<h3 class="font-display mb-2 text-lg font-semibold">{product.name}</h3>
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
						class="w-20 rounded-lg border border-gray-300 px-2 py-1 text-black focus:border-purple-500 focus:outline-none"
					/>
				</div>
				<button
					class="mt-4 w-full rounded-lg bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700"
					onclick={onclick?.bind(null, product)}
				>
					Add to Cart
				</button>
			</div>
		</div>
	{/each}
</div>

<script lang="ts">
	export let products: any[];
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
				<button
					class="mt-4 w-full rounded-lg bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700"
				>
					Add to Cart
				</button>
			</div>
		</div>
	{/each}
</div>

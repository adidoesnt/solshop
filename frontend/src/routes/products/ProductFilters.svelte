<script lang="ts">
	let { onchange, searchQuery, minPrice, maxPrice, itemsPerPage } = $props();

	function handleChange() {
		onchange({
			detail: {
				search: searchQuery,
				minPrice,
				maxPrice,
				itemsPerPage
			}
		});
	}
</script>

<div class="mb-8 rounded-lg bg-white text-black p-4 shadow-md">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<div>
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="mb-1 block text-sm font-medium text-gray-700"> Search </label>
			<input
				type="text"
				bind:value={searchQuery}
				oninput={handleChange}
				placeholder="Search products..."
				class="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
			/>
		</div>

		<div>
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="mb-1 block text-sm font-medium text-gray-700"> Min Price </label>
			<input
				type="number"
				bind:value={minPrice}
				oninput={handleChange}
				min="0"
				class="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
			/>
		</div>

		<div>
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="mb-1 block text-sm font-medium text-gray-700"> Max Price </label>
			<input
				type="number"
				bind:value={maxPrice}
				oninput={handleChange}
				min="0"
				class="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
			/>
		</div>

		<div>
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="mb-1 block text-sm font-medium text-gray-700"> Items per page </label>
			<input
				type="number"
				bind:value={itemsPerPage}
				oninput={handleChange}
				min="1"
				class="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
			/>
		</div>
	</div>
</div>

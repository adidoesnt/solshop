<script lang="ts">
	const { currentPage, totalPages, onPageChange } = $props();

	const pages = $derived(Array.from({ length: totalPages }, (_, i) => i + 1));

	function getVisiblePages() {
		if (totalPages <= 7) return pages;

		if (currentPage <= 4) {
			return [...pages.slice(0, 5), '...', totalPages];
		}

		if (currentPage >= totalPages - 3) {
			return [1, '...', ...pages.slice(totalPages - 5)];
		}

		return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
	}
</script>

<div class="flex items-center justify-center space-x-2">
	<button
		class="rounded-lg px-3 py-1 bg-gray-500 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-500"
		disabled={currentPage === 1}
		onclick={() => onPageChange(currentPage - 1)}
	>
		Previous
	</button>

	{#each getVisiblePages() as page}
		{#if page === '...'}
			<span class="px-3 py-1">...</span>
		{:else}
			<button
				class="rounded-lg px-3 py-1 {currentPage === page
					? 'bg-purple-600 text-white'
					: 'bg-gray-200 hover:bg-gray-300'}"
				onclick={() => onPageChange(page)}
			>
				{page}
			</button>
		{/if}
	{/each}

	<button
		class="rounded-lg px-3 py-1 bg-gray-500 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-500"
		disabled={currentPage === totalPages}
		onclick={() => onPageChange(currentPage + 1)}
	>
		Next
	</button>
</div>

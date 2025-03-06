<script lang="ts">
	import ProductGrid from './ProductGrid.svelte';
	import ProductFilters from './ProductFilters.svelte';
	import Pagination from './Pagination.svelte';
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	const { data }: { data: PageData } = $props();
	const { products } = data;

	let searchQuery = $state('');
	let minPrice = $state();
	let maxPrice = $state();

	let currentPage = $state(1);
	let itemsPerPage = $state(8);
	let showToast = $state(false);
	let toastMessage = $state('');

	let filteredProducts = $derived(
		products.filter((product: any) => {
			const matchesSearch =
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesPrice =
				product.price >= (minPrice ?? 0) && product.price <= (maxPrice ?? Number.MAX_SAFE_INTEGER);
			return matchesSearch && matchesPrice;
		})
	);

	let startIndex = $derived((currentPage - 1) * itemsPerPage);
	let endIndex = $derived(Math.min(startIndex + itemsPerPage, filteredProducts.length));
	let paginatedProducts = $derived(filteredProducts.slice(startIndex, endIndex));

	let totalPages = $derived(Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage)));
	let showPagination = $derived(filteredProducts.length > itemsPerPage);

	let displayStart = $derived(startIndex + 1);
	let displayEnd = $derived(endIndex);
	let totalItems = $derived(filteredProducts.length);

	function handlePageChange(page: number) {
		currentPage = page;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function handleFiltersChange({ detail }: CustomEvent) {
		searchQuery = detail.search;
		minPrice = detail.minPrice;
		maxPrice = detail.maxPrice;
		itemsPerPage = detail.itemsPerPage;
		currentPage = 1;
	}

	function handleAddToCart(event: CustomEvent) {
		const { product, quantity } = event.detail;
		toastMessage = `Added ${quantity} ${product.name} to cart`;
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 3000);
	}
</script>

<div class="min-h-screen bg-inherit">
	{#if showToast}
		<div transition:fade class="fixed right-4 top-4 z-50 rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg">
			{toastMessage}
		</div>
	{/if}

	<ProductFilters
		{searchQuery}
		{minPrice}
		{maxPrice}
		{itemsPerPage}
		onchange={handleFiltersChange}
	/>

	<div class="mb-4 text-sm text-gray-400">
		Showing {displayStart}-{displayEnd} of {totalItems} products
	</div>

	<ProductGrid products={paginatedProducts} onAddToCart={handleAddToCart} />

	{#if showPagination}
		<div class="mt-8">
			<Pagination {currentPage} {totalPages} onPageChange={handlePageChange} />
		</div>
	{/if}
</div>

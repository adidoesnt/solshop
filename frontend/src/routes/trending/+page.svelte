<script lang="ts">
	import type { PageData } from "./$types";

	const { data }: { data: PageData } = $props();
	const { products } = data;
</script>

<h1>Trending</h1>

<ul>
	{#each products as product}
		<li>{product.name}</li>
	{/each}
</ul>

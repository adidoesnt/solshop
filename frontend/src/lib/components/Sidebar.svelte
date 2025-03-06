<script lang="ts">
	import { page } from '$app/state';

	const navigation = [
		{ name: 'Products', href: '/products', icon: '🛍️' },
		{ name: 'Cart', href: '/cart', icon: '🛒' },
		{ name: 'Orders', href: '/orders', icon: '📦' }
	];

	const currentPath = $derived(page.url.pathname);
</script>

<aside class="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white">
	<div class="flex h-full flex-col">
		<div class="flex h-16 items-center px-6">
			<a href="/" class="font-display text-3xl font-bold tracking-tight">Solshop</a>
		</div>

		<nav class="flex-1 space-y-1 px-3 py-4">
			{#each navigation as item}
				<a
					href={item.href}
					class="flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors {currentPath ===
					item.href
						? 'bg-purple-600'
						: 'hover:bg-gray-800'}"
				>
					<span class="mr-3">{item.icon}</span>
					<span class="font-medium tracking-wide">{item.name}</span>
				</a>
			{/each}
		</nav>
	</div>
</aside>

<script lang="ts">
	import type { PageData } from "./$types";

	const { data }: { data: PageData } = $props();
	const { orders } = data;

	let expandedOrders: Record<number, boolean> = $state({});

	function toggleOrder(orderId: number) {
		expandedOrders = {
			...expandedOrders,
			[orderId]: !expandedOrders[orderId]
		};
	}
</script>

<h1 class="mb-6 text-2xl font-bold">Order History</h1>

{#if !orders || orders.length === 0}
	<p class="text-gray-500">You have no past orders</p>
{:else}
	<table class="w-full">
		<thead>
			<tr class="text-gray-500">
				<th class="text-left">Order ID</th>
				<th class="text-left">Date</th>
				<th class="text-right">Total Price</th>
			</tr>
		</thead>
		<tbody>
			{#each orders as order}
				<tr class="border-t cursor-pointer hover:bg-gray-800" onclick={() => toggleOrder(order.id)}>
					<td class="py-4 flex items-center gap-2">
						<span class="transform transition-transform duration-200" class:rotate-90={expandedOrders[order.id]}>▶</span>
						{order.id}
					</td>
					<td>{new Date(order.createdAt).toLocaleDateString()}</td>
					<td class="text-right">${order.totalPrice}</td>
				</tr>
				{#if expandedOrders[order.id]}
					<tr class="border-b bg-gray-900">
						<td colspan="3" class="px-6 py-3">
							<div class="text-md font-bold mb-2">Order Items</div>
							<div class="space-y-2">
								{#each order.items as item}
									<div class="flex justify-between items-center py-2 px-4 rounded bg-purple-900/30 hover:bg-purple-900/40 transition-colors duration-200">
										<span class="font-semibold text-purple-200">{item.name}</span>
										<span class="text-purple-300">${item.price} × {item.quantity}</span>
									</div>
								{/each}
							</div>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
{/if}
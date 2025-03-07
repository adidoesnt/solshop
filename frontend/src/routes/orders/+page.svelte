<script lang="ts">
	import type { PageData } from "./$types";

	const { data }: { data: PageData } = $props();
	const { orders } = data;
</script>

<h1 class="mb-6 text-2xl font-bold">Order History</h1>

{#if !orders || orders.length === 0}
	<p>You have no past orders</p>
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
				<tr class="border-t">
					<td class="py-4">{order.id}</td>
					<td>{new Date(order.createdAt).toLocaleDateString()}</td>
					<td class="text-right">${order.totalPrice}</td>
				</tr>
				<tr class="border-b bg-gray-900">
					<td colspan="3" class="px-4 py-2">
						<div class="text-md font-bold">Order Items:</div>
						{#each order.items as item}
							<div class="ml-4 flex justify-start py-1 gap-2">
								<span class="font-semibold">{item.name}:</span>
								<span>${item.price} x {item.quantity}</span>
							</div>
						{/each}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
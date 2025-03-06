<script lang="ts">
	import { cartStore, removeFromCart } from '$lib/stores/cart';

	let cart = $derived($cartStore);

	let total = $derived(
		cart
			.reduce((sum, item) => {
				return sum + parseFloat(item.price) * item.quantity;
			}, 0)
			.toFixed(2)
	);

	function updateQuantity(productId: number, newQuantity: number) {
		cartStore.update((items) =>
			items.map((item) =>
				item.productId === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
			)
		);
	}
</script>

<div class="cart">
	<h2>Shopping Cart</h2>

	{#if cart.length === 0}
		<p>Your cart is empty</p>
	{:else}
		<table>
			<thead>
				<tr class="text-gray-500">
					<th>Product</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Subtotal</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each cart as item}
					<tr>
						<td>{item.name}</td>
						<td>${item.price}</td>
						<td>
							<input
								type="number"
								min="1"
								bind:value={item.quantity}
								onchange={() => updateQuantity(item.productId, item.quantity)}
								class="w-20 rounded-lg border border-gray-300 px-2 py-1 text-black focus:border-purple-500 focus:outline-none"
							/>
						</td>
						<td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
						<td>
							<button
								class="rounded-lg bg-red-600 px-3 py-1 text-white transition-colors hover:bg-red-700"
								onclick={() => removeFromCart(item.productId)}
							>
								Remove
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td colspan="3">Total</td>
					<td>${total}</td>
					<td></td>
				</tr>
			</tfoot>
		</table>
	{/if}
</div>

<style>
	.cart {
		padding: 1rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}

	th,
	td {
		padding: 0.5rem;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}

	th {
		background-color: #f5f5f5;
	}

	tfoot td {
		font-weight: bold;
	}
</style>

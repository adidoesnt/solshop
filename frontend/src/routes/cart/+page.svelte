<script lang="ts">
	import { cartStore, removeFromCart, clearCart } from '$lib/stores/cart';
	import { fade } from 'svelte/transition';
	let cart = $derived($cartStore);
	let showModal = $state(false);
	let name = $state('');
	let email = $state('');
	let cardNumber = $state('');
	let expiryDate = $state('');
	let cvv = $state('');
	let processing = $state(false);

    let showToast = $state(false);
    let toastMessage = $state('');

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

	async function handleCheckout(e: SubmitEvent) {
		e.preventDefault();
		processing = true;
		
		fetch('/cart', {
			method: 'POST',
			body: JSON.stringify({
				customerName: name,
				customerEmail: email,
				items: cart,
                totalPrice: total
			})
		});
		
		clearCart();
		showModal = false;
		processing = false;

		toastMessage = 'Order placed successfully!';
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 3000);
	}
</script>

{#if showToast}
	<div transition:fade class="fixed right-4 top-4 z-50 rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg">
		{toastMessage}
	</div>
{/if}

<div class="cart">
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

		<div class="mt-6 flex justify-end">
			<button
				class="rounded-lg bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700"
				onclick={() => showModal = true}
			>
				Proceed to Checkout
			</button>
		</div>
	{/if}
</div>

{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl">
		<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<h3 class="mb-4 text-xl font-bold">Checkout</h3>
			<form onsubmit={handleCheckout} class="text-black">
                <div class="mb-4">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="mb-1 block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        required
                        bind:value={name}
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
                        placeholder="John Doe"
                    />
                </div>
				<div class="mb-4">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						required
						bind:value={email}
						class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
						placeholder="your@email.com"
					/>
				</div>
				<div class="mb-4">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="mb-1 block text-sm font-medium text-gray-700">Card Number</label>
					<input
						type="text"
						required
						bind:value={cardNumber}
						class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
						placeholder="1234 5678 9012 3456"
					/>
				</div>
				<div class="mb-4 grid grid-cols-2 gap-4">
					<div>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="mb-1 block text-sm font-medium text-gray-700">Expiry Date</label>
						<input
							type="text"
							required
							bind:value={expiryDate}
							class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
							placeholder="MM/YY"
						/>
					</div>
					<div>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="mb-1 block text-sm font-medium text-gray-700">CVV</label>
						<input
							type="text"
							required
							bind:value={cvv}
							class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
							placeholder="123"
						/>
					</div>
				</div>
				<div class="mt-6 flex justify-end gap-4">
					<button
						type="button"
						class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
						onclick={() => showModal = false}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
						disabled={processing}
					>
						{processing ? 'Processing...' : `Pay $${total}`}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

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

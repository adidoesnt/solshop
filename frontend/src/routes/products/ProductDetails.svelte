<script lang="ts">
  let { product, quantity, onQuantityChange, onAddToCart } = $props();
</script>

<div class="space-y-6">
  <div class="flex justify-center">
    <h1 class="font-display text-2xl font-bold text-gray-600">{product.name}</h1>
  </div>
  <div class="flex gap-6">
    <div class="w-1/2">
      <img
        src={product.image}
        alt={product.name}
        class="h-full w-full rounded-lg object-cover"
      />
    </div>
    <div class="w-1/2 space-y-4">
      <h2 class="font-display text-2xl font-bold">{product.name}</h2>
      <p class="text-lg font-bold text-purple-600">${product.price}</p>
      <div class="flex items-center gap-2">
        <span class="rounded-full px-2 py-1 text-xs font-semibold text-white {product.stockBadgeColor}">
          {product.stockBadgeText}
        </span>
        <span class="text-sm text-gray-500">{product.stock} in stock</span>
      </div>
      <div class="flex items-center gap-4">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="text-sm text-gray-600">Quantity:</label>
        <input
          type="number"
          bind:value={quantity}
          oninput={(e) => onQuantityChange(parseInt(e.currentTarget.value))}
          min="1"
          max={product.maxQuantity}
          disabled={product.stock === 0}
          class="w-20 rounded-lg border border-gray-300 px-2 py-1 focus:border-purple-500 focus:outline-none disabled:opacity-50"
        />
      </div>
      <button
        class="w-full rounded-lg bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
        disabled={product.stock === 0}
        onclick={() => onAddToCart()}
      >
        Add to Cart
      </button>
    </div>
  </div>

  <div class="space-y-4">
    <h3 class="font-display text-xl font-semibold">Description</h3>
    <p class="text-gray-600">{product.description}</p>
  </div>
</div> 
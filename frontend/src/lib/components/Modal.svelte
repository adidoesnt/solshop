<script lang="ts">
	let { isOpen, onClose, children } = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl p-4 border-[1px]"
		onclick={handleBackdropClick}
	>
		<div
			class="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-2xl"
		>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
				onclick={onClose}
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
			{@render children()}
		</div>
	</div>
{/if}

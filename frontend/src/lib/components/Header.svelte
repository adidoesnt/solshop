<script lang="ts">
	import { page } from '$app/state';
</script>

<header class="flex h-16 items-center bg-gray-800 px-6 text-white shadow-md">
	<div class="flex-1">
		<h1 class="text-xl font-semibold capitalize">
			{page.url.pathname.split('/')[1]}
		</h1>
	</div>
</header>

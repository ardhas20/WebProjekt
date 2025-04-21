<script>
	const { message } = $props();
</script>

{#if message}
	<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
		<p>{message}</p>
	</div>
{/if}
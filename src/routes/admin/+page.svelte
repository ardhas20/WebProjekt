<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	const { data } = $props();
</script>

<div class="p-6 max-w-5xl mx-auto space-y-6">
	<h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

	<form action="/logout?/logout" method="POST">
		<button type="submit" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
			Logout
		</button>
	</form>

	<div class="flex gap-4 mt-4">
		<a href="/admin/new" class="text-blue-600 hover:underline">+ Create a new article</a>
		<a href="/" class="text-blue-600 hover:underline">← Back Home</a>
	</div>

	<div class="grid gap-6">
		{#each data.articles as article (article.id)}
			<div transition:slide class="p-4 bg-white rounded-xl shadow space-y-3">
				<img src={article.image} alt="file" class="rounded-md max-h-64 w-full object-cover" />
				<p class="text-gray-700">
					<span class="font-semibold">ID:</span> {article.id}<br>
					<span class="font-semibold">Description:</span> {article.description}<br>
					<span class="font-semibold">Author:</span> {article.author}<br>
					<span class="font-semibold">Votes:</span> {article.votes}
				</p>

				<form action="?/deleteArticle" method="POST" use:enhance>
					<input type="hidden" name="id" value={article.id} />
					<button type="submit" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
						Delete
					</button>
				</form>
			</div>
		{/each}
	</div>
</div>
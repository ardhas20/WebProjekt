<script>
	const { data } = $props();
</script>

<a href="/" class="text-blue-600 hover:underline ml-4 mt-6 inline-block">← Back Home</a>

<div class="space-y-10 p-6 max-w-4xl mx-auto">
	{#each data.articles as article (article.id)}
		<div transition:slide class="bg-white p-6 rounded-xl shadow-md space-y-4">
			<img src={article.image} alt="file" class="rounded-lg w-full max-h-96 object-cover" />
			<p class="text-gray-700">
				<span class="font-semibold">Description:</span> {article.description}<br>
				<span class="font-semibold">Author:</span> {article.author}
			</p>

			<form action="?/vote" method="POST" use:enhance>
				<input type="hidden" name="id" value={article.id} />
				<button type="submit" aria-label="Vote article" class="hover:scale-110 transition">
					<img src="https://apodtkmttxw3p43e.public.blob.vercel-storage.com/ProjectImages/upvote-uEp8XwXNnTgJ96L0c7LzYFTTfFVXqs.svg" alt="vote" class="w-8 h-8" />
				</button>
			</form>

			<p class="text-gray-800">Votes: <span class="font-semibold">{article.votes}</span></p>

			<div class="bg-gray-50 p-4 rounded-lg">
				<h4 class="text-lg font-semibold mb-2">Comments</h4>

				<div class="space-y-1 mb-4 text-sm text-gray-700">
					{#each data.comments as comment}
						<p><span class="font-medium">{comment.name}:</span> {comment.text}</p>
					{/each}
				</div>

				<form action="?/comm" method="POST" use:enhance class="space-y-3">
					<input type="hidden" name="id" value={article.id} />

					<div>
						<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
						<input type="text" name="name" required class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
					</div>

					<div>
						<label for="comm" class="block text-sm font-medium text-gray-700">Comment</label>
						<textarea name="comm" required class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
					</div>

					<button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
						Add Comment
					</button>
				</form>
			</div>
		</div>
	{/each}
</div>
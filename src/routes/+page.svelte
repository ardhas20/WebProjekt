<script>
	const { data } = $props();
</script>

<h1 class="text-4xl font-bold text-center my-8 text-blue-700">InstaBlog</h1>

<div class="grid gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
	{#each data.articles as article (article.id)}
		<div
			class="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl"
			transition:slide
		>
			<a href={`articles/${article.id}`}>
				<img src={article.image} alt="file" class="w-full h-48 object-cover" />
			</a>
			<div class="p-4 flex justify-between items-center">
				<span class="text-gray-600 font-medium">Votes:</span>
				<span class="text-blue-600 font-semibold">{article.votes}</span>
			</div>
		</div>
	{/each}
</div>
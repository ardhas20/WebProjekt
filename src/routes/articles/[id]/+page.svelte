<script>
    const { data } = $props();
</script>

<div>
	{#each data.articles as article (article.id)}
		<div transition:slide>
            <img src={article.image} alt="file">
            <p>Description: {article.description} - Author: {article.author}</p>
			<p>Votes: {article.votes}</p>
		</div>
	{/each}
</div>
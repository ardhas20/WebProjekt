<script>
    const { data } = $props();
</script>

<h1>InstaBlog</h1>

<div>
	{#each data.articles as article (article.id)}
		<div transition:slide>
            <img src={article.image} alt="file">
			<p>Votes: {article.votes}</p>
		</div>
	{/each}
</div>
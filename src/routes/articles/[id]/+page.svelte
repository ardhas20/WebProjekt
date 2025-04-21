<script>
    const { data } = $props();
</script>

<div>
	{#each data.articles as article (article.id)}
		<div transition:slide>
            <img src={article.image} alt="file">
            <p>Description: {article.description} - Author: {article.author}</p>
            <form action="?/vote" method="POST" use:enhance>
                <input type="hidden" name="id" value={article.id} />
                <button type="submit" aria-label="Vote article" class="transition hover:scale-110">
                    <img src="https://apodtkmttxw3p43e.public.blob.vercel-storage.com/ProjectImages/upvote-uEp8XwXNnTgJ96L0c7LzYFTTfFVXqs.svg" alt="vote">
                </button>
            </form>
			<p>Votes: {article.votes}</p>
		</div>
	{/each}
</div>
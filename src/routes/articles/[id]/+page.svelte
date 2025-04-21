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
            <div>
				<h4>Comments</h4>

				<div>
					{#each data.comments as comment}
						<p>
							<span>{comment.name}: </span>
							{comment.text}
						</p>
					{/each}
				</div>
				<form action="?/comm" method="POST" use:enhance>
					<input type="hidden" name="id" value={article.id} />

					<div>
						<label for="name">Name</label>
						<input type="text" name="name" required/>
					</div>

					<div>
						<label for="comm">Comment</label>
						<textarea name="comm" required></textarea>
					</div>

					<button type="submit" >Add Comment</button>
				</form>
			</div>
		</div>
	{/each}
</div>
<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	const { data } = $props();
</script>


<h1>Admin dashboard</h1>

<form action="/logout?/logout" method="POST">
    <button type="submit">Logout</button>
</form>

<a href="/admin/new">Create a new article</a>

<div>
	{#each data.articles as article (article.id)}
		<div transition:slide>
            <img src={article.image} alt="file">
			<p>ID: {article.id} - Description: {article.description} - Author: {article.author} - Votes: {article.votes}</p>
			<form action="?/deleteArticle" method="POST" use:enhance>
				<input type="hidden" name="id" value={article.id} />
				<button type="submit">Delete</button>
			</form>
		</div>
	{/each}
</div>
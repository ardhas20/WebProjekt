<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning1.svelte';
	import { slide } from 'svelte/transition';
	const { data } = $props();
</script>


<h1>Admin dashboard</h1>

<a href="/admin/new">Create a new article</a>

<div>
	{#each data.articles as article (article.id)}
		<div transition:slide>
			<p>ID: {article.id} - Description: {article.description} - Author: {article.author} - Votes: {article.votes}</p>
			<form action="?/deleteArticle" method="POST" use:enhance>
				<input type="hidden" name="id" value={article.id} />
				<button type="submit">Delete</button>
			</form>
		</div>
	{/each}
</div>
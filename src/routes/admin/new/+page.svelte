<script>
	let { data } = $props();
</script>

<div class="max-w-xl mx-auto p-6 space-y-6">
	<h1 class="text-3xl font-bold text-gray-800">Create a New Article</h1>

	<a href="/admin" class="text-blue-600 hover:underline">← Back to Admin</a>

	<form method="POST" action="?/createArticle" enctype="multipart/form-data" class="space-y-4 bg-white p-6 rounded-xl shadow">
		<div>
			<label for="image" class="block font-semibold mb-1">Image</label>
			<input type="file" name="file" class="block w-full file:rounded file:border file:border-gray-300 file:py-2 file:px-4 file:text-sm file:bg-gray-100 hover:file:bg-gray-200" />
		</div>

		<div>
			<label for="description" class="block font-semibold mb-1">Description</label>
			<textarea name="description" rows="4" placeholder="Enter description..." class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
		</div>

		<div>
			<label for="author" class="block font-semibold mb-1">Author</label>
			<input type="text" name="author" placeholder="Author name" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
		</div>

		<button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
			Create Article
		</button>
	</form>
</div>
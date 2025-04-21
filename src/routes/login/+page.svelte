<script>
	import { enhance } from "$app/forms";
	import Warning1 from "$lib/components/Warning1.svelte";
	export let form;
</script>

<div class="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
	<h2 class="text-2xl font-semibold text-center mb-6 text-blue-700">Login</h2>

	<form action="?/login" method="POST" use:enhance class="space-y-4">
		<div>
			<label for="email" class="block text-sm font-medium text-gray-700">E-Mail</label>
			<input
				type="text"
				name="email"
				id="email"
				required
				class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				required
				class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
		</div>

		<button
			type="submit"
			class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
		>
			Login
		</button>

		{#if form}
			<Warning1 message={form.message} />
		{/if}
	</form>
</div>
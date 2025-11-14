<script>
	import '../app.css';
	import { m } from '$lib/paraglide/messages';
	import { setLocale, getLocale } from '$lib/paraglide/runtime';

	let { children } = $props();

	// Available languages
	const languages = [
		{ code: "en", label: "English" },
		{ code: "de", label: "Deutsch" },
		{ code: "sq", label: "Shqip" }
	];

	// Change language function
	function changeLanguage(lang) {
		if (lang !== getLocale()) {
			setLocale(lang);
		}
	}
</script>

<!-- Language Switcher UI -->
<div class="flex gap-4 p-4">
	{#each languages as lang}
		<button
			class="px-3 py-1 rounded border 
			        {getLocale() === lang.code 
					? 'bg-blue-600 text-white border-blue-700' 
					: 'bg-gray-100 text-gray-700 border-gray-300'}"
			on:click={() => changeLanguage(lang.code)}
		>
			{lang.label}
		</button>
	{/each}
</div>

{@render children()}

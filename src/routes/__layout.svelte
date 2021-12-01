<script>
	import { prefetchRoutes } from '$app/navigation';
	import { page } from '$app/stores';
	import Emoji from '$lib/components/Emoji.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount, setContext } from 'svelte';
	import 'virtual:windi.css';

	const embeded = Boolean($page.query.get('iframe'));
	setContext('embeded', embeded);

	onMount(() => {
		prefetchRoutes(['/', '/ville/*']);
	});

	let pageHeight;
	const inIframe = typeof window !== 'undefined' && window.self !== window.top;
	$: if (inIframe) {
		console.log(pageHeight);
		window.parent.postMessage({ kind: 'resize-height', value: pageHeight });
	}
</script>

<div class="px-4 sm:px-8 h-screen flex flex-col" bind:offsetHeight={pageHeight}>
	{#if !embeded}
		<header class="mt-8 block w-full max-w-screen-md m-auto">
			<a href="/" class="text-3xl font-bold cursor-pointer">
				Mes<span class="text-green-800">Aides</span>Vélo
				<sup class="text-sm text-gray-400">[béta]</sup>
				<Emoji emoji="🚲" className="-mt-2" />
			</a>
			<p class="text-gray-800 mt-1 max-w-sm">Trouvez les aides à l’achat d’un vélo</p>
		</header>
	{/if}
	<div class="pb-6 {!embeded ? 'flex-1' : ''}">
		<slot />
	</div>
	<Footer />
</div>

<style>
	:global(body) {
		min-height: 100vh;
	}
</style>

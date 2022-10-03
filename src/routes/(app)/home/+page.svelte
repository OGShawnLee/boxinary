<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinition, CardExample } from "$lib/components";

	export let data: PageData;

	const { currentUser, definitions, examples } = data;
</script>

<svelte:head>
	<title>Home / Boxinary</title>
</svelte:head>

<h1 class="sr-only">Home</h1>

<main class="grid items-start gap-9 lg:grid-cols-12">
	<section class="grid gap-9 lg:col-span-8">
		<h2 class="text-2xl text-white font-semibold">Definitions</h2>
		<div class="grid gap-6">
			{#each definitions as definition (definition.id)}
				<CardDefinition {definition} />
			{/each}
		</div>
	</section>
	<section class="grid gap-9 lg:col-span-4">
		<h2 class="text-2xl text-white font-semibold">
			<a
				class="hover:(text-aqua-50 underline)"
				href="{currentUser.displayName}/dictionary/examples"
				title="View your Examples"
				data-sveltekit-prefetch
			>
				Examples
			</a>
		</h2>
		<div class="grid gap-6 @md:grid-cols-2">
			{#each examples as example}
				<CardExample isDedicated {...example} displayName={currentUser.displayName} />
			{/each}
		</div>
	</section>
</main>

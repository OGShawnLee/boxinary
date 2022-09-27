<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinition, CardExample } from "$lib/components";

	export let data: PageData;

	const { currentUser, definitions, examples } = data;
</script>

<svelte:head>
	<title>Boxinary / Home</title>
</svelte:head>

<h1 class="sr-only">Home</h1>

<main class="grid items-start grid-cols-12 gap-9">
	<section class="col-span-8 | grid gap-9">
		<h2 class="text-2xl text-white font-semibold">Definitions</h2>
		<div class="grid gap-6">
			{#each definitions as definition (definition.id)}
				<CardDefinition {definition} />
			{/each}
		</div>
	</section>
	<section class="col-span-4 | grid gap-9">
		<h2 class="text-2xl text-white font-semibold">Examples</h2>
		<div class="grid gap-6">
			{#each examples as example}
				<CardExample isDedicated {...example} displayName={currentUser.displayName} />
			{/each}
		</div>
	</section>
</main>

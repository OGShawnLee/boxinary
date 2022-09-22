<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinition } from "$lib/components";

	export let data: PageData;

	const { author, definitions } = data;
</script>

<svelte:head>
	<title>{data.author.name} (@{author.displayName}) Dictionary / Boxinary</title>
</svelte:head>

<div class="grid gap-9">
	<h1 class="text-2xl text-white font-bold">{author.displayName} Dictionary</h1>
	<main class="grid gap-6">
		{#each definitions as definition (definition.id)}
			<CardDefinition {definition} />
		{/each}
	</main>
</div>

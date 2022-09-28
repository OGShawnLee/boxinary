<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinition } from "$lib/components";

	export let data: PageData;

	const { definitions, foundUser } = data;
</script>

<svelte:head>
	<title>{foundUser.name} (@{foundUser.displayName}) Dictionary / Boxinary</title>
</svelte:head>

<div class="grid gap-9">
	<h1 class="text-2xl text-white font-bold">{foundUser.displayName} Dictionary</h1>
	<main class="grid gap-6">
		{#each definitions as definition (definition.id)}
			<CardDefinition {definition} />
		{/each}
	</main>
</div>

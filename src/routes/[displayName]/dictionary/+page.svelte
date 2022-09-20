<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinition } from "$lib/components";

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.user?.name} (@{data.user?.displayName}) Dictionary / Boxinary</title>
</svelte:head>

<div class="grid gap-9">
	<h1 class="text-2xl text-white font-bold">{data.user?.displayName} Dictionary</h1>
	<main class="grid gap-6">
		{#each data.definitions as definition (definition.id)}
			<CardDefinition {definition} />
		{/each}
	</main>
</div>

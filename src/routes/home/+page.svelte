<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinition } from "$lib/components";

	export let data: PageData;
</script>

<svelte:head>
	<title>Boxinary / Home</title>
</svelte:head>

<h1 class="sr-only">Home</h1>

<main>
	<section class="grid gap-8">
		<h2 class="text-2xl text-white font-semibold">Dictionary</h2>
		<div class="grid gap-6">
			{#each data.definitions as definition (definition.id)}
				<CardDefinition {definition} />
			{/each}
		</div>
	</section>
</main>

<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinition, InputGroup } from "$lib/components";
	import { plural } from "$lib/utils";

	export let data: PageData;

	const { name, results } = data;
</script>

<svelte:head>
	{#if name}
		<title>Showing results for "{name}" / Boxinary</title>
	{:else}
		<title>Search / Boxinary</title>
	{/if}
</svelte:head>

<h1 class="sr-only">{name ? `Showing results for ${name}` : "Search"}</h1>

<div class="grid gap-12">
	<div class="grid gap-9">
		<form class="flex items-end gap-3">
			<InputGroup id="name" label="Search Definitions" icon="bx bx-search" value={name} />
			<button class="button button--aqua | h-12 | hidden md:block" type="submit"> Search </button>
		</form>
		<main class="grid gap-3">
			{#if name}
				<h2>
					Showing <b class="text-rich-90"> {results.length} </b>
					{plural("result", results.length)} for "<b class="text-rich-90">{name}</b>"
				</h2>
			{/if}
			<div class="grid gap-6">
				{#each results as { id, definition, name, user: { displayName } } (id)}
					<CardDefinition {displayName} {definition} {name} />
				{/each}
			</div>
		</main>
	</div>
</div>

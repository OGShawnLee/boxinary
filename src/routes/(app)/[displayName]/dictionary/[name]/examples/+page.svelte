<script lang="ts">
	import type { PageData } from "./$types";
	import { CardExample, Heading } from "$lib/components";
	import { currentUser } from "@root/state";
	import { page } from "$app/stores";
	import { getDefinitionExampleAddPath } from "$lib/utils";

	export let data: PageData;

	const { definition, examples } = data;
	const displayName = definition.user.displayName;
	const isOwner = $currentUser?.displayName === displayName;
	const path = $page.url.pathname;
</script>

<svelte:head>
	<title>{definition.name} Examples / Boxinary</title>
</svelte:head>

<div class="grid gap-9">
	<Heading class="flex flex-wrap items-center justify-between gap-3" text={definition.definition}>
		<b class="medium">Examples</b> of
		<b class="bold">{definition.name}</b>
		<svelte:fragment slot="right-side">
			{#if isOwner}
				<a
					class="button button--raisin grid-center | w-full mt-1.5 | sm:max-w-[fit-content]"
					href={getDefinitionExampleAddPath(displayName, definition.name)}
				>
					Add Example
				</a>
			{/if}
		</svelte:fragment>
	</Heading>
	<main class="grid gap-6 | sm:grid-cols-2 lg:grid-cols-3">
		{#each examples as example}
			<CardExample isDedicated {...example} {displayName} redirect={path} />
		{/each}
	</main>
</div>

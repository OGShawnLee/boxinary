<script lang="ts">
	import type { PageData } from "./$types";
	import { CardCollection, CardDefinition, CardDefinitionExamples, Header } from "$lib/components";
	import { getCollectionCreatePath, getUserExamplesPath } from "$lib/utils";

	export let data: PageData;

	const { bookmarks, currentUser, collections, definitions, examples } = data;
</script>

<svelte:head>
	<title>Home / Boxinary</title>
</svelte:head>

<h1 class="sr-only">Home</h1>

<main class="grid items-start gap-9 lg:grid-cols-12">
	<div class="grid gap-9 lg:col-span-8">
		<section class="grid gap-9">
			<Header class="flex flex-wrap items-center justify-between gap-3" as="h2" title="Collections">
				<a
					class="button button--raisin grid-center"
					href={getCollectionCreatePath(currentUser.displayName)}
					slot="right-side"
				>
					Create Collection
				</a>
			</Header>
			<div class="grid gap-6">
				{#each collections as collection (collection.id)}
					<CardCollection user={currentUser} {collection} />
				{/each}
			</div>
		</section>
		<section class="grid gap-9">
			<Header class="flex items-center justify-between gap-3" as="h2" title="Definitions">
				<a
					class="button button--raisin grid-center"
					href="/{currentUser.displayName}/dictionary/definitions"
					data-sveltekit-prefetch
					slot="right-side"
				>
					See All
				</a>
			</Header>
			<div class="grid gap-6">
				{#each definitions as { id, name, definition } (id)}
					<CardDefinition displayName={currentUser.displayName} {definition} {name} />
				{/each}
			</div>
		</section>
	</div>
	<div class="grid gap-9 | lg:col-span-4">
		{#if bookmarks.length}
			<section class="grid gap-9">
				<Header as="h2" title="Bookmarks" />
				<div class="grid gap-6">
					{#each bookmarks as { definition: { id, name, definition, user } } (id)}
						<CardDefinition displayName={user.displayName} {name} {definition} />
					{/each}
				</div>
			</section>
		{/if}
		<section class="grid gap-9">
			<Header class="flex items-center justify-between gap-3" as="h2" title="Examples">
				<a
					class="button button--raisin grid-center"
					href={getUserExamplesPath(currentUser.displayName)}
					data-sveltekit-prefetch
					slot="right-side"
				>
					See All
				</a>
			</Header>
			<div class="grid items-start grid-rows-[masonry] gap-6 @md:grid-cols-2">
				<CardDefinitionExamples
					displayName={currentUser.displayName}
					definitions={examples}
					headingLevel="h3"
				/>
			</div>
		</section>
	</div>
</main>

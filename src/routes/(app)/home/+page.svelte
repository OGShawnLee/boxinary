<script lang="ts">
	import type { PageData } from "./$types";
	import { CardCollection, CardDefinition, CardDefinitionExamples } from "$lib/components";
	import { getCollectionCreatePath } from "$lib/utils";

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
			<header class="flex flex-wrap items-center justify-between gap-3">
				<h2 class="text-2xl text-white font-semibold">Collections</h2>
				<a
					class="button button--raisin grid-center"
					href={getCollectionCreatePath(currentUser.displayName)}>Create Collection</a
				>
			</header>
			<div class="grid gap-6">
				{#each collections as collection (collection.id)}
					<CardCollection user={currentUser} {collection} />
				{/each}
			</div>
		</section>
		<section class="grid gap-9">
			<h2 class="text-2xl text-white font-semibold">Definitions</h2>
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
				<h2 class="text-2xl text-white font-semibold">Bookmarks</h2>
				<div class="grid gap-6">
					{#each bookmarks as { definition: { id, name, definition, user } } (id)}
						<CardDefinition displayName={user.displayName} {name} {definition} />
					{/each}
				</div>
			</section>
		{/if}
		<section class="grid gap-9">
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

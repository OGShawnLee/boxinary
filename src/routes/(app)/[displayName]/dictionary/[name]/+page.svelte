<script lang="ts">
	import type { PageData } from "./$types";
	import { CardExample, LayoutSeparated } from "$lib/components";
	import { isEmpty } from "malachite-ui/predicate";
	import { createExamplePathing, getDefinitionExampleAddPath, UserPathing } from "$lib/utils";
	import { page } from "$app/stores";

	export let data: PageData;
	const { definition, user: currentUser, foundUser, isBookmarked } = data;

	const isOwner = currentUser?.displayName === definition.user.displayName;
	const hasExamples = !isEmpty(definition.examples);

	const path = $page.url.pathname;
	const pathing = new UserPathing(definition.user.displayName).dictionary.definition(
		definition.name
	);
</script>

<svelte:head>
	<title>{definition.name} / Boxinary</title>
</svelte:head>

<div class="grid items-start gap-12" class:lg:grid-cols-12={hasExamples}>
	<LayoutSeparated
		class="lg:col-span-8"
		{isOwner}
		title={definition.name}
		displayName={definition.user.displayName}
		createdAt={definition.createdAt}
		definition={definition.definition}
		isBigTitle
		pathing={{
			edit: { path: pathing.edit, title: "Edit Definition" },
			example: {
				path: getDefinitionExampleAddPath(definition.user.displayName, definition.name),
				title: "Add Example",
				condition: definition.examples.length === 0
			},
			$delete: { path: pathing.$delete(), title: "Delete Definition" },
			$bookmark: {
				path: pathing.$bookmark(path),
				title: `${isBookmarked ? "Remove Definition Bookmark" : "Bookmark Definition"}`,
				isBookmarked
			}
		}}
	>
		<main class="mt-1.75 | grid gap-9">
			<section class="grid gap-3">
				<h2 class="sr-only">Main Content</h2>
				<p class="text-lg text-rich-90 leading-relaxed">{definition.description}</p>
				<p class="text leading-relaxed">{definition.summary}</p>
			</section>
			{#if definition.definitions.length || isOwner}
				<section class="grid gap-6">
					<header class="flex items-center justify-between">
						<h2 class="text-xl text-white font-bold font-poppins">Definitions</h2>
						{#if isOwner}
							<a
								class="button button--raisin grid-center"
								href="/{foundUser.displayName}/dictionary/{definition.name}/definitions/add"
							>
								Add Definition
							</a>
						{/if}
					</header>
					<div class="grid gap-6">
						{#each definition.definitions as { id, definition: def, example } (id)}
							<article class="leading-relaxed">
								<h3 class="text-rich-90">{def}</h3>
								<p>
									<i>
										{example}
									</i>
								</p>
							</article>
						{/each}
					</div>
				</section>
			{/if}
		</main>
	</LayoutSeparated>
	{#if hasExamples}
		{@const pathing = createExamplePathing(definition.user.displayName).definition(definition.name)}
		<section class="grid gap-6 | lg:col-span-4">
			<header class="flex items-center justify-between gap-4.5">
				<h2 class="text-xl text-white font-medium">
					<a
						class="hover:text-aqua-50"
						href={pathing.self}
						title="View {definition.name} Examples"
						aria-label="View {definition.name} Examples"
						data-sveltekit-prefetch
					>
						Examples
					</a>
				</h2>
				{#if isOwner}
					<a class="button button--raisin grid-center | max-w-fit mt-1.5" href={pathing.add}>
						Add Example
					</a>
				{/if}
			</header>
			<div class="grid gap-3">
				{#each definition.examples as { text, source }}
					<CardExample {text} {source} displayName={definition.user.displayName} />
				{/each}
			</div>
		</section>
	{/if}
</div>

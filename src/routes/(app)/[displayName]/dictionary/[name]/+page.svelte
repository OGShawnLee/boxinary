<script lang="ts">
	import type { PageData } from "./$types";
	import { CardExample, LayoutSeparated } from "$lib/components";
	import { isEmpty } from "malachite-ui/predicate";
	import { createExamplePathing, UserPathing } from "$lib/utils";

	export let data: PageData;
	const { definition, user: currentUser } = data;

	const isOwner = currentUser?.displayName === definition.user.displayName;
	const hasExamples = !isEmpty(definition.examples);

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
		isBigAuthorText={false}
		isBigTitle
		pathing={{
			edit: { path: pathing.edit, title: "Edit Definition" },
			$delete: { path: pathing.$delete(), title: "Delete Definition" }
		}}
	>
		<main class="mt-1.75 | grid gap-3">
			<p class="text-lg text-rich-90 leading-relaxed">{definition.description}</p>
			<p class="text leading-relaxed">{definition.summary}</p>
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

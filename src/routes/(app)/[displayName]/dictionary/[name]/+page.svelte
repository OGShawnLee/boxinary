<script lang="ts">
	import type { PageData } from "./$types";
	import { CardExample } from "$lib/components";
	import { page } from "$app/stores";
	import { isEmpty } from "malachite-ui/predicate";
	import {
		createExamplePathing,
		getDefinitionDeleteAction,
		getDefinitionEditPath
	} from "$lib/utils";

	export let data: PageData;
	const { definition, user: currentUser } = data;

	const isOwner = currentUser?.displayName === definition.user.displayName;
	const path = $page.url.pathname;
	const hasExamples = !isEmpty(definition.examples);
</script>

<svelte:head>
	<title>{definition.name} / Boxinary</title>
</svelte:head>

<div class="grid items-start gap-12" class:grid-cols-12={hasExamples}>
	<main class="col-span-9 | grid gap-5">
		<header class="flex items-end">
			<div>
				<h1 class="text-4xl text-white font-bold">{definition.name}</h1>
				<span class="text-aqua-50"> {definition.definition} </span>
			</div>
			{#if isOwner}
				<div class="flex-grow flex items-center justify-end gap-6">
					<a
						class="button button--raisin grid-center"
						href={getDefinitionEditPath(currentUser.displayName, definition.name)}
						data-sveltekit-prefetch
					>
						Update Definition
					</a>
					{#if !hasExamples}
						<a
							class="button button--raisin grid-center | max-w-fit mt-1.5"
							href="{path}/examples/add"
						>
							Add Example
						</a>
					{/if}
					<form
						method="post"
						action={getDefinitionDeleteAction(currentUser.displayName, definition.name)}
					>
						<button class="button button--rose" type="submit"> Delete Definition </button>
					</form>
				</div>
			{/if}
		</header>
		<div class="grid gap-3">
			<p class="text-lg text-rich-90 leading-relaxed">{definition.description}</p>
			<p class="text leading-relaxed">{definition.summary}</p>
		</div>
	</main>
	{#if hasExamples}
		{@const pathing = createExamplePathing(definition.user.displayName).definition(definition.name)}
		<aside class="col-span-3">
			<header class="flex flex-col gap-4.5">
				<h2 class="text-xl text-white font-medium">
					<a
						class="hover:text-aqua-50"
						href={pathing.self}
						title="View {definition.name} Examples"
						data-sveltekit-prefetch
					>
						Examples
					</a>
				</h2>
				<div class="grid gap-3">
					{#each definition.examples as { text, source }}
						<CardExample {text} {source} displayName={definition.user.displayName} />
					{/each}
				</div>
				{#if isOwner}
					<a class="button button--raisin grid-center | max-w-fit mt-1.5" href={pathing.add}>
						Add Example
					</a>
				{/if}
			</header>
		</aside>
	{/if}
</div>

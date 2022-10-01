<script lang="ts">
	import type { PageData } from "./$types";
	import { CardExample } from "$lib/components";
	import { page } from "$app/stores";
	import { isEmpty } from "malachite-ui/predicate";

	export let data: PageData;
	const { definition, user: currentUser } = data;

	const isOwner = currentUser?.displayName === definition.user.displayName;
	const path = $page.url.pathname;
	const hasExamples = !isEmpty(definition.examples);
</script>

<svelte:head>
	<title>{definition.title} / Boxinary</title>
</svelte:head>

<div class="grid items-start gap-12" class:grid-cols-12={hasExamples}>
	<main class="col-span-9 | grid gap-5">
		<header class="flex items-end">
			<div>
				<h1 class="text-4xl text-white font-bold">{definition.title}</h1>
				<span class="text-aqua-50"> {definition.atomic} </span>
			</div>
			{#if isOwner}
				<div class="flex-grow flex items-center justify-end gap-6">
					<a
						class="button button--raisin grid-center"
						href="/{definition.user.displayName}/dictionary/{definition.title}/edit"
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
						action="/{definition.user.displayName}/dictionary/{definition.title}/delete"
					>
						<button class="button button--rose" type="submit"> Delete Definition </button>
					</form>
				</div>
			{/if}
		</header>
		<div class="grid gap-3">
			<p class="text-lg text-rich-90 leading-relaxed">{definition.description}</p>
			<p class="text leading-relaxed">{definition.definition}</p>
		</div>
	</main>
	{#if hasExamples}
		<aside class="col-span-3">
			<header class="flex flex-col gap-4.5">
				<h2 class="text-xl text-white font-medium">
					<a
						class="hover:text-aqua-50"
						href="{path}/examples"
						title="View {definition.title} Examples"
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
					<a
						class="button button--raisin grid-center | max-w-fit mt-1.5"
						href="{path}/examples/add"
					>
						Add Example
					</a>
				{/if}
			</header>
		</aside>
	{/if}
</div>

<script lang="ts">
	import type { PageData } from "./$types";
	import { Card, LayoutSeparated } from "$lib/components";
	import { currentUser } from "@root/state";
	import { page } from "$app/stores";
	import { UserPathing } from "$lib/utils";

	export let data: PageData;

	const { collection, foundUser } = data;
	const isOwner = $currentUser?.id === foundUser.id;
	const path = $page.url.pathname;
	const pathing = new UserPathing(foundUser.displayName);
	const collectionPath = pathing.collections.collection(collection.id);
</script>

<svelte:head>
	<title>{collection.name} Collection / Boxinary</title>
</svelte:head>

<LayoutSeparated
	{isOwner}
	title={collection.name}
	createdAt={collection.createdAt}
	displayName={foundUser.displayName}
	pathing={{
		add: { path: collectionPath.add.path, title: "Add Definitions to Collection" },
		edit: { path: collectionPath.edit, title: "Edit Collection" },
		$delete: { path: collectionPath.$delete(), title: "Delete Collection" }
	}}
>
	<main class="mt-1.75 | grid gap-12">
		<div class="grid gap-0.75 | leading-relaxed">
			<p class="text-rich-90 md:text-lg">{collection.description}</p>
			<p class="text-sm md:text-base">{collection.details}</p>
		</div>
		{#if collection.definitions.length}
			<section class="grid gap-6">
				{#if collection.definitions.length >= 5}
					<div class="flex items-center justify-between">
						<h2 class="text-xl text-white font-semibold">Definitions</h2>
						<a
							class="button button--aqua grid-center"
							href={collectionPath.play}
							data-sveltekit-prefetch
						>
							Play
						</a>
					</div>
				{:else}
					<h2 class="text-xl text-white font-semibold">Definitions</h2>
				{/if}
				<div class="grid gap-6 | lg:grid-cols-2 xl:grid-cols-3">
					{#each collection.definitions as { definition: { id, name, definition, createdAt } } (id)}
						{@const definitionPath = pathing.dictionary.definition(name)}
						<Card {isOwner} compact {createdAt} let:className>
							<svelte:fragment slot="body">
								<h3 class="text-xl text-rich-90 font-medium">
									<a
										class="hover:(text-aqua-50 underline)"
										href={definitionPath.path}
										data-sveltekit-prefetch
									>
										{name}
									</a>
								</h3>
								<p>{definition}</p>
							</svelte:fragment>
							<a class={className.anchor} href={definitionPath.edit} data-sveltekit-prefetch>
								Edit
							</a>
							<form action={collectionPath.$remove(id, path)} method="post">
								<button
									class={className.remove}
									type="submit"
									title="Remove Definition from Collection"
									aria-label="Remove Definition from Collection"
								>
									Remove
								</button>
							</form>
							<form action={definitionPath.$delete(path)} method="post">
								<button class={className.delete} type="submit"> Delete </button>
							</form>
						</Card>
					{/each}
				</div>
			</section>
		{/if}
	</main>
</LayoutSeparated>

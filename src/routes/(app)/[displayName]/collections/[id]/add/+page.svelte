<script lang="ts">
	import type { PageData } from "./$types";
	import { Card, Header } from "$lib/components";
	import { page } from "$app/stores";

	export let data: PageData;

	const { collection, definitions, foundUser } = data;
	const path = $page.url.pathname;
</script>

<svelte:head>
	<title>Adding Definitions to {collection.name} / Boxinary</title>
</svelte:head>

<div class="grid gap-12">
	<Header subtitle={collection.shortDescription}>
		Adding Definitions to <strong class="text-white">{collection.name}</strong>
	</Header>
	<section class="grid gap-6">
		<h2 class="sr-only">Definitions</h2>
		<div class="grid gap-6 | sm:grid-cols-2 lg:grid-cols-3">
			{#each definitions as { id, name, definition, createdAt } (id)}
				<Card isOwner compact title={name} content={definition} {createdAt} let:className>
					<form
						action="/{foundUser.displayName}/collections/{collection.id}/add?definition-id={id}"
						method="post"
					>
						<button
							class="px-2 text-sm text-white font-medium hover:(text-aqua-50 underline)"
							type="submit"
						>
							Add
						</button>
					</form>
					<a
						class={className.anchor}
						href="/{foundUser.displayName}/collections/{collection.id}/edit"
						data-sveltekit-prefetch
					>
						Edit
					</a>
					<form
						action="/{foundUser.displayName}/collections/{collection.id}/delete/?redirect-to={path}"
						method="post"
					>
						<button class={className.delete} type="submit"> Delete </button>
					</form>
				</Card>
			{/each}
		</div>
	</section>
</div>

<script lang="ts">
	import type { PageData } from "./$types";
	import { Card, Header } from "$lib/components";
	import { page } from "$app/stores";
	import {
		getCollectionAddAction,
		getDefinitionDeleteAction,
		getDefinitionEditPath
	} from "$lib/utils";

	export let data: PageData;

	const { collection, definitions, foundUser } = data;
	const path = $page.url.pathname;
</script>

<svelte:head>
	<title>Adding Definitions to {collection.name} / Boxinary</title>
</svelte:head>

<div class="grid gap-12">
	<Header text={collection.description}>
		Adding <b class="medium"> definitions </b>
		to <b class="bold"> {collection.name} </b>
	</Header>
	<section class="grid gap-6">
		<h2 class="sr-only">Definitions</h2>
		<div class="grid gap-6 | sm:grid-cols-2 lg:grid-cols-3">
			{#each definitions as { id, name, definition, createdAt } (id)}
				<Card isOwner compact title={name} content={definition} {createdAt} let:className>
					<form
						action={getCollectionAddAction(foundUser.displayName, collection.id, id)}
						method="post"
					>
						<button class="button-option button-option--emphasis" type="submit"> Add </button>
					</form>
					<a
						class={className.anchor}
						href={getDefinitionEditPath(foundUser.displayName, name)}
						data-sveltekit-prefetch
					>
						Edit
					</a>
					<form action={getDefinitionDeleteAction(foundUser.displayName, name, path)} method="post">
						<button class={className.delete} type="submit"> Delete </button>
					</form>
				</Card>
			{/each}
		</div>
	</section>
</div>

<script lang="ts">
	import type { Collection } from "@prisma/client";
	import { FloatingOptions } from "$lib/components";
	import {
		getCollectionAddPath,
		getCollectionDeleteAction,
		getCollectionEditPath,
		getCollectionPath
	} from "$lib/utils";
	import { currentUser } from "@root/state";

	export let user: { id: number; displayName: string };
	export let collection: Pick<Collection, "id" | "name" | "createdAt" | "description">;
	export let redirectTo = "/home";

	const displayName = user.displayName;
	const { id, name, description, createdAt } = collection;
</script>

<article class="relative w-full | grid">
	<div class="min-h-10" aria-hidden />
	<div class="h-full px-6 py-3 | grid gap-3 | bg-raisin-12 rounded-md rounded-tl-none">
		<h3 class="text-xl text-rich-90 font-medium">
			<a
				class="hover:(text-aqua-50 underline)"
				href={getCollectionPath(displayName, id)}
				aria-label="View Collection Details"
				data-sveltekit-prefetch
			>
				{name}
			</a>
		</h3>
		{#if description}
			<span>{description}</span>
		{/if}
	</div>
	<FloatingOptions
		{createdAt}
		hasBackground
		isOwner={$currentUser?.id === user.id}
		pathing={{
			add: {
				path: getCollectionAddPath(displayName, id),
				title: `Add Definitions to ${collection.name}`
			},
			edit: {
				path: getCollectionEditPath(displayName, id),
				title: "Edit Collection"
			},
			$delete: {
				path: getCollectionDeleteAction(displayName, id, redirectTo),
				title: "Delete Collection"
			}
		}}
	/>
</article>

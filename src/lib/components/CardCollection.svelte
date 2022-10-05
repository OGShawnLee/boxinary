<script lang="ts">
	import type { Collection } from "@prisma/client";
	import { getFormatedDate } from "$lib/utils";
	import { currentUser } from "@root/state";

	export let user: { id: number; displayName: string };
	export let collection: Pick<Collection, "id" | "name" | "createdAt" | "shortDescription">;
	export let redirectTo = "/home";

	const isOwner = $currentUser?.id === user.id;
</script>

<article class="relative w-full | grid">
	<div class="min-h-10" aria-hidden />
	<div class="h-full px-6 py-3 | grid gap-3 | bg-raisin-12 rounded-md rounded-tl-none">
		<h3 class="text-xl text-rich-90 font-medium">
			<a
				class="hover:(text-aqua-50 underline)"
				href="/{user.displayName}/collections/{collection.id}"
				aria-label="View Collection Details"
				data-sveltekit-prefetch
			>
				{collection.name}
			</a>
		</h3>
		{#if collection.shortDescription}
			<span>{collection.shortDescription}</span>
		{/if}
	</div>
	<div class="absolute inset-x-0 top-0 h-10 | flex items-center justify-between">
		<time
			class="h-full px-6 | grid-center | bg-raisin-12 rounded-t-md text-xs"
			datetime={collection.createdAt.toISOString()}
		>
			{getFormatedDate(collection.createdAt)}
		</time>
		{#if isOwner}
			<div class="flex items-center gap-3">
				<a
					class="px-2 text-sm hover:text-aqua-50"
					href="/{user.displayName}/collections/{collection.id}/edit"
					data-sveltekit-prefetch
				>
					Edit
				</a>
				<form
					action="/{user.displayName}/collections/{collection.id}/delete/?redirect-to={redirectTo}"
					method="post"
				>
					<button class="px-2 text-sm text-rose-600/80 hover:text-rose-500" type="submit">
						Delete
					</button>
				</form>
			</div>
		{/if}
	</div>
</article>

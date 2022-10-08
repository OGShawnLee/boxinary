<script lang="ts">
	import type { Collection } from "@prisma/client";
	import {
		getCollectionDeleteAction,
		getCollectionEditPath,
		getCollectionPath,
		getFormatedDate
	} from "$lib/utils";
	import { currentUser } from "@root/state";

	export let user: { id: number; displayName: string };
	export let collection: Pick<Collection, "id" | "name" | "createdAt" | "description">;
	export let redirectTo = "/home";

	const isOwner = $currentUser?.id === user.id;
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
	<div class="absolute inset-x-0 top-0 h-10 | flex items-center justify-between">
		<time
			class="h-full px-6 | grid-center | bg-raisin-12 rounded-t-md text-xs"
			datetime={createdAt.toISOString()}
		>
			{getFormatedDate(createdAt)}
		</time>
		{#if isOwner}
			<div class="flex items-center gap-3">
				<a
					class="button-option button-option--rich"
					href={getCollectionEditPath(displayName, id)}
					data-sveltekit-prefetch
				>
					Edit
				</a>
				<form action={getCollectionDeleteAction(displayName, id, redirectTo)} method="post">
					<button class="button-option button-option--danger" type="submit"> Delete </button>
				</form>
			</div>
		{/if}
	</div>
</article>

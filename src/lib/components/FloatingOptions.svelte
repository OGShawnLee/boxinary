<script lang="ts">
	import { getFormatedDate } from "$lib/utils";
	import { currentUser } from "@root/state";
	import { isBoolean } from "malachite-ui/predicate";

	export let isOwner: boolean;
	export let createdAt: Date;
	export let pathing: FloatingOptionsPathing;
	export let hasBackground = false;
</script>

<div class="absolute top-0 inset-x-0 h-10 | flex items-center justify-between">
	<time
		class="h-full | grid-center | text-sm"
		class:px-6={hasBackground}
		class:bg-raisin-12={hasBackground}
		class:rounded-t-md={hasBackground}
		datetime={createdAt.toISOString()}
	>
		{getFormatedDate(createdAt)}
	</time>
	{#if isOwner}
		<div class="flex items-center gap-9">
			{#if pathing.add}
				<a
					class="text-sm button-option--emphasis"
					href={pathing.add.path}
					title={pathing.add.title}
					aria-label={pathing.add.title}
					data-sveltekit-prefetch
				>
					Add
				</a>
			{/if}
			<a
				class="text-sm button-option--rich"
				href={pathing.edit.path}
				title={pathing.edit.title}
				aria-label={pathing.edit.title}
				data-sveltekit-prefetch
			>
				Edit
			</a>
			<form action={pathing.$delete.path} method="post">
				<button
					class="text-sm button-option--danger"
					type="submit"
					title={pathing.$delete.title}
					aria-label={pathing.$delete.title}
				>
					Delete
				</button>
			</form>
		</div>
	{:else if $currentUser && pathing.$bookmark && isBoolean(pathing.$bookmark.isBookmarked)}
		<form action={pathing.$bookmark.path} method="post">
			<button
				class="button-option button-option--emphasis"
				type="submit"
				title={pathing.$bookmark.title}
				aria-label={pathing.$bookmark.title}
				aria-disabled={pathing.$bookmark.isBookmarked}
				disabled={pathing.$bookmark.isBookmarked}
			>
				<span class:text-aqua-50={pathing.$bookmark.isBookmarked}>
					{pathing.$bookmark.isBookmarked ? "Bookmarked" : "Bookmark"}
				</span>
			</button>
		</form>
	{/if}
</div>

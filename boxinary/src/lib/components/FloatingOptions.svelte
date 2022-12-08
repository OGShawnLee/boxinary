<script lang="ts">
	import { getFormatedDate } from "$lib/utils";
	import { currentUser } from "@root/state";
	import { isBoolean } from "@boxinary/predicate-core";

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
		<div class="flex items-center gap-4.5 lg:gap-6">
			{#if pathing.add}
				<a
					class="text-sm button-option--emphasis"
					href={pathing.add.path}
					title={pathing.add.title}
					aria-label={pathing.add.title}
					data-svelkite-preload-data
				>
					Add
				</a>
			{/if}
			<a
				class="text-sm button-option--rich"
				href={pathing.edit.path}
				title={pathing.edit.title}
				aria-label={pathing.edit.title}
				data-svelkite-preload-data
			>
				Edit
			</a>
			{#if pathing.example && pathing.example.condition}
				<a
					class="text-sm button-option--rich"
					href={pathing.example.path}
					title={pathing.example.title}
					aria-label={pathing.example.title}
					data-svelkite-preload-data
				>
					Add Example
				</a>
			{/if}
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
		{@const isBookmarked = pathing.$bookmark.isBookmarked}
		<form action={pathing.$bookmark.path} method="post">
			<button
				class="text-white {isBookmarked ? 'hover:text-rose-500' : 'hover:text-aqua-50'}"
				type="submit"
				title={pathing.$bookmark.title}
				aria-label={pathing.$bookmark.title}
			>
				<span class="flex items-center gap-1.75">
					<i class="bx bx-bookmark-alt-{isBookmarked ? 'minus' : 'plus'} text-xl" />
					<span class="text-xs sm:text-sm" aria-hidden>
						{isBookmarked ? "Remove Bookmark" : "Bookmark"}
					</span>
				</span>
			</button>
		</form>
	{/if}
</div>

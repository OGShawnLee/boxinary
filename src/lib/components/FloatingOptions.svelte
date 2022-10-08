<script lang="ts">
	import { getFormatedDate } from "$lib/utils";

	export let isOwner: boolean;
	export let createdAt: Date;
	export let pathing: { add?: FloatingOption; edit: FloatingOption; $delete: FloatingOption };
</script>

<div class="absolute top-0 inset-x-0 h-10 | flex items-center justify-between">
	<time class="h-full | grid-center | text-sm" datetime={createdAt.toISOString()}>
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
	{/if}
</div>

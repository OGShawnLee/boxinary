<script lang="ts">
	import { currentUser } from "@root/state";

	export let definition: AtomicDefinition;

	$: isOwner = $currentUser?.displayName === definition.author.displayName;
</script>

<article
	class="px-6 py-3 | flex flex-wrap items-end justify-between gap-3 gap-x-6 | bg-raisin-12 rounded-md"
>
	<div>
		<header>
			<h2 class="text-xl text-white font-medium">
				<a
					class="hover:text-aqua-50"
					href="/{definition.author.displayName}/dictionary/{definition.title}"
					data-sveltekit-prefetch
				>
					{definition.title}
				</a>
			</h2>
		</header>
		<span> {definition.atomic} </span>
	</div>
	{#if isOwner}
		<div class="flex items-center gap-6">
			<a
				class="button button--raisin grid-center"
				href="/{definition.author.displayName}/dictionary/{definition.title}/edit"
				data-sveltekit-prefetch
			>
				Edit
			</a>
			<form
				method="post"
				action="/{definition.author.displayName}/dictionary/{definition.title}/delete"
			>
				<button class="button button--rose" type="submit"> Delete </button>
			</form>
		</div>
	{/if}
</article>

<script lang="ts">
	import { currentUser } from "@root/state";

	export let name: string;
	export let definition: string;
	export let displayName: string;

	$: isOwner = $currentUser?.displayName === displayName;
</script>

<article
	class="px-6 py-3 | flex flex-wrap items-end justify-between gap-3 gap-x-6 | bg-raisin-12 rounded-md"
>
	<div>
		<header>
			<h2 class="text-xl text-rich-90 font-medium">
				<a
					class="hover:(text-aqua-50 underline)"
					href="/{displayName}/dictionary/{name}"
					data-sveltekit-prefetch
				>
					{name}
				</a>
			</h2>
		</header>
		<span> {definition} </span>
	</div>
	{#if isOwner}
		<div class="flex items-center gap-3">
			<a
				class="button button--raisin grid-center"
				href="/{displayName}/dictionary/{name}/edit"
				data-sveltekit-prefetch
			>
				Edit
			</a>
			<form method="post" action="/{displayName}/dictionary/{name}/delete">
				<button class="button button--rose" type="submit"> Delete </button>
			</form>
		</div>
	{/if}
</article>

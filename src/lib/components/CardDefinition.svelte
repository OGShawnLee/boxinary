<script lang="ts">
	import { currentUser } from "@root/state";
	import { getDefinitionDeleteAction, getDefinitionEditPath, getDefinitionPath } from "$lib/utils";
	import { page } from "$app/stores";

	export let name: string;
	export let definition: string;
	export let displayName: string;
	export let redirect = $page.url.pathname;

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
					href={getDefinitionPath(displayName, name)}
					data-svelkite-preload-data
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
				href={getDefinitionEditPath(displayName, name)}
				data-svelkite-preload-data
			>
				Edit
			</a>
			<form method="post" action={getDefinitionDeleteAction(displayName, name, redirect)}>
				<button class="button button--rose" type="submit"> Delete </button>
			</form>
		</div>
	{/if}
</article>

<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { isNullish } from "malachite-ui/predicate";
	import { getFormatedDate } from "$lib/utils";

	export let text: string;
	export let source: Nullable<string>;
	export let displayName: string;
	export let isDedicated = false;
	export let createdAt: Nullable<Date> = undefined;

	$: if (isDedicated && isNullish(createdAt))
		throw Error("createdAt must be given if Example is dedicated!");
</script>

{#if isDedicated && createdAt}
	<article class="relative p-6 | flex flex-col gap-3 | bg-raisin-12 rounded-md rounded-tl-none">
		<span class="absolute bottom-full left-0 px-6 py-2 | bg-raisin-12 rounded-t-md text-xs">
			{getFormatedDate(createdAt)}
		</span>
		<h3 class="text-rich-90">{text}</h3>
		<span class="italic"> {source ? source : displayName} </span>
	</article>
{:else}
	<article class="space-y-1.5">
		<h3 class="text-sm">{text}</h3>
		<span class="text-xs italic | text-rich-50">
			{source ? source : displayName}
		</span>
	</article>
{/if}

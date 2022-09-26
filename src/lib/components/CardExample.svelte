<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { isNullish } from "malachite-ui/predicate";
	import { getFormatedDate } from "$lib/utils";
	import { page } from "$app/stores";
	import { currentUser } from "@root/state";

	export let text: string;
	export let source: Nullable<string>;
	export let displayName: string;
	export let id: Nullable<bigint> = undefined;
	export let isDedicated = false;
	export let createdAt: Nullable<Date> = undefined;

	if (isDedicated && (isNullish(createdAt) || isNullish(id)))
		throw Error("createdAt and id must be given if Example is dedicated!");

	const path = $page.url.pathname;
	const isOwner = $currentUser?.displayName === displayName;
</script>

{#if isDedicated && createdAt}
	<article class="relative p-6 | flex flex-col gap-3 | bg-raisin-12 rounded-md rounded-tl-none">
		<div class="absolute bottom-full inset-x-0 | flex items-center justify-between">
			<span class="px-6 py-2 | bg-raisin-12 rounded-t-md text-xs">
				{getFormatedDate(createdAt)}
			</span>
			{#if isOwner}
				<a class="px-2 text-sm hover:text-aqua-50" href="{path}/{id}/edit" data-sveltekit-prefetch>
					Edit
				</a>
			{/if}
		</div>
		<h3 class="text-rich-90">{text}</h3>
		<span class="text-xs italic | md:text-sm"> {source ? source : displayName} </span>
	</article>
{:else}
	<article class="space-y-1.5">
		<h3 class="text-sm">{text}</h3>
		<span class="text-xs italic | text-rich-50">
			{source ? source : displayName}
		</span>
	</article>
{/if}

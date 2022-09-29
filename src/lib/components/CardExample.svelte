<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { isNullish } from "malachite-ui/predicate";
	import { getFormatedDate } from "$lib/utils";
	import { currentUser } from "@root/state";

	export let isDedicated = false;
	export let hasBackground = true;
	export let id: Nullable<bigint> = undefined;
	export let displayName: string;
	export let createdAt: Nullable<Date> = undefined;
	export let text: string;
	export let definition: Nullable<{ title: string }> = undefined;
	export let source: Nullable<string> = displayName;
	export let redirectTo = "/home";

	if (isDedicated && (isNullish(id) || isNullish(createdAt) || isNullish(definition)))
		throw Error("id, createdAt and definition must be defined if Example is dedicated!");
</script>

{#if isDedicated && typeof id === "bigint" && definition && createdAt}
	{@const isOwner = $currentUser?.displayName === displayName}
	{@const path = `/${displayName}/dictionary/${definition.title}/examples/${id}`}
	<article class="relative w-full | flex flex-col">
		<div class="min-h-10" aria-hidden />
		<div
			class="h-full | flex flex-col gap-3 | rounded-md rounded-tl-none"
			class:bg-raisin-12={hasBackground}
			class:p-6={hasBackground}
		>
			<h3 class="text-rich-90">{text}</h3>
			<span class="text-xs italic | md:text-sm"> {source} </span>
		</div>
		<div class="absolute inset-x-0 top-0 h-10 | flex items-center justify-between">
			<span
				class="h-full | grid-center | rounded-t-md text-xs"
				class:bg-raisin-12={hasBackground}
				class:px-6={hasBackground}
			>
				{getFormatedDate(createdAt)}
			</span>
			{#if isOwner}
				<div class="flex items-center gap-3">
					<a class="px-2 text-sm hover:text-aqua-50" href="{path}/edit" data-sveltekit-prefetch>
						Edit
					</a>
					<form action="{path}/delete/?redirect-to={redirectTo}" method="post">
						<button class="px-2 text-sm text-rose-600/80 hover:text-rose-500" type="submit">
							Delete
						</button>
					</form>
				</div>
			{/if}
		</div>
	</article>
{:else}
	<article class="space-y-1.5">
		<h3 class="text-sm">{text}</h3>
		<span class="text-xs italic | text-rich-50"> {source} </span>
	</article>
{/if}

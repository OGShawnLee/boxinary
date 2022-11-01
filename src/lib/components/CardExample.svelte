<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { FloatingOptions } from "$lib/components";
	import { isNullish } from "malachite-ui/predicate";
	import { createExamplePathing } from "$lib/utils";
	import { currentUser } from "@root/state";
	import { page } from "$app/stores";

	export let isDedicated = false;
	export let hasBackground = true;
	export let id: Nullable<bigint> = undefined;
	export let displayName: string;
	export let createdAt: Nullable<Date> = undefined;
	export let text: string;
	export let definition: Nullable<{ name: string }> = undefined;
	export let source: Nullable<string> = displayName;
	export let redirect = $page.url.pathname;
	export let headingLevel: "h3" | "h4" = "h3";

	if (isDedicated && (isNullish(id) || isNullish(createdAt) || isNullish(definition)))
		throw Error("id, createdAt and definition must be defined if Example is dedicated!");
</script>

{#if isDedicated && typeof id === "bigint" && definition && createdAt}
	{@const pathing = createExamplePathing(displayName).definition(definition.name)}
	<article class="relative w-full | flex flex-col">
		<div class="min-h-10" aria-hidden />
		<div
			class="h-full | flex flex-col gap-3 | rounded-md rounded-tl-none"
			class:bg-raisin-12={hasBackground}
			class:p-6={hasBackground}
		>
			<svelte:element this={headingLevel} class="text-rich-90 font-normal"> {text} </svelte:element>
			<span class="text-xs italic | md:text-sm"> {source} </span>
		</div>
		<FloatingOptions
			{createdAt}
			{hasBackground}
			isOwner={Boolean($currentUser?.displayName === displayName)}
			pathing={{
				edit: { path: pathing.edit(id), title: "Edit Example" },
				$delete: { path: pathing.$delete(id, redirect), title: "Delete Example" }
			}}
		/>
	</article>
{:else}
	<article class="space-y-1.5">
		<svelte:element this={headingLevel} class="text-sm font-normal"> {text} </svelte:element>
		<span class="text-xs italic | text-rich-50"> {source} </span>
	</article>
{/if}

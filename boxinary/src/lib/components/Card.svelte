<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { getFormatedDate } from "$lib/utils";
	import { isNullish } from "@boxinary/predicate-core";

	export let title: Nullable<string> = undefined;
	export let content: Nullable<string> = undefined;
	export let createdAt: Nullable<Date> = undefined;
	export let isOwner = false;
	export let compact = false;

	if (!$$slots.body && (isNullish(title) || isNullish(content)))
		throw Error("Title and Content must be defined if Card is created without a body slot!");
</script>

<article class="relative w-full | flex flex-col">
	{#if createdAt}
		<div class="min-h-10" aria-hidden />
	{/if}
	<div class="h-full px-6 py-3 | bg-raisin-12 rounded-md rounded-tl-none">
		<!-- svelte-ignore invalid-html-attribute -->
		<slot name="body" className={{ heading: "text-xl text-rich-90 font-medium" }}>
			<h3 class="text-xl text-rich-90 font-medium">{title}</h3>
			<p>{content}</p>
		</slot>
	</div>
	{#if createdAt}
		<div class="absolute top-0 inset-x-0 h-10 | flex items-center justify-between">
			<time
				class="h-full px-6 | grid-center | bg-raisin-12 rounded-t-md text-xs"
				datetime={createdAt.toISOString()}
			>
				<span class="hidden md:inline">
					{getFormatedDate(createdAt)}
				</span>
				<span class="md:hidden">
					{getFormatedDate(createdAt, "medium")}
				</span>
			</time>
			{#if isOwner}
				{@const padding = compact ? "button-option-compact" : "button-option"}
				<div class="flex items-center gap-3">
					<!-- svelte-ignore invalid-html-attribute -->
					<slot
						className={{
							anchor: `${padding} button-option--rich`,
							delete: `${padding} button-option--danger`,
							remove: `${padding} button-option--caution`
						}}
					/>
				</div>
			{/if}
		</div>
	{/if}
</article>

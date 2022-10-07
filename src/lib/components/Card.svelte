<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { getFormatedDate } from "$lib/utils";

	export let title: string;
	export let content: string;
	export let createdAt: Nullable<Date> = undefined;
	export let isOwner = false;
	export let compact = false;
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
				{getFormatedDate(createdAt)}
			</time>
			{#if isOwner}
				{@const padding = compact ? "px-0.5 md:px-2" : "px-2"}
				<div class="flex items-center gap-3">
					<!-- svelte-ignore invalid-html-attribute -->
					<slot
						className={{
							anchor: `${padding} text-sm hover:text-aqua-50`,
							delete: `${padding} text-sm text-rose-600/80 hover:text-rose-500`
						}}
					/>
				</div>
			{/if}
		</div>
	{/if}
</article>

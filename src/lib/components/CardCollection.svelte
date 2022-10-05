<script lang="ts">
	import type { Collection } from "@prisma/client";

	export let displayName: string;
	export let collection: Pick<Collection, "id" | "name" | "shortDescription">;
</script>

<article class="px-6 py-3 | grid gap-1.5 | bg-raisin-12 rounded-md">
	<h3 class="text-xl text-rich-90 font-medium">
		<a
			class="hover:(text-aqua-50 underline)"
			href="/{displayName}/collections/{collection.id}"
			aria-label="View Collection Details"
			data-sveltekit-prefetch
		>
			{collection.name}
		</a>
	</h3>
	{#if collection.shortDescription}
		<span>{collection.shortDescription}</span>
	{/if}
</article>

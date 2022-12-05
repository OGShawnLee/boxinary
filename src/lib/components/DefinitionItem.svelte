<script lang="ts">
	import type { Nullable } from "malachite-ui/types";

	export let definition: { definition: string; example: Nullable<string> };
	export let index: number;
</script>

<li class="flex gap-3">
	<span aria-hidden> {index + 1}. </span>
	<div>
		<p class="text-rich-90">{definition.definition}</p>
		{#if definition.example}
			<p>
				<i>{definition.example}</i>
			</p>
		{/if}
	</div>
</li>

<script lang="ts">
	import type { Nullable } from "malachite-ui/types";

	export let text: string;
	export let source: Nullable<string>;
	export let displayName: string;
</script>

<article class="space-y-1.5">
	<h3 class="text-sm">{text}</h3>
	<span class="text-xs italic | text-rich-50">
		{source ? source : displayName}
	</span>
</article>

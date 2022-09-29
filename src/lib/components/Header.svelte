<script lang="ts">
	import type { Nullable } from "malachite-ui/types";

	let className: Nullable<string> = undefined;

	export { className as class };
	export let subtitle: Nullable<string> = undefined;
</script>

<header class={className}>
	<div class="grid">
		<h1 class="text-2xl text-rich-90">
			<slot />
		</h1>
		{#if subtitle}
			<span class="text-sm text-aqua-50"> {subtitle} </span>
		{/if}
	</div>
	<slot name="side" />
</header>

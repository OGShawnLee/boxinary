<script lang="ts">
	import type { Nullable } from "malachite-ui/types";

	let className: Nullable<string> = undefined;

	export { className as class };
	export let title: Nullable<string> = undefined;
	export let text: Nullable<string> = undefined;
</script>

<header class={className}>
	<div>
		<h1 class="text-2xl text-rich-90">
			<slot>{title}</slot>
		</h1>
		{#if text}
			<p class="text-sm text-aqua-50">{text}</p>
		{/if}
	</div>
	<slot name="aside" />
</header>

<style>
	h1 :global(.bold) {
		color: white;
		font-family: Poppins, sans-serif;
	}
</style>

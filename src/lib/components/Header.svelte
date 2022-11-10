<script lang="ts">
	import type { Nullable } from "malachite-ui/types";

	let className: Nullable<string> = undefined;

	export { className as class };
	export let title: Nullable<string> = undefined;
	export let text: Nullable<string> = undefined;
	export let as: "h1" | "h2" | "h3" = "h1";
</script>

<header class={className}>
	<slot name="left-side" />
	<div>
		<svelte:element this={as} class="p-0 | text-2xl text-rich-90 font-normal" data-heading>
			<slot>{title}</slot>
		</svelte:element>
		{#if text}
			<p class="text-sm text-aqua-50">{text}</p>
		{/if}
	</div>
	<slot name="right-side" />
</header>

<style>
	[data-heading] :global(.bold) {
		color: white;
		font-family: Poppins, sans-serif;
	}

	[data-heading] :global(.medium) {
		color: white;
		font-family: Poppins, sans-serif;
		font-weight: 500;
	}
</style>

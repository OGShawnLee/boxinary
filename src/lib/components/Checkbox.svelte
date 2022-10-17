<script lang="ts">
	import type { Nullable } from "malachite-ui/types";

	let className: Nullable<string> = undefined;

	export { className as class };
	export let isChecked = false;
	export let label: string;
	export let type: Nullable<string> = undefined;
	export let title = type;
</script>

<button
	role="checkbox"
	aria-checked={isChecked}
	aria-label={label}
	class={className}
	on:click={() => (isChecked = !isChecked)}
	on:click
	{type}
	{title}
>
	{#if isChecked}
		<slot />
	{/if}
</button>

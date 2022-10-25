<script lang="ts">
	import type { Nullable } from "malachite-ui/types";

	let className: Nullable<string> = undefined;

	export { className as class };
	export let isChecked = false;
	export let label: string;
	export let type: Nullable<string> = undefined;
	export let title = type;
	export let disabled = false;

	function toggle() {
		if (disabled) return;
		isChecked = !isChecked;
	}
</script>

<button
	role="checkbox"
	aria-checked={isChecked}
	aria-label={label}
	class={className}
	{disabled}
	on:click={toggle}
	on:click
	{type}
	{title}
>
	{#if isChecked}
		<slot />
	{/if}
</button>

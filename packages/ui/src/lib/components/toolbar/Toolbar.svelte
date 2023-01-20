<script lang="ts">
	import type { ComponentTagName } from "$lib/types";
	import { Render } from "$lib/components";
	import { createToolbarState } from "./state";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "div";
	export let element: HTMLElement | undefined = undefined;
	export let vertical = false;
	export let id: string | undefined = undefined;
	export { className as class };

	const { createToolbar, navigation } = createToolbarState({
		isVertical: vertical
	});

	$: navigation.isVertical.value = vertical;

	const { action, binder, context: labels } = createToolbar(id);
</script>

<!-- {$index} -->
<Render
	{as}
	class={className}
	{id}
	{...$$restProps}
	bind:element
	{binder}
	actions={[action]}
	aria-labelledby={$labels}
	role="toolbar"
	tabIndex={-1}
	on:blur
	on:change
	on:click
	on:contextmenu
	on:dblclick
	on:focus
	on:focusin
	on:focusout
	on:input
	on:keydown
	on:keypress
	on:keyup
	on:mousedown
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:mouseout
	on:mouseover
	on:mouseup
	on:mousewheel
>
	<slot toolbar={action} />
</Render>

<script lang="ts">
	import type { ComponentTagName } from "$lib/types";
	import { Render } from "$lib/components";
	import { createTabGroupState } from "./state";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "div";
	export let finite = false;
	export let id: string | undefined = undefined;
	export let initialIndex = 0;
	export { className as class };
	export let manual = false;
	export let vertical = false;

	const { isFinite, isManual, isVertical } = createTabGroupState({
		isFinite: finite,
		isManual: manual,
		isVertical: vertical,
		initialIndex: initialIndex
	});

	$: isFinite.value = finite;
	$: isManual.value = manual;
	$: isVertical.value = vertical;
</script>

<Render
	{as}
	class={className}
	{id}
	{...$$restProps}
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
	<slot />
</Render>

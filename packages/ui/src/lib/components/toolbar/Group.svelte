<script lang="ts">
	import type { ComponentTagName } from "$lib/types";
	import { Render } from "$lib/components";
	import { createToolbarGroupState } from "./Group.state";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "fragment";
	export let element: HTMLElement | undefined = undefined;
	export let id: string | undefined = undefined;
	export { className as class };

	createToolbarGroupState();
</script>

<Render
	{as}
	class={className}
	{id}
	{...$$restProps}
	bind:element
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

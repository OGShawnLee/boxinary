<script lang="ts">
	import type { ComponentTagName } from "$lib/types";
	import { ItemContext } from "./context";
	import { Render } from "$lib/components";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "h3";
	export let id: string | undefined = undefined;
	export { className as class };

	const { isOpen, createAccordionHeading } = ItemContext.getContext();
	const { action, binder } = createAccordionHeading(id);
</script>

<Render
	{as}
	class={className}
	{id}
	{...$$restProps}
	{binder}
	actions={[action]}
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
	<slot isOpen={$isOpen} heading={action} />
</Render>

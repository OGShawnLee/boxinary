<script lang="ts">
	import type { ComponentTagName } from "$lib/types";
	import Context from "./context";
	import { Render } from "$lib/components";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "button";
	export let id: string | undefined = undefined;
	export { className as class };

	const { isOpen, createDisclosureButton, panel } = Context.getContext(true);
	const { action, binder } = createDisclosureButton(id);
	const panelName = panel.finalName;
</script>

<Render
	{as}
	{className}
	{id}
	{...$$restProps}
	{binder}
	actions={[action]}
	aria-expanded={$isOpen}
	aria-controls={$panelName}
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
	<slot isOpen={$isOpen} button={action} />
</Render>

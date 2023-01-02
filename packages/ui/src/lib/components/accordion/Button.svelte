<script lang="ts">
	import type { ComponentTagName, Nullable } from "$lib/types";
	import { ItemContext } from "./context";
	import { Render } from "$lib/components";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "button";
	export let id: string | undefined = undefined;
	export let disabled: Nullable<boolean> = undefined;
	export { className as class };

	const {
		isOpen,
		createAccordionButton,
		panel: { finalName: panelName }
	} = ItemContext.getContext();
	const { action, binder } = createAccordionButton(id);
</script>

<Render
	{as}
	class={className}
	{id}
	{...$$restProps}
	{binder}
	actions={[action]}
	aria-expanded={$isOpen}
	aria-controls={$panelName}
	aria-disabled={disabled}
	{disabled}
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

<script lang="ts">
	import type { ClassName, ComponentTagName } from "$lib/types";
	import { Render } from "$lib/components";
	import { GroupContext } from "./context";
	import { useClassNameResolver } from "$lib/hooks";

	let className: ClassName<"OPEN"> = undefined;

	export let as: ComponentTagName = "div";
	export let id: string | undefined = undefined;
	export { className as class };

	const { createAccordionItemState } = GroupContext.getContext();
	const { isOpen, close, button, heading, panel } = createAccordionItemState();

	$: finalClassName = useClassNameResolver(className)({ isOpen: $isOpen });
</script>

<Render
	{as}
	class={finalClassName}
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
	{#if $isOpen}
		<slot name="up-panel" {panel} {close} />
	{/if}
	<slot isOpen={$isOpen} {button} {heading} {panel} {close} />
	{#if $isOpen}
		<slot name="panel" {panel} {close} />
	{/if}
</Render>

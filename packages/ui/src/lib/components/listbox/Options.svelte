<script lang="ts">
	import type { ComponentTagName } from "$lib/types";
	import Context from "./context";
	import { Render } from "$lib/components";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "ul";
	export let element: HTMLElement | undefined = undefined;
	export let id: string | undefined = undefined;
	export { className as class };

	const { isOpen, createListboxPanel } = Context.getContext();
	const { action, binder } = createListboxPanel(id);
</script>

{#if $isOpen}
	<Render
		{as}
		class={className}
		{id}
		{...$$restProps}
		bind:element
		{binder}
		actions={[action]}
		role="listbox"
		tabIndex={0}
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
		<slot panel={action} />
	</Render>
{/if}

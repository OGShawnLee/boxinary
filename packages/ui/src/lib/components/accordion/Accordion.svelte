<script lang="ts">
	import type { ComponentTagName } from "$lib/types";
	import { createAccordionState } from "./state";
	import { Render } from "$lib/components";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "div";
	export let disabled = false;
	export let finite = false;
	export let id: string | undefined = undefined;
	export { className as class };

	const { createAccordion, navigation } = createAccordionState({
		isDisabled: disabled,
		isFinite: finite,
		isVertical: true
	});
	const { action, binder } = createAccordion(id);

	$: navigation.isDisabled.value = disabled;
	$: navigation.isFinite.value = finite;
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
	<slot accordion={action} isDisabled={disabled} />
</Render>

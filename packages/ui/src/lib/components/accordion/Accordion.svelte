<script lang="ts">
	import type { Action, ClassName, ComponentTagName } from "$lib/types";
	import { createAccordionState } from "./state";
	import { Render } from "$lib/components";
	import { useClassNameResolver } from "$lib/hooks";

	let className: ClassName<"OPEN"> = undefined;

	export let as: ComponentTagName = "div";
	export let disabled = false;
	export let element: HTMLElement | undefined = undefined;
	export let finite = false;
	export let unique = true;
	export let id: string | undefined = undefined;
	export let use: Action[] | undefined = undefined;
	export { className as class };

	const { createAccordion, navigation, isOpen, isUnique } = createAccordionState({
		isDisabled: disabled,
		isFinite: finite,
		isVertical: true,
		isUnique: unique
	});
	const { action, binder } = createAccordion(id);

	$: navigation.isDisabled.value = disabled;
	$: navigation.isFinite.value = finite;
	$: isUnique.value = unique;
	$: finalClassName = useClassNameResolver(className)({ isOpen: $isOpen });
	$: finalUse = use ? [action, ...use] : [action];
</script>

<Render
	{as}
	class={finalClassName}
	{id}
	{...$$restProps}
	bind:element
	{binder}
	use={finalUse}
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
	<slot isDisabled={disabled} isOpen={$isOpen} accordion={action} />
</Render>

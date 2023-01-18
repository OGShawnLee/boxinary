<script lang="ts">
	import type { ClassName, ComponentTagName, Nullable } from "$lib/types";
	import Context from "./context";
	import { Render } from "$lib/components";
	import { useClassNameResolver } from "$lib/hooks";

	let className: ClassName<"DISABLED" | "OPEN"> = undefined;

	export let as: ComponentTagName = "button";
	export let id: string | undefined = undefined;
	export let disabled: Nullable<boolean> = undefined;
	export { className as class };

	const { isOpen, createDisclosureButton } = Context.getContext();
	const { action, binder, context: panelName } = createDisclosureButton(id);

	$: finalClassName = useClassNameResolver(className)({
		isOpen: $isOpen,
		isDisabled: disabled ?? false
	});
</script>

<Render
	{as}
	class={finalClassName}
	{id}
	{...$$restProps}
	{binder}
	actions={[action]}
	aria-expanded={$isOpen}
	aria-controls={$panelName}
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
	<slot isOpen={$isOpen} isDisabled={disabled ?? false} button={action} />
</Render>

<script lang="ts">
	import type { ClassName, ComponentTagName } from "$lib/types";
	import Context from "./context";
	import { Render } from "$lib/components";
	import { useClassNameResolver } from "$lib/hooks";

	let className: ClassName<"DISABLED"> = undefined;

	export let as: ComponentTagName = "button";
	export let disabled = false;
	export let element: HTMLElement | undefined = undefined;
	export let id: string | undefined = undefined;
	export { className as class };

	const { action, binder } = Context.getContext().createNavigableItem(id);

	$: isDisabled = disabled ?? false;
	$: finalClassName = useClassNameResolver(className)({ isDisabled });
</script>

<Render
	{as}
	class={finalClassName}
	{id}
	{...$$restProps}
	bind:element
	{binder}
	{disabled}
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
	<slot {isDisabled} item={action} />
</Render>

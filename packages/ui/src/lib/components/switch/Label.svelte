<script lang="ts">
	import type { ComponentTagName } from "$lib/types";
	import Context from "./Group.context";
	import { Render } from "$lib/components";
	import { ElementBinder } from "$lib/core";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "span";
	export let id: string | undefined = undefined;
	export let passive = false;
	export { className as class };

	const { isChecked, createSwitchLabel } = Context.getContext();
	const { binder, action, context: isPassive } = createSwitchLabel(id, new ElementBinder());

	$: isPassive.set(passive);
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
	<slot isChecked={$isChecked} description={action} />
</Render>

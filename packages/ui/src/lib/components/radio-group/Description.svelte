<script lang="ts">
	import type { ComponentTagName } from "$lib/types";
	import { GroupContext } from "./context";
	import { Render } from "$lib/components";
	import { ElementBinder } from "$lib/core";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "span";
	export let id: string | undefined = undefined;
	export { className as class };

	const { createRadioGroupDescription } = GroupContext.getContext();
	const { binder, action } = createRadioGroupDescription(id, new ElementBinder());
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
	<slot description={action} />
</Render>

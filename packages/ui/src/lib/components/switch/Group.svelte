<script lang="ts">
	import type { ComponentTagName } from "$lib/types";
	import { Render } from "$lib/components";
	import { createSwitchGroupState } from "./Group.state";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "div";
	export let id: string | undefined = undefined;
	export let initialChecked = false;
	export let passive = false;
	export { className as class };

	const { isChecked, isPassive } = createSwitchGroupState({ initialChecked, isPassive: passive });

	$: isPassive.value = passive;
</script>

<Render
	{as}
	class={className}
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
	<slot isChecked={$isChecked} />
</Render>

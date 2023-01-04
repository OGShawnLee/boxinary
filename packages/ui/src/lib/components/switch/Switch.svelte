<script lang="ts">
	import type { ComponentTagName, Nullable } from "$lib/types";
	import { Render } from "$lib/components";
	import { createSwitchState } from "./state";

	let className: string | undefined = undefined;

	export let as: ComponentTagName = "button";
	export let checked = false;
	export let disabled: Nullable<boolean> = undefined;
	export let id: string | undefined = undefined;
	export { className as class };

	const { isChecked, createSwitch, descriptions, labels } = createSwitchState(checked);
	const { binder, action } = createSwitch(id);

	$: isChecked.set(checked);
	$: checked = $isChecked;
</script>

<Render
	{as}
	class={className}
	{id}
	{...$$restProps}
	{binder}
	actions={[action]}
	{disabled}
	aria-checked={$isChecked}
	aria-describedby={$descriptions}
	aria-labelledby={$labels}
	role="switch"
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
	<slot isChecked={$isChecked} isDisabled={disabled ?? false} switcher={action} />
</Render>

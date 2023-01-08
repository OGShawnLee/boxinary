<script lang="ts">
	import type { ClassName, ComponentTagName, Nullable } from "$lib/types";
	import { Render } from "$lib/components";
	import { GroupContext } from "./context";
	import { ref } from "$lib/utils";
	import { useClassNameResolver } from "$lib/hooks";

	let className: ClassName<"DISABLED" | "SELECTED"> = undefined;

	export let as: ComponentTagName = "div";
	export let disabled: Nullable<boolean> = undefined;
	export let element: HTMLElement | undefined = undefined;
	export let id: string | undefined = undefined;
	export let selected = false;
	export let value = "";
	export { className as class };

	const { createRadioGroupOptionState } = GroupContext.getContext();
	const { createOption, descriptions, labels } = createRadioGroupOptionState(value, selected);
	const { action, binder } = createOption(id);
	const { isSelected } = binder;

	$: isDisabled = disabled ?? false;
	$: finalClassName = useClassNameResolver(className)({
		isDisabled,
		isSelected: $isSelected
	});
</script>

<Render
	{as}
	class={finalClassName}
	{id}
	{...$$restProps}
	bind:element
	{binder}
	actions={[action]}
	aria-checked={$isSelected}
	aria-describedby={$descriptions}
	aria-labelledby={$labels}
	role="radio"
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
	<slot {isDisabled} isSelected={$isSelected} option={action} />
</Render>

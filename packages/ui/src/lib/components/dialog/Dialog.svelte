<script lang="ts">
	import type { Action, ClassName, ComponentTagName, Nullable } from "$lib/types";
	import { Render } from "$lib/components";
	import { createDialogState } from "./state";
	import { useClassNameResolver } from "$lib/hooks";
	import { ref } from "$lib/utils";
	import { isClient } from "$lib/predicate";

	let className: ClassName<"OPEN"> = undefined;

	export let as: ComponentTagName = "div";
	export let element: HTMLElement | undefined = undefined;
	export let initialFocus: Nullable<HTMLElement> = undefined;
	export let open = false;
	export let id: string | undefined = undefined;
	export let use: Action[] | undefined = undefined;
	export { className as class };

	const initialFocusRef = ref(initialFocus);
	const { isOpen, content, close, createDialogRoot, overlay } = createDialogState(
		open,
		initialFocusRef
	);
	const { action, binder } = createDialogRoot(id);

	$: finalUse = use ? [action, ...use] : [action];
	$: isOpen.set(open);
	$: open = $isOpen;
	$: initialFocusRef.set(initialFocus);
	$: finalClassName = useClassNameResolver(className)({ isOpen: $isOpen });
</script>

{#if $isOpen && isClient()}
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
		<slot {content} {close} {overlay} />
	</Render>
{/if}

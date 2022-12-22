<script lang="ts">
	import type { Action } from "svelte/action";
	import { ElementBinder, forward } from "$lib/core";
	import { isVoidElement } from "$lib/predicate";

	let className: string | undefined = undefined;

	export let actions: Array<Action> = [];
	export let as: keyof HTMLElementTagNameMap | "fragment";
	export let binder = new ElementBinder();
	export let element: HTMLElement | undefined = undefined;
	export let id: string | undefined = undefined;
	export let value: any = undefined;
	export { className as class };

	const { finalName } = binder;

	$: binder.id.value = id;
	$: isUsingFragment = as === "fragment";
	$: binder.isUsingFragment.value = isUsingFragment;
	$: if (isUsingFragment && element && className) {
		element.className = className;
	}

	function onInput(event: InputEvent) {
		value = (event.currentTarget as HTMLInputElement)?.value 
	}
</script>

{#if isUsingFragment}
	<slot />
{:else if isVoidElement(as)}
	<svelte:element
		this={as}
		bind:this={element}
		class={className}
		id={$finalName}
		{value}
		use:forward={actions}
		on:blur
		on:change
		on:click
		on:contextmenu
		on:dblclick
		on:focus
		on:focusin
		on:focusout
		on:input
		on:input={onInput}
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
		{...$$restProps}
	/>
{:else}
	<svelte:element
		this={as}
		bind:this={element}
		class={className}
		id={$finalName}
		use:forward={actions}
		on:blur
		on:click
		on:contextmenu
		on:dblclick
		on:focus
		on:focusin
		on:focusout
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
		{...$$restProps}
	>
		<slot />
	</svelte:element>
{/if}
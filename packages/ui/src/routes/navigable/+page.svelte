<script>
	import { Page } from "@app/components";
	import { Navigable, NavigableItem } from "$lib";

	let disabled = false;
	let global = false;
	let vertical = false;
	let finite = false;
</script>

<Page title="Navigable">
	<svelte:fragment slot="options">
		<button
			class="button focus:border-slate-400"
			class:border-purple-500={finite}
			on:click={() => (finite = !finite)}
		>
			Toggle Finite
		</button>
		<button
			class="button focus:border-slate-400"
			class:border-purple-500={global}
			on:click={() => (global = !global)}
		>
			Toggle Global
		</button>
		<button
			class="button focus:border-slate-400"
			class:border-purple-500={vertical}
			on:click={() => (vertical = !vertical)}
		>
			Toggle Vertical
		</button>
		<button
			class="button focus:border-slate-400"
			class:border-purple-500={disabled}
			on:click={() => (disabled = !disabled)}
		>
			Press D to Toggle Disabled Item
		</button>
	</svelte:fragment>
	<div class="grid gap-12">
		<Navigable class="flex justify-between" {finite} {vertical}>
			<NavigableItem class="button button--focus">First Item</NavigableItem>
			<NavigableItem class="button button--focus">Second Item</NavigableItem>
			<NavigableItem class="button {disabled ? 'button--disabled' : 'button--focus'}" {disabled}>
				Third Item
			</NavigableItem>
			<NavigableItem class="button button--focus">Fourth Item</NavigableItem>
			<NavigableItem class="button button--focus">Fifth Item</NavigableItem>
		</Navigable>
		<Navigable class="flex justify-between" {finite} {global} {vertical}>
			<NavigableItem class="button button--disabled" disabled>First Item</NavigableItem>
			<NavigableItem class="button button--focus">Second Item</NavigableItem>
			<NavigableItem class="button button--disabled" disabled>Third Item</NavigableItem>
			<NavigableItem class="button button--focus">Fourth Item</NavigableItem>
			<NavigableItem class="button button--disabled" disabled>Fifth Item</NavigableItem>
		</Navigable>
	</div>
</Page>

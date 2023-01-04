<script>
	import { Page, Toggle } from "@app/components";
	import { Navigable, NavigableItem } from "$lib";

	let disabled = false;
	let global = false;
	let vertical = false;
	let finite = false;
</script>

<Page title="Navigable">
	<svelte:fragment slot="options">
		<Toggle text="Toggle Finite" bind:checked={finite} />
		<Toggle text="Toggle Global" bind:checked={global} />
		<Toggle text="Toggle Vertical" bind:checked={vertical} />
		<Toggle text="Toggle Disabled Item" bind:checked={disabled} />
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

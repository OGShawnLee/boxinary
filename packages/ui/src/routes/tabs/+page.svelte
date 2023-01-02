<script>
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "$lib/components";
	import { Page } from "@app/components";

	let disabled = false;
	let manual = false;
	let vertical = false;
	let finite = false;
	let showing = true;
</script>

<Page title="Tabs">
	<svelte:fragment slot="options">
		<button
			class="button focus:border-zinc-400"
			class:border-purple-500={finite}
			on:click={() => (finite = !finite)}
		>
			Toggle Finite
		</button>
		<button
			class="button focus:border-zinc-400"
			class:border-purple-500={manual}
			on:click={() => (manual = !manual)}
		>
			Toggle Manual
		</button>
		<button
			class="button focus:border-zinc-400"
			class:border-purple-500={vertical}
			on:click={() => (vertical = !vertical)}
		>
			Toggle Vertical
		</button>
		<button
			class="button focus:border-zinc-400"
			class:border-purple-500={showing}
			on:click={() => (showing = !showing)}
		>
			Toggle Show
		</button>
		<button
			class="button focus:border-zinc-400"
			class:border-purple-500={disabled}
			on:click={() => (disabled = !disabled)}
		>
			Press D to Toggle Disabled Item
		</button>
	</svelte:fragment>
	<div class="grid gap-12">
		<TabGroup {finite} {manual} {vertical}>
			<TabList class="flex gap-12">
				<Tab class="button-focus">Tab 1</Tab>
				<Tab disabled class="button-focus button--disabled">Tab 2</Tab>
				<Tab class="button-focus">Tab 3</Tab>
				<Tab disabled class="button-focus button--disabled">Tab 4</Tab>
				<Tab class="button-focus">Tab 5</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>Panel 1</TabPanel>
				<TabPanel>Panel 2</TabPanel>
				<TabPanel>Panel 3</TabPanel>
				<TabPanel>Panel 4</TabPanel>
				<TabPanel>Panel 5</TabPanel>
			</TabPanels>
		</TabGroup>
		{#if showing}
			<TabGroup initialIndex={1} {finite} {manual} {vertical}>
				<TabList class="flex gap-12">
					<Tab class="button-focus">Tab 1</Tab>
					<Tab class="button-focus">Tab 2</Tab>
					<Tab class="button-focus">Tab 3</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>Panel 1</TabPanel>
					<TabPanel>Panel 2</TabPanel>
					<TabPanel>Panel 3</TabPanel>
				</TabPanels>
			</TabGroup>
		{/if}
	</div>
</Page>

<script lang="ts">
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "$lib/components";
	import { useClassNameResolver } from "$lib/hooks";
	import { Page, Toggle } from "@app/components";

	const className = useClassNameResolver<"DISABLED" | "SELECTED">({
		base: "px-6 py-1.75 | border-2 rounded-lg font-semibold outline-none",
		disabled: "border-slate-800 opacity-50",
		selected: {
			off: "border-slate-600 focus:border-slate-300 hover:text-white",
			on: "bg-slate-800 text-white border-slate-800 focus:border-slate-300"
		}
	});

	let disabled = false;
	let manual = false;
	let vertical = false;
	let finite = false;
	let showing = true;
</script>

<Page title="Tabs">
	<svelte:fragment slot="options">
		<Toggle text="Toggle Finite" bind:checked={finite} />
		<Toggle text="Toggle Manual" bind:checked={manual} />
		<Toggle text="Toggle Vertical" bind:checked={vertical} />
		<Toggle text="Toggle Show" bind:checked={showing} />
		<Toggle text="Toggle Disabled Item" bind:checked={disabled} />
	</svelte:fragment>
	<div class="grid gap-12">
		<TabGroup class="grid gap-4.5" {finite} {manual} {vertical}>
			<TabList class="flex gap-12">
				<Tab class={className}>Tab 1</Tab>
				<Tab class={className} disabled>Tab 2</Tab>
				<Tab class={className}>Tab 3</Tab>
				<Tab class={className} disabled>Tab 4</Tab>
				<Tab class={className}>Tab 5</Tab>
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
			<TabGroup class="grid gap-4.5" initialIndex={1} {finite} {manual} {vertical}>
				<TabList class="flex gap-12">
					<Tab class={className}>Tab 1</Tab>
					<Tab class={className}>Tab 2</Tab>
					<Tab class={className}>Tab 3</Tab>
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

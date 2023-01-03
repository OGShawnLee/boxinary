<script lang="ts">
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "$lib/components";
	import { useClassNameResolver } from "$lib/hooks";
	import { Page } from "@app/components";

	const className = useClassNameResolver<"DISABLED" | "SELECTED">({
		base: "px-6 py-1.75 | border-2 rounded-lg font-medium outline-none",
		disabled: "border-neutral-800 opacity-50",
		selected: {
			off: "border-neutral-600 focus:border-neutral-300 hover:text-white",
			on: "bg-neutral-800 text-white border-neutral-800 focus:border-neutral-300"
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
		<button
			class="button focus:border-neutral-400"
			class:border-purple-500={finite}
			on:click={() => (finite = !finite)}
		>
			Toggle Finite
		</button>
		<button
			class="button focus:border-neutral-400"
			class:border-purple-500={manual}
			on:click={() => (manual = !manual)}
		>
			Toggle Manual
		</button>
		<button
			class="button focus:border-neutral-400"
			class:border-purple-500={vertical}
			on:click={() => (vertical = !vertical)}
		>
			Toggle Vertical
		</button>
		<button
			class="button focus:border-neutral-400"
			class:border-purple-500={showing}
			on:click={() => (showing = !showing)}
		>
			Toggle Show
		</button>
		<button
			class="button focus:border-neutral-400"
			class:border-purple-500={disabled}
			on:click={() => (disabled = !disabled)}
		>
			Press D to Toggle Disabled Item
		</button>
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

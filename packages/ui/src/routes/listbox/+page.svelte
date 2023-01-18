<script lang="ts">
	import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from "$lib";
	import { useClassNameResolver } from "$lib/hooks";
	import { Page, Toggle } from "@app/components";
	import { fly, slide } from "svelte/transition";

	const className = useClassNameResolver<"ACTIVE" | "DISABLED" | "SELECTED">({
		base: "pl-6 pr-6 py-2 | text-sm text-center",
		active: "bg-raisin-15",
		disabled: "opacity-50",
		selected: "text-white font-medium"
	});
	const buttonClassName = useClassNameResolver<"OPEN">({
		base: "px-8 py-2 | bg-raisin-12 rounded-lg font-medium outline-none focus:(ring-2 ring-raisin-50)",
		open: "text-white"
	});

	let infinite = false;
	let horizontal = false;
	let value = "John Cena";
</script>

<Page title="Listbox">
	<div class="flex items-center gap-3" slot="options">
		<Toggle text="Toggle Infinite" bind:checked={infinite} />
		<Toggle text="Toggle Horizontal" bind:checked={horizontal} />
	</div>
	<div class="grid grid-cols-3 gap-6">
		<Listbox class="flex flex-col items-start gap-3" {infinite} {horizontal} bind:value let:options>
			<ListboxLabel class="sr-only">Select your Fighter</ListboxLabel>
			<ListboxButton class={buttonClassName}>
				{value}
			</ListboxButton>
			<ul
				class="flex flex-col gap-1.5 | bg-raisin-12 rounded-lg outline-none overflow-hidden"
				slot="options"
				use:options
				transition:slide|local
			>
				<ListboxOption class={className} value="John Cena">John Cena</ListboxOption>
				<ListboxOption class={className} value="Ricardo Milos">Ricardo Milos</ListboxOption>
				<ListboxOption class={className} value="The Rock">The Rock</ListboxOption>
			</ul>
		</Listbox>
		<Listbox
			class="flex flex-col items-start gap-3"
			value="The Rock"
			{infinite}
			{horizontal}
			let:value
		>
			<ListboxLabel class="sr-only">Select your Fighter</ListboxLabel>
			<ListboxButton class={buttonClassName}>{value}</ListboxButton>
			<div slot="options" transition:slide|local>
				<ListboxOptions
					class="flex flex-col gap-1.5 | bg-raisin-12 rounded-lg outline-none overflow-hidden"
					static
				>
					<ListboxOption class={className} value="John Cena">John Cena</ListboxOption>
					<ListboxOption class={className} value="Ricardo Milos">Ricardo Milos</ListboxOption>
					<ListboxOption class={className} value="The Rock">The Rock</ListboxOption>
				</ListboxOptions>
			</div>
		</Listbox>
		<Listbox class="flex flex-col items-start gap-3" {infinite} {horizontal} let:value let:options>
			<ListboxLabel class="sr-only">Select your Fighter</ListboxLabel>
			<ListboxButton class={buttonClassName}>{value ?? "No Figher"}</ListboxButton>
			<ul
				class="flex flex-col gap-1.5 | bg-raisin-12 rounded-lg outline-none overflow-hidden"
				slot="options"
				use:options
				transition:fly|local
			>
				<ListboxOption class={className} value="John Cena">John Cena</ListboxOption>
				<ListboxOption class={className} value="Ricardo Milos">Ricardo Milos</ListboxOption>
				<ListboxOption class={className} value="Goku" disabled>Goku</ListboxOption>
				<ListboxOption class={className} value="The Rock">The Rock</ListboxOption>
			</ul>
		</Listbox>
	</div>
</Page>

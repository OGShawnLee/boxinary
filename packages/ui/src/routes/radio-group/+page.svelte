<script lang="ts">
	import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "$lib";
	import { useClassNameResolver } from "$lib/hooks";
	import { Page, Toggle } from "@app/components";

	const className = useClassNameResolver<"DISABLED" | "SELECTED">({
		base: "p-6 | border-2 border-transparent",
		selected: "border-raisin-20 rounded-lg text-white"
	});

	let value = "Ichigo";
	let horizontal = false;
</script>

<Page title="Radio Group">
	<svelte:fragment slot="options">
		<Toggle bind:checked={horizontal} text="Toggle Horizontal" />
	</svelte:fragment>

	<span>Value: {value}</span>
	<div class="grid grid-cols-2 gap-12">
		<!-- item with same value is selected -->
		<RadioGroup bind:value {horizontal}>
			<RadioGroupLabel>Favourite Character</RadioGroupLabel>
			<RadioGroupOption class={className} value="Naruto">
				<RadioGroupLabel>Ninja Hero</RadioGroupLabel>
				Naruto
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Ichigo">
				<RadioGroupLabel>Shinigami Hero</RadioGroupLabel>
				Ichigo
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Luffy" selected>
				<RadioGroupLabel>Pirate King</RadioGroupLabel>
				Luffy
			</RadioGroupOption>
		</RadioGroup>
		<!-- item with same value is selected -->
		<RadioGroup value="Luffy" {horizontal}>
			<RadioGroupLabel>Favourite Character</RadioGroupLabel>
			<RadioGroupOption class={className} value="Naruto">
				<RadioGroupLabel>Ninja Hero</RadioGroupLabel>
				Naruto
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Ichigo">
				<RadioGroupLabel>Shinigami Hero</RadioGroupLabel>
				Ichigo
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Luffy">
				<RadioGroupLabel>Pirate King</RadioGroupLabel>
				Luffy
			</RadioGroupOption>
		</RadioGroup>
		<!-- the first selected option is taken -->
		<RadioGroup {horizontal}>
			<RadioGroupLabel>Favourite Character</RadioGroupLabel>
			<RadioGroupOption class={className} value="Naruto">
				<RadioGroupLabel>Ninja Hero</RadioGroupLabel>
				Naruto
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Ichigo" selected>
				<RadioGroupLabel>Shinigami Hero</RadioGroupLabel>
				Ichigo
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Luffy" selected>
				<RadioGroupLabel>Pirate King</RadioGroupLabel>
				Luffy
			</RadioGroupOption>
		</RadioGroup>
		<!-- no item will be selected -->
		<RadioGroup {horizontal}>
			<RadioGroupLabel>Favourite Character</RadioGroupLabel>
			<RadioGroupOption class={className} value="Naruto">
				<RadioGroupLabel>Ninja Hero</RadioGroupLabel>
				Naruto
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Ichigo">
				<RadioGroupLabel>Shinigami Hero</RadioGroupLabel>
				Ichigo
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Luffy">
				<RadioGroupLabel>Pirate King</RadioGroupLabel>
				Luffy
			</RadioGroupOption>
		</RadioGroup>
	</div>
</Page>

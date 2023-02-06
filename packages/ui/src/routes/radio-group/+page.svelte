<script lang="ts">
	import { Page, Toggle } from "@app/components";
	import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from "$lib";
	import { useClassNameResolver } from "$lib/hooks";

	let horizontal = false;
	let value = "Halo 2";

	const className = useClassNameResolver<"DISABLED" | "SELECTED">({
		base: "px-6 py-2 | flex items-center justify-between | outline-none cursor-pointer focus:(ring-2 ring-white)",
		disabled: "bg-raisin-12 opacity-50",
		selected: { on: "bg-raisin-15 font-medium text-white", off: "bg-raisin-12" }
	});
</script>

<Page title="Radio Group">
	<svelte:fragment slot="options">
		<Toggle bind:checked={horizontal} text="Toggle Horizontal" />
	</svelte:fragment>
	<div class="grid grid-cols-4 items-start gap-6">
		<RadioGroup class="grid gap-3" bind:value {horizontal}>
			<RadioGroupLabel class="text-white">Best trilogy Bungie Halo game</RadioGroupLabel>
			<RadioGroupOption class={className} value="Halo CE" let:isSelected>
				<span> Halo Combat Evolved </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Halo 2" let:isSelected>
				<span> Halo 2 </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Halo 3" let:isSelected>
				<span> Halo 3 </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
		</RadioGroup>
		<RadioGroup class="grid gap-3" bind:value {horizontal}>
			<RadioGroupLabel class="text-white">Best major Halo game</RadioGroupLabel>
			<RadioGroupOption class={className} value="Halo Reach" disabled let:isSelected>
				<span> Halo Reach </span>
				<RadioGroupDescription class="sr-only">
					5th videogame in the Halo series released in 2010.
				</RadioGroupDescription>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Halo CE" let:isSelected>
				<span> Halo Combat Evolved </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Halo 2" let:isSelected>
				<span> Halo 2 </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Halo 3" let:isSelected>
				<span> Halo 3 </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Halo 4" disabled let:isSelected>
				<span> Halo 4 </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
		</RadioGroup>
		<RadioGroup class="grid gap-3" {horizontal}>
			<RadioGroupOption class={className} value="Halo CE" let:isSelected>
				<span> Halo Combat Evolved </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Halo 2" let:isSelected>
				<span> Halo 2 </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Halo 3" selected let:isSelected>
				<span> Halo 3 </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
		</RadioGroup>
		<RadioGroup class="grid gap-3" {horizontal}>
			<RadioGroupOption class={className} value="Halo CE" let:isSelected>
				<span> Halo Combat Evolved </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Halo 2" let:isSelected>
				<span> Halo 2 </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
			<RadioGroupOption class={className} value="Halo 3" let:isSelected>
				<span> Halo 3 </span>
				{#if isSelected}
					<div class="w-5 h-5 | grid place-content-center">
						<i class="bx bxs-badge-check text-xl" />
					</div>
				{/if}
			</RadioGroupOption>
		</RadioGroup>
	</div>
</Page>

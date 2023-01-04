<script lang="ts">
	import { Disclosure, DisclosureButton, DisclosurePanel } from "$lib";
	import { Page, Toggle } from "@app/components";
	import { fade, scale, slide } from "svelte/transition";
	import { useClassNameResolver } from "$lib/hooks";

	const className = useClassNameResolver<"DISABLED" | "OPEN">({
		base: "px-6 py-1.75 | border-2 rounded-lg font-medium outline-none hover:text-white",
		disabled: "border-slate-800 opacity-50",
		open: {
			off: "border-slate-600 focus:border-slate-300",
			on: "bg-slate-800 text-white border-slate-800 focus:border-slate-300"
		}
	});

	let open = false;
	let disabled = false;
</script>

<Page title="Disclosure">
	<div class="flex items-center gap-3" slot="options">
		<Toggle bind:checked={open} />
		<Toggle text="Toggle Disabled" bind:checked={disabled} />
	</div>
	<div class="grid grid-cols-4 gap-6">
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close>
			<DisclosureButton class={className}>Disclosure Button</DisclosureButton>
			<DisclosurePanel class="p-6 | grid gap-3 | border-2 border-slate-800 rounded-xl">
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button
					class="max-w-[fit-content] px-4 py-1.25 border-2 border-slate-600 outline-none focus:border-slate-300 rounded-lg"
					on:click={close}
				>
					Close
				</button>
			</DisclosurePanel>
		</Disclosure>
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close let:panel>
			<DisclosureButton class={className}>Disclosure Button</DisclosureButton>
			<div
				class="p-6 | grid gap-3 | border-2 border-slate-800 rounded-xl"
				slot="panel"
				use:panel
				transition:fade|local
			>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button
					class="max-w-[fit-content] px-4 py-1.25 border-2 border-slate-600 outline-none focus:border-slate-300 rounded-lg"
					on:click={close}
				>
					Close
				</button>
			</div>
		</Disclosure>
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close let:panel>
			<DisclosureButton class={className}>Disclosure Button</DisclosureButton>
			<div
				class="p-6 | grid gap-3 | border-2 border-slate-800 rounded-xl"
				slot="panel"
				use:panel
				transition:slide|local
			>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button
					class="max-w-[fit-content] px-4 py-1.25 border-2 border-slate-600 outline-none focus:border-slate-300 rounded-lg"
					on:click={close}
				>
					Close
				</button>
			</div>
		</Disclosure>
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close let:panel>
			<DisclosureButton class={className} {disabled}>Disclosure Button</DisclosureButton>
			<div
				class="p-6 | grid gap-3 | border-2 border-slate-800 rounded-xl"
				slot="panel"
				use:panel
				transition:scale|local={{ start: 0.25 }}
			>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button
					class="max-w-[fit-content] px-4 py-1.25 border-2 border-slate-600 outline-none focus:border-slate-300 rounded-lg"
					on:click={close}
				>
					Close
				</button>
			</div>
		</Disclosure>
	</div>
</Page>

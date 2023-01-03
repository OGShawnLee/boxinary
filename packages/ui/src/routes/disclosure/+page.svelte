<script>
	import { Disclosure, DisclosureButton, DisclosurePanel } from "$lib";
	import { Page } from "@app/components";
	import { fade, scale, slide } from "svelte/transition";

	let open = false;
	let disabled = false;
</script>

<Page title="Disclosure">
	<div class="flex items-center gap-3" slot="options">
		<button
			class="button focus:border-zinc-400"
			class:border-purple-500={open}
			on:click={() => (open = !open)}
		>
			Toggle
		</button>
		<button
			class="button focus:border-zinc-400"
			class:border-purple-500={disabled}
			on:click={() => (disabled = !disabled)}
		>
			Toggle Disabled
		</button>
	</div>
	<div class="grid grid-cols-4 gap-6">
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close>
			<DisclosureButton
				class={{
					base: "px-6 py-1.75 | border-2 font-medium rounded-lg outline-none hover:text-white",
					open: {
						off: "border-zinc-600 focus:border-zinc-300",
						on: "bg-zinc-800 text-white border-zinc-800 focus:border-zinc-300"
					}
				}}
			>
				Disclosure Button
			</DisclosureButton>
			<DisclosurePanel class="p-6 | grid gap-3 | border-2 border-zinc-800 rounded-xl">
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button
					class="max-w-[fit-content] px-4 py-1.25 border-2 border-zinc-600 outline-none focus:border-zinc-300 rounded-lg"
					on:click={close}
				>
					Close
				</button>
			</DisclosurePanel>
		</Disclosure>
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close let:panel>
			<DisclosureButton
				class={{
					base: "px-6 py-1.75 | border-2 font-medium rounded-lg outline-none hover:text-white",
					open: {
						off: "border-zinc-600 focus:border-zinc-300",
						on: "bg-zinc-800 text-white border-zinc-800 focus:border-zinc-300"
					}
				}}
			>
				Disclosure Button
			</DisclosureButton>
			<div
				class="p-6 | grid gap-3 | border-2 border-zinc-800 rounded-xl"
				slot="panel"
				use:panel
				transition:fade|local
			>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button
					class="max-w-[fit-content] px-4 py-1.25 border-2 border-zinc-600 outline-none focus:border-zinc-300 rounded-lg"
					on:click={close}
				>
					Close
				</button>
			</div>
		</Disclosure>
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close let:panel>
			<DisclosureButton
				class={{
					base: "px-6 py-1.75 | border-2 font-medium rounded-lg outline-none hover:text-white",
					open: {
						off: "border-zinc-600 focus:border-zinc-300",
						on: "bg-zinc-800 text-white border-zinc-800 focus:border-zinc-300"
					}
				}}
			>
				Disclosure Button
			</DisclosureButton>
			<div
				class="p-6 | grid gap-3 | border-2 border-zinc-800 rounded-xl"
				slot="panel"
				use:panel
				transition:slide|local
			>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button
					class="max-w-[fit-content] px-4 py-1.25 border-2 border-zinc-600 outline-none focus:border-zinc-300 rounded-lg"
					on:click={close}
				>
					Close
				</button>
			</div>
		</Disclosure>
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close let:panel>
			<DisclosureButton
				{disabled}
				class={{
					base: "px-6 py-1.75 | border-2 font-medium rounded-lg outline-none hover:text-white",
					disabled: "border-zinc-800 opacity-50",
					open: {
						off: "border-zinc-600 focus:border-zinc-300",
						on: "bg-zinc-800 text-white border-zinc-800 focus:border-zinc-300"
					}
				}}
			>
				Disclosure Button
			</DisclosureButton>
			<div
				class="p-6 | grid gap-3 | border-2 border-zinc-800 rounded-xl"
				slot="panel"
				use:panel
				transition:scale|local={{ start: 0.25 }}
			>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button
					class="max-w-[fit-content] px-4 py-1.25 border-2 border-zinc-600 outline-none focus:border-zinc-300 rounded-lg"
					on:click={close}
				>
					Close
				</button>
			</div>
		</Disclosure>
	</div>
</Page>

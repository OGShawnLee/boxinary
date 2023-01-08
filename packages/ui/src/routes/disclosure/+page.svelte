<script lang="ts">
	import { Disclosure, DisclosureButton, DisclosurePanel } from "$lib";
	import { Page, Toggle } from "@app/components";
	import { fade, scale, slide } from "svelte/transition";
	import { useClassNameResolver } from "$lib/hooks";

	const className = useClassNameResolver<"DISABLED" | "OPEN">({
		base: "button",
		disabled: "button--disabled",
		open: { off: "button--closed", on: "button--open" }
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
			<DisclosurePanel class="panel">
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button class="button-small" on:click={close}> Close </button>
			</DisclosurePanel>
		</Disclosure>
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close let:panel>
			<DisclosureButton class={className}>Disclosure Button</DisclosureButton>
			<div class="panel" slot="panel" use:panel transition:fade|local>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button class="button-small" on:click={close}> Close </button>
			</div>
		</Disclosure>
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close let:panel>
			<DisclosureButton class={className}>Disclosure Button</DisclosureButton>
			<div class="panel" slot="panel" use:panel transition:slide|local>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button class="button-small" on:click={close}> Close </button>
			</div>
		</Disclosure>
		<Disclosure class="flex flex-col items-start gap-4.5" {open} let:close let:panel>
			<DisclosureButton class={className} {disabled}>Disclosure Button</DisclosureButton>
			<div class="panel" slot="panel" use:panel transition:scale|local={{ start: 0.25 }}>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, et voluptatum eos nemo
					recusandae dicta corporis totam exercitationem odio deserunt.
				</p>
				<button class="button-small" on:click={close}> Close </button>
			</div>
		</Disclosure>
	</div>
</Page>

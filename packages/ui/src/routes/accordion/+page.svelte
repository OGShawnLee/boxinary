<script>
	import {
		Accordion,
		AccordionButton,
		AccordionHeading,
		AccordionItem,
		AccordionPanel
	} from "$lib";
	import { Page, Toggle } from "@app/components";
	import { slide } from "svelte/transition";

	let finite = false;
	let unique = true;
	let disabled = false;
	let disabledItem = true;
</script>

<Page title="Accordion">
	<div class="flex items-center gap-3" slot="options">
		<Toggle text="Toggle Disabled Navigation" bind:checked={disabled} />
		<Toggle text="Toggle Disabled Item" bind:checked={disabledItem} />
		<Toggle text="Toggle Finite" bind:checked={finite} />
		<Toggle text="Toggle Unique" bind:checked={unique} />
	</div>
	<Accordion class="grid gap-9" {disabled} {finite} {unique}>
		<AccordionItem class="grid gap-6" let:isOpen let:button let:heading let:panel>
			<h2 use:heading>
				<button class="button {isOpen ? 'button--open' : 'button--closed'}" use:button>
					Accordion Item Button
				</button>
			</h2>
			<div class="panel | max-w-80" slot="panel" use:panel let:close transition:slide>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, molestias!</p>
				<button class="button-small" on:click={close}> Close </button>
			</div>
		</AccordionItem>
		<AccordionItem class="grid gap-6">
			<AccordionHeading>
				<AccordionButton
					class={{
						base: "button text-base",
						disabled: "button--disabled",
						open: { off: "button--closed", on: "button--open" }
					}}
					disabled={disabledItem}
				>
					Accordion Item Button
				</AccordionButton>
			</AccordionHeading>
			<div slot="panel" transition:slide>
				<AccordionPanel class="panel | max-w-80" static let:close>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, molestias!</p>
					<button class="button-small" on:click={close}> Close </button>
				</AccordionPanel>
			</div>
		</AccordionItem>
		<AccordionItem class="grid gap-6" let:isOpen let:button let:heading let:panel>
			<h2 use:heading>
				<button class="button {isOpen ? 'button--open' : 'button--closed'}" use:button>
					Accordion Item Button
				</button>
			</h2>
			<div class="panel | max-w-80" slot="panel" use:panel let:close transition:slide>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, molestias!</p>
				<button class="button-small" on:click={close}> Close </button>
			</div>
		</AccordionItem>
		<AccordionItem class="grid gap-6" let:isOpen let:button let:heading let:panel>
			<h2 use:heading>
				<button class="button {isOpen ? 'button--open' : 'button--closed'}" use:button>
					Accordion Item Button
				</button>
			</h2>
			<div class="panel | max-w-80" slot="panel" use:panel let:close transition:slide>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, molestias!</p>
				<button class="button-small" on:click={close}> Close </button>
			</div>
		</AccordionItem>
	</Accordion>
</Page>

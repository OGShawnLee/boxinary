<script>
	import {
		Accordion,
		AccordionButton,
		AccordionHeading,
		AccordionItem,
		AccordionPanel
	} from "$lib";
	import { Page } from "@app/components";
	import { slide } from "svelte/transition";

	let finite = false;
	let disabled = false;
</script>

<Page title="Accordion">
	<div class="flex items-center gap-3" slot="options">
		<button
			class="button focus:border-zinc-400"
			class:border-purple-500={disabled}
			on:click={() => (disabled = !disabled)}
		>
			Toggle Disabled Navigation
		</button>
		<button
			class="button focus:border-zinc-400"
			class:border-purple-500={finite}
			on:click={() => (finite = !finite)}
		>
			Toggle Finite
		</button>
	</div>
	<Accordion class="grid gap-9" {disabled} {finite}>
		<AccordionItem class="grid gap-6" let:button let:heading let:panel>
			<h2 use:heading>
				<button class="button-focus" use:button> Accordion Item Button </button>
			</h2>
			<div class="grid gap-1.5" slot="panel" use:panel let:close transition:slide>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, molestias!</p>
				<button class="button-focus" on:click={close}> Close </button>
			</div>
		</AccordionItem>
		<AccordionItem class="grid gap-6">
			<AccordionHeading>
				<AccordionButton class="button-focus button--disabled" disabled>
					Accordion Item Button
				</AccordionButton>
			</AccordionHeading>
			<AccordionPanel class="grid gap-1.5" let:close>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, molestias!</p>
				<button class="button-focus" on:click={close}> Close </button>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem class="grid gap-6" let:button let:heading let:panel>
			<h2 use:heading>
				<button class="button-focus" use:button> Accordion Item Button </button>
			</h2>
			<div class="grid gap-1.5" slot="panel" use:panel let:close transition:slide>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, molestias!</p>
				<button class="button-focus" on:click={close}> Close </button>
			</div>
		</AccordionItem>
		<AccordionItem class="grid gap-6" let:button let:heading let:panel>
			<h2 use:heading>
				<button class="button-focus" use:button> Accordion Item Button </button>
			</h2>
			<div class="grid gap-1.5" slot="panel" use:panel let:close transition:slide>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, molestias!</p>
				<button class="button-focus" on:click={close}> Close </button>
			</div>
		</AccordionItem>
	</Accordion>
</Page>

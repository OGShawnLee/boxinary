<script lang="ts">
	import { Page, Toggle } from "@app/components";
	import { Popover, PopoverButton, PopoverOverlay, PopoverPanel } from "$lib";
	import { fade, scale, slide } from "svelte/transition";
	import { useClassNameResolver } from "$lib/hooks";

	const buttonClassName = useClassNameResolver<"OPEN">({
		base: "button",
		open: { off: "button--closed", on: "button--open" }
	});

	let forceFocus = true;
</script>

<Page title="Popover">
	<div class="flex items-center gap-3" slot="options">
		<Toggle text="Toggle Force Focus" bind:checked={forceFocus} />
	</div>
	<div class="grid gap-6">
		<button class="button-small"> External Element </button>
		<div class="grid grid-cols-4 gap-6">
			<Popover class="flex flex-col gap-4.5" let:isOpen let:button let:panel>
				<button class={buttonClassName({ isOpen })} use:button> Toggle </button>
				<div class="panel" slot="panel" use:panel let:close transition:fade|local>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla id totam vel
						tenetur. Molestiae quo pariatur dolore distinctio dolores.
					</p>
					<button class="button-small" on:click={close}> Close </button>
				</div>
			</Popover>
			<Popover class="flex flex-col gap-9" {forceFocus} let:isOpen let:button let:overlay let:panel>
				<button class={buttonClassName({ isOpen })} use:button> Toggle </button>
				<div class="fixed inset-0 bg-raisin-05/90" slot="overlay" use:overlay />
				<div
					class="panel panel--dark panel--modal"
					slot="panel"
					use:panel
					let:close
					transition:scale={{ start: 0.75 }}
				>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla id totam vel
						tenetur. Molestiae quo pariatur dolore distinctio dolores.
					</p>
					<div class="flex gap-3">
						<button class="button-small" on:click={close}> Accept </button>
						<button class="button-small" on:click={close}> Close </button>
					</div>
				</div>
			</Popover>
			<Popover class="flex flex-col gap-4.5" {forceFocus} let:isOpen let:close>
				<PopoverButton class={buttonClassName}>
					Toggle {isOpen}
				</PopoverButton>
				<PopoverOverlay class="fixed inset-0 bg-raisin-05/90" />
				<PopoverPanel class="panel panel--dark panel--modal">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla id totam vel
						tenetur. Molestiae quo pariatur dolore distinctio dolores.
					</p>
					<div class="flex gap-3">
						<button class="button-small" on:click={close}> Accept </button>
						<button class="button-small" on:click={close}> Close </button>
					</div>
				</PopoverPanel>
			</Popover>
			<Popover class="flex flex-col gap-4.5" let:isOpen let:button let:panel>
				<button class={buttonClassName({ isOpen })} use:button> Toggle </button>
				<div class="panel" slot="panel" use:panel let:close transition:slide>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla id totam vel
						tenetur. Molestiae quo pariatur dolore distinctio dolores.
					</p>
					<button class="button--small" on:click={close}> Close </button>
				</div>
			</Popover>
		</div>
	</div>
</Page>

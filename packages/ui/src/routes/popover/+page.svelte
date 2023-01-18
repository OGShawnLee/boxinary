<script lang="ts">
	import { Page, Toggle } from "@app/components";
	import { Popover, PopoverButton, PopoverGroup, PopoverOverlay, PopoverPanel } from "$lib";
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
				<div class="overlay" slot="overlay" use:overlay />
				<div
					class="panel panel--modal"
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
			<Popover class="flex flex-col gap-4.5" {forceFocus} let:close>
				<PopoverButton class={buttonClassName}>Toggle</PopoverButton>
				<PopoverOverlay class="overlay" />
				<PopoverPanel class="panel panel--modal">
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
			<Popover class="flex flex-col gap-4.5" let:isOpen let:button>
				<button class={buttonClassName({ isOpen })} use:button> Toggle </button>
				<div slot="panel" transition:slide|local let:close>
					<PopoverPanel class="panel" static>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla id totam vel
							tenetur. Molestiae quo pariatur dolore distinctio dolores.
						</p>
						<button class="button-small" on:click={close}> Close </button>
					</PopoverPanel>
				</div>
			</Popover>
		</div>
		<PopoverGroup class="grid gap-3" let:isOpen>
			<h2 class="mt-12 | text-xl text-white font-semibold">Popover Group</h2>
			<span class="max-w-fit px-6 py-2 | bg-raisin-12 rounded-lg">
				Group State: {isOpen ? "Open" : "Closed"}
			</span>
			<div class="grid grid-cols-4">
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
				<Popover
					class="flex flex-col gap-9"
					{forceFocus}
					let:isOpen
					let:button
					let:overlay
					let:panel
				>
					<button class={buttonClassName({ isOpen })} use:button> Toggle </button>
					<div class="overlay" slot="overlay" use:overlay />
					<div
						class="panel panel--modal"
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
					<PopoverOverlay class="overlay" />
					<PopoverPanel class="panel panel--modal">
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
				<Popover class="flex flex-col gap-4.5" let:isOpen let:button>
					<button class={buttonClassName({ isOpen })} use:button> Toggle </button>
					<div slot="panel" transition:slide let:close>
						<PopoverPanel class="panel" static>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla id totam
								vel tenetur. Molestiae quo pariatur dolore distinctio dolores.
							</p>
							<button class="button-small" on:click={close}> Close </button>
						</PopoverPanel>
					</div>
				</Popover>
			</div>
		</PopoverGroup>
	</div>
</Page>

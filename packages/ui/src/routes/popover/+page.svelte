<script>
	import { Popover, PopoverButton, PopoverOverlay, PopoverPanel } from "$lib";
	import { fade, scale, slide } from "svelte/transition";
</script>

<section class="grid gap-6">
	<button class="button"> External Element </button>
	<div class="grid grid-cols-4 gap-12">
		<Popover class="flex flex-col gap-9" let:isOpen let:button let:panel>
			<button class="button" use:button>
				Toggle {isOpen}
			</button>
			<div class="grid gap-4.5" slot="panel" use:panel let:close transition:fade|local>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla id totam vel
					tenetur. Molestiae quo pariatur dolore distinctio dolores.
				</p>
				<button class="button" on:click={close}> Close </button>
			</div>
		</Popover>
		<Popover class="flex flex-col gap-9" forceFocus let:isOpen let:button let:overlay let:panel>
			<button class="button" use:button>
				Toggle {isOpen}
			</button>
			<div class="fixed inset-0 bg-zinc-900/90" slot="overlay" use:overlay />
			<div
				class="fixed | transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | grid gap-4.5"
				slot="panel"
				use:panel
				let:close
				transition:scale={{ start: 0.75 }}
			>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla id totam vel
					tenetur. Molestiae quo pariatur dolore distinctio dolores.
				</p>
				<button class="button" on:click={close}> Close </button>
			</div>
		</Popover>
		<Popover class="flex flex-col gap-9" forceFocus let:isOpen let:close>
			<PopoverButton class="button">
				Toggle {isOpen}
			</PopoverButton>
			<PopoverOverlay class="fixed inset-0 bg-zinc-900/90" />
			<PopoverPanel
				class="fixed | transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | grid gap-4.5"
			>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla id totam vel
					tenetur. Molestiae quo pariatur dolore distinctio dolores.
				</p>
				<button class="button" on:click={close}> Close </button>
			</PopoverPanel>
		</Popover>
		<Popover class="flex flex-col gap-9" let:isOpen let:button let:panel>
			<button class="button" use:button>
				Toggle {isOpen}
			</button>
			<div class="grid gap-4.5" slot="panel" use:panel let:close transition:slide>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nulla id totam vel
					tenetur. Molestiae quo pariatur dolore distinctio dolores.
				</p>
				<button class="button" on:click={close}> Close </button>
			</div>
		</Popover>
	</div>
</section>

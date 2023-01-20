<script lang="ts">
	import { Page, Toggle } from "@app/components";
	import {
		Button,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		RadioGroup,
		RadioGroupOption,
		Toolbar,
		ToolbarGroup,
		ToolbarItem,
		ToolbarLabel
	} from "$lib";
	import { useClassNameResolver } from "$lib/hooks";
	import { slide } from "svelte/transition";

	const className = useClassNameResolver<"ACTIVE" | "DISABLED">({
		base: "px-4 py-2 | flex items-center gap-1.75 | text-light text-left",
		disabled: "opacity-50",
		active: "text-white"
	});
	const buttonClassName = useClassNameResolver<"PRESSED">({
		base: "px-4 py-2 | bg-raisin-15 rounded-lg | focus:(ring-2 ring-raisin-50)",
		pressed: "text-white"
	});
	const itemClassName = useClassNameResolver<"SELECTED">({
		base: "px-4 py-2 | bg-raisin-15 rounded-lg | focus:(ring-2 ring-raisin-50)",
		selected: "text-white"
	});

	let fontFamily = "Poppins";

	function handleClick(this: HTMLElement) {
		if (this.textContent) fontFamily = this.textContent;
	}

	let bold = false;
	let italic = false;
	let underline = false;
	let textAlign = "text-left";
	let vertical = false;
</script>

<Page title="Toolbar">
	<svelte:fragment slot="options">
		<Toggle text="Toggle Vertical" bind:checked={vertical} />
	</svelte:fragment>
	<div class="grid gap-9">
		<ToolbarGroup class="grid gap-3" as="div">
			<ToolbarLabel class="text-white">Text Formatting</ToolbarLabel>
			<Toolbar
				class="p-4 | flex gap-3 bg-raisin-12 rounded-lg focus-within:(ring-2 ring-raisin-30)"
				{vertical}
			>
				<ToolbarItem
					class="px-4 py-2 | bg-raisin-15 rounded-lg | focus:(ring-2 ring-raisin-50) {bold
						? 'text-white'
						: ''}"
					on:click={() => (bold = !bold)}
				>
					<span class="sr-only">Toggle Text Bold</span>
					<i class="bx bx-bold" />
				</ToolbarItem>
				<Button class={buttonClassName} bind:pressed={italic}>
					<span class="sr-only">Toggle Text Italic</span>
					<i class="bx bx-italic" />
				</Button>
				<Button class={buttonClassName} bind:pressed={underline}>
					<span class="sr-only">Toggle Text Underline</span>
					<i class="bx bx-underline" />
				</Button>
				<Menu class="relative | flex flex-col items-start gap-3" let:isOpen>
					<MenuButton
						class={{
							base: "button flex items-center gap-6",
							open: { on: "button--open", off: "button--closed" }
						}}
					>
						<span> {fontFamily} </span>
						<i
							class="bx bxs-down-arrow text-sm transform transition duration-150"
							class:rotate-180={isOpen}
						/>
					</MenuButton>
					<div class="absolute top-12" slot="items" transition:slide|local>
						<MenuItems class="w-40 | grid | bg-raisin-15 rounded-lg outline-none" static>
							<MenuItem class={className} on:click={handleClick}>Victor Mono</MenuItem>
							<div class="w-full h-0.5 | bg-raisin-20" aria-hidden role="separator" />
							<MenuItem class={className} on:click={handleClick}>Poppins</MenuItem>
							<div class="w-full h-0.5 | bg-raisin-20" aria-hidden role="separator" />
							<MenuItem class={className} on:click={handleClick}>JetBrains Mono</MenuItem>
							<div class="w-full h-0.5 | bg-raisin-20" aria-hidden role="separator" />
							<MenuItem class={className} on:click={handleClick}>Lato</MenuItem>
							<div class="w-full h-0.5 | bg-raisin-20" aria-hidden role="separator" />
							<MenuItem class={className} on:click={handleClick}>Fira Code</MenuItem>
						</MenuItems>
					</div>
				</Menu>
				<RadioGroup class="contents" bind:value={textAlign}>
					<RadioGroupOption class={itemClassName} value="text-left">
						<i class="bx bx-align-left" />
					</RadioGroupOption>
					<RadioGroupOption class={itemClassName} value="text-center">
						<i class="bx bx-align-middle" />
					</RadioGroupOption>
					<RadioGroupOption class={itemClassName} value="text-right">
						<i class="bx bx-align-right" />
					</RadioGroupOption>
					<RadioGroupOption class={itemClassName} value="text-justify">
						<i class="bx bx-align-justify" />
					</RadioGroupOption>
				</RadioGroup>
			</Toolbar>
		</ToolbarGroup>
		<p
			class={textAlign}
			class:font-bold={bold}
			class:italic
			class:underline
			style="font-family: {fontFamily};"
		>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe magni delectus nam consequatur
			architecto illo provident aperiam ad quaerat, nobis ea id fuga exercitationem error unde autem
			eum inventore debitis quasi explicabo, ratione consectetur? Magnam non culpa sint omnis
			repudiandae similique molestiae vero ipsa, atque, velit autem inventore recusandae dicta
			deleniti veniam! Reiciendis assumenda ratione commodi eos illo odio facilis facere quos saepe
			eveniet natus sequi tempore quidem est iste maxime error at ex omnis deleniti vel, laborum sit
			dolore. Obcaecati voluptate eveniet itaque dolorum unde. Quis voluptates vitae qui!
		</p>
	</div>
</Page>

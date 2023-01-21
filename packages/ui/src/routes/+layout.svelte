<script lang="ts">
	import "virtual:windi.css";
	import { Menu, MenuButton, MenuItem, MenuItems } from "$lib";
	import { slide } from "svelte/transition";
	import { useClassNameResolver } from "$lib/hooks";

	const button = useClassNameResolver<"OPEN">({
		base: "px-6 py-2 | rounded-lg outline-none focus:text-white focus:(ring-2 ring-raisin-50) hover:text-white",
		open: "text-white"
	});

	const className = useClassNameResolver<"ACTIVE" | "DISABLED">({
		base: "px-6 py-2 | flex items-center gap-1.75 | text-sm text-light text-left",
		disabled: "opacity-50",
		active: "bg-raisin-15 text-white"
	});
</script>

<header class="fixed top-0 inset-x-0 z-90 h-16 | md:h-24 lg:static">
	<div class="mx-auto h-full layout-length | flex items-center gap-12">
		<div>
			<a class="text-2xl text-white font-semibold md:text-4xl" href="/"> Boxinary </a>
		</div>
		<Menu class="relative" infinite>
			<MenuButton class={button}>Components</MenuButton>
			<div class="absolute top-12 z-10" slot="items" transition:slide|local>
				<MenuItems
					class="w-40 | grid | bg-raisin-12 rounded-lg overflow-hidden outline-none"
					static
				>
					<MenuItem class={className} as="a" href="/accordion">Accordion</MenuItem>
					<div class="w-full h-0.5 | bg-raisin-15" aria-hidden role="separator" />
					<MenuItem class={className} as="a" href="/dialog">Dialog</MenuItem>
					<div class="w-full h-0.5 | bg-raisin-15" aria-hidden role="separator" />
					<MenuItem class={className} as="a" href="/disclosure">Disclosure</MenuItem>
					<div class="w-full h-0.5 | bg-raisin-15" aria-hidden role="separator" />
					<MenuItem class={className} as="a" href="/listbox">Listbox</MenuItem>
					<div class="w-full h-0.5 | bg-raisin-15" aria-hidden role="separator" />
					<MenuItem class={className} as="a" href="/menu">Menu</MenuItem>
					<div class="w-full h-0.5 | bg-raisin-15" aria-hidden role="separator" />
					<MenuItem class={className} as="a" href="/navigable">Navigable</MenuItem>
					<div class="w-full h-0.5 | bg-raisin-15" aria-hidden role="separator" />
					<MenuItem class={className} as="a" href="/popover">Popover</MenuItem>
					<div class="w-full h-0.5 | bg-raisin-15" aria-hidden role="separator" />
					<MenuItem class={className} as="a" href="/radio-group">Radio Group</MenuItem>
					<div class="w-full h-0.5 | bg-raisin-15" aria-hidden role="separator" />
					<MenuItem class={className} as="a" href="/switch">Switch</MenuItem>
					<div class="w-full h-0.5 | bg-raisin-15" aria-hidden role="separator" />
					<MenuItem class={className} as="a" href="/tabs">Tabs</MenuItem>
					<div class="w-full h-0.5 | bg-raisin-15" aria-hidden role="separator" />
					<MenuItem class={className} as="a" href="/toolbar">Toolbar</MenuItem>
				</MenuItems>
			</div>
		</Menu>
	</div>
</header>

<div class="w-full mx-auto mt-16 mb-12 px-4 | layout-length | md:(mt-24) lg:(mt-6 px-0)">
	<slot />
</div>

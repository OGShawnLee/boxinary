<script lang="ts">
	import { page } from "$app/stores";
	import { NavigableItem } from "@boxinary/ui";
	import { useClassNameResolver } from "@boxinary/ui/hooks";

	export let path: string;
	export let icon: string;
	export let title: string;

	$: isActive = $page.url.pathname.includes(path);
	$: className = useClassNameResolver<"ACTIVE">({
		base: "group px-6 py-4 | grid gap-1.5 | border-2 border-transparent rounded-lg focus:(border-white)",
		active: { on: "bg-raisin-12 hover:bg-raisin-15", off: "hover:bg-raisin-12" }
	});
</script>

<NavigableItem as="a" class={className({ isActive })} href="/settings/{path}">
	<span class="flex items-center gap-1.5">
		<i class="bx {icon} text-xl group-focus-within:text-white" class:text-aqua-50={isActive} />
		<span class="text-lg text-rich-90 font-medium"> {title} </span>
	</span>
	<span class="text-sm lg:text-base">
		<slot />
	</span>
</NavigableItem>

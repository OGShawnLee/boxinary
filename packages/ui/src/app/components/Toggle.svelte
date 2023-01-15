<script lang="ts">
	import { Switch } from "$lib";
	import { useClassNameResolver } from "$lib/hooks";

	export let checked = false;
	export let text = "Toggle";
	export { className as class };

	$: finalClassName = useClassNameResolver<"CHECKED">({
		base: "px-6 py-1.75 | border-2 rounded-lg outline-none font-semibold hover:text-white",
		checked: {
			on: "border-aqua-50 text-white focus:border-aqua-75",
			off: "border-raisin-20 focus:(border-raisin-50 text-rich-90)"
		}
	})({ isChecked: checked });
</script>

<Switch class={finalClassName} bind:checked>
	<slot>{text}</slot>
</Switch>

<script lang="ts">
	import { Switch } from "$lib";
	import { useClassNameResolver } from "$lib/hooks";

	export let checked = false;
	export let text = "Toggle";
	export { className as class };

	$: finalClassName = useClassNameResolver<"CHECKED">({
		base: "px-6 py-1.75 | border-2 rounded-lg outline-none font-semibold hover:text-white",
		checked: {
			on: "border-purple-400 text-white focus:border-white",
			off: "border-slate-600 focus:border-slate-300"
		}
	})({ isChecked: checked });
</script>

<Switch class={finalClassName} bind:checked>
	<slot>{text}</slot>
</Switch>

<script lang="ts" context="module">
	import type { ChoiceState } from "./state";

	function getCheckboxStyling(state: ChoiceState) {
		if (state === "PENDING") return "bg-white";
		return state === "CORRECT" ? "bg-aqua-50" : "bg-rose-500";
	}
</script>

<script lang="ts">
	import type { ChoiceObject } from "./state";
	import { Checkbox } from "$lib/components";
	import { getQuestionContext } from "./state";

	const { createChoiceState } = getQuestionContext();

	export let choice: ChoiceObject;

	const { state, choose, isChecked, isDisabled } = createChoiceState(choice);

	$: className = getCheckboxStyling($state);
</script>

<form class="flex items-start gap-1.5" on:submit|preventDefault>
	<Checkbox
		class="h-3.75 min-w-3.75 w-3.5 mt-2 | grid place-content-center rounded-full {className}"
		type="submit"
		label="Select Choice"
		disabled={$isDisabled}
		isChecked={$isChecked}
		on:click={choose}
	>
		<span class="h-2.75 min-w-2.75 w-2.5 | bg-raisin-10 rounded-full" />
	</Checkbox>
	<span class="hover:cursor-pointer md:text-lg" on:click={choose}> {choice.choice} </span>
</form>

<script lang="ts">
	import type { QuizObject } from "./state";
	import { createQuizState } from "./state";

	let className: string;

	export let index: number;
	export let length: number;
	export let state: QuizObject;
	export { className as class };

	const {
		isShowingNavigation,
		navigation: { currentIndex, next, previous }
	} = createQuizState({ index, length, state });
</script>

<div class={className}>
	<slot isShowingNavigation={$isShowingNavigation} currentIndex={$currentIndex} {next} {previous} />
</div>

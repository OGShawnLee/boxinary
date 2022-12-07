<script lang="ts">
	import Choice from "./Choice.svelte";
	import type { QuestionObject } from "./state";
	import { getQuizContext } from "./state";
	import { fade, scale } from "svelte/transition";

	const { isShowingNavigation, currentIndex, createQuestionState } = getQuizContext();

	export let index: number;
	export let question: QuestionObject;

	const { state } = createQuestionState(question);

	$: if ($currentIndex === index) isShowingNavigation.set($state === "COMPLETE");
</script>

{#if index === $currentIndex}
	<article class="grid items-center gap-12 | lg:(grid-cols-2)" in:fade>
		<!-- Question -->
		<div class="py-8 | grid gap-7.5 | bg-raisin-12 rounded-xl">
			<h2 class="px-8">
				<strong class="text-2xl md:text-3xl text-white font-bold"> {question.name} </strong>
				<span class="tex-lg"> means: </span>
			</h2>
			<div class="h-0.75 w-full | bg-raisin-20" aria-hidden />
			<div class="px-8 grid gap-4.5">
				{#each Object.values(question.choices) as choice}
					<Choice {choice} />
				{/each}
			</div>
		</div>
		<!-- Result -->
		{#if $state !== "INCOMPLETE"}
			<div class="grid gap-3" in:scale={{ start: 0.75 }}>
				<p class="text-xl text-rich-90 leading-relaxed | @lg:text-lg">{question.description}</p>
				<p class="text-lg leading-relaxed | @lg:text-base">{question.summary}</p>
			</div>
		{/if}
	</article>
{/if}

<script lang="ts">
	import type { PageData } from "./$types";
	import { Header, Quiz, QuizQuestion } from "$lib/components";

	export let data: PageData;

	const { collection, state } = data;
	const arr = Object.entries(state);
</script>

<svelte:head>
	<title>Playing {collection.name} / Boxinary</title>
</svelte:head>

<main class="grid gap-12">
	<Header subtitle={collection.description}>
		Playing <strong class="text-white"> {collection.name} </strong>
	</Header>
	<Quiz
		class="relative"
		index={0}
		length={arr.length}
		{state}
		let:isShowingNavigation
		let:currentIndex
		let:previous
		let:next
	>
		{#if isShowingNavigation && currentIndex !== 0}
			<button
				class="hidden absolute top-1/2 -left-20 transform -translate-y-1/2 md:block"
				on:click={previous}
				aria-label="Check Previous Question"
			>
				<i class="bx bx-chevron-left text-6xl" />
			</button>
		{/if}
		{#each arr as [definition, question], index (definition)}
			<QuizQuestion {index} {question} />
		{/each}
		{#if isShowingNavigation && currentIndex !== arr.length - 1}
			<button
				class="hidden absolute top-1/2 -right-20 transform -translate-y-1/2 md:block"
				on:click={next}
				aria-label="Check Next Question"
			>
				<i class="bx bx-chevron-right text-6xl" />
			</button>
		{/if}
	</Quiz>
</main>

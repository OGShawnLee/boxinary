<script lang="ts">
	import type { PageData } from "./$types";
	import { DefinitionQuestion, Header } from "$lib/components";

	export let data: PageData;

	const { collection, session } = data;

	let currentIndex = 0;
</script>

<svelte:head>
	<title>Playing {collection.name} / Boxinary</title>
</svelte:head>

<main class="grid gap-12">
	<Header subtitle={collection.description}>
		Playing <strong class="text-white"> {collection.name} </strong>
	</Header>
	<div>
		{#each session as { id, name, definition, description, summary, options }, index (id)}
			<DefinitionQuestion
				isCurrentQuestion={index === currentIndex}
				definition={{ definition, name, description, summary, options }}
				on:click={() => (currentIndex = currentIndex === session.length - 1 ? 0 : currentIndex + 1)}
			/>
		{/each}
	</div>
</main>

<!-- <div class="grid gap-2.75">
		<h2 class="text-xl text-rich-90 font-medium">{name}</h2>
		<div class="grid gap-1.5">
			{#each options as option}
				<div class="flex items-start gap-1.25">
					<form on:submit|preventDefault>
						<Checkbox
							class="h-3.5 min-w-3.5 w-3.5 mt-1.25 | grid place-content-center rounded-full bg-white"
							type="submit"
							label="Select Option"
						>
							<span class="h-2.5 min-w-2.5 w-2.5 | bg-raisin-10 rounded-full" />
						</Checkbox>
					</form>
					<span>{option}</span>
				</div>
			{/each}
		</div>
	</div> -->

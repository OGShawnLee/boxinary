<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinitionExamples, Header } from "$lib/components";
	import { currentUser } from "@root/state";
	import { possessive } from "$lib/utils";

	export let data: PageData;

	const { examples, foundUser } = data;
	const isOwner = $currentUser?.displayName === foundUser.displayName;

	// TODO: ADD MASONRY FALLBACK SUPPORT
</script>

<svelte:head>
	{#if isOwner}
		<title>Your Examples / Boxinary</title>
	{:else}
		<title>{foundUser.name} (@{foundUser.displayName}) Examples / Boxinary</title>
	{/if}
</svelte:head>

<div class="grid gap-9">
	<Header>
		<b class="bold"> {isOwner ? "Your" : possessive(foundUser.displayName)} </b>
		<b class="medium">examples</b>
	</Header>
	<main class="grid items-start grid-rows-[masonry] gap-6 | md:grid-cols-2 xl:grid-cols-3">
		<CardDefinitionExamples
			displayName={foundUser.displayName}
			definitions={examples}
			headingLevel="h2"
		/>
	</main>
</div>

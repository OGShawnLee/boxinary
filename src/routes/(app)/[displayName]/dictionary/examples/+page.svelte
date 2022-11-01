<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinitionExamples, Header } from "$lib/components";
	import { page } from "$app/stores";
	import { currentUser } from "@root/state";
	import { possessive } from "$lib/utils";

	export let data: PageData;

	const { examples, foundUser } = data;
	const path = $page.url.pathname;
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
		<span class="text-white font-semibold">
			{#if isOwner}
				Your Examples
			{:else}
				{possessive(foundUser.displayName)} Examples
			{/if}
		</span>
	</Header>
	<main class="grid items-start grid-rows-[masonry] gap-6 | md:grid-cols-2 xl:grid-cols-3">
		<CardDefinitionExamples
			displayName={foundUser.displayName}
			definitions={examples}
			headingLevel="h2"
		/>
	</main>
</div>

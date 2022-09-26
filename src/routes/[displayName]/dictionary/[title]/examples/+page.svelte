<script lang="ts">
	import type { PageData } from "./$types";
	import { CardExample } from "$lib/components";
	import { currentUser } from "@root/state";
	import { page } from "$app/stores";

	export let data: PageData;

	const { definition, examples } = data;
	const displayName = definition.author.displayName;
	const isOwner = $currentUser?.displayName === displayName;
	const path = $page.url.pathname;
</script>

<svelte:head>
	<title>{definition.title} Examples / Boxinary</title>
</svelte:head>

<div class="grid gap-18">
	<header class="flex items-end justify-between">
		<div class="grid">
			<h1 class="text-xl text-rich-90">
				<strong class="text-white"> {definition.title} </strong> Examples
			</h1>
			<span class="text-sm text-aqua-50"> {definition.atomic} </span>
		</div>
		{#if isOwner}
			<a class="button button--raisin grid-center | max-w-fit mt-1.5" href="{path}/add">
				Add Example
			</a>
		{/if}
	</header>
	<main class="grid grid-cols-3 gap-x-6 gap-y-15">
		{#each examples as { text, source, createdAt }}
			<CardExample isDedicated {text} {source} {createdAt} {displayName} />
		{/each}
	</main>
</div>

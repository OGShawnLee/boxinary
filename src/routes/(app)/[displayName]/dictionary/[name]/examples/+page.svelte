<script lang="ts">
	import type { PageData } from "./$types";
	import { CardExample } from "$lib/components";
	import { currentUser } from "@root/state";
	import { page } from "$app/stores";

	export let data: PageData;

	const { definition, examples } = data;
	const displayName = definition.user.displayName;
	const isOwner = $currentUser?.displayName === displayName;
	const path = $page.url.pathname;
</script>

<svelte:head>
	<title>{definition.name} Examples / Boxinary</title>
</svelte:head>

<div class="grid gap-9">
	<header class="flex flex-wrap items-end justify-between gap-3">
		<div class="grid">
			<h1 class="text-xl text-rich-90 | lg:text-2xl">
				<strong class="text-white"> {definition.name} </strong> Examples
			</h1>
			<span class="text-sm text-aqua-50"> {definition.definition} </span>
		</div>
		{#if isOwner}
			<a
				class="button button--raisin grid-center | w-full mt-1.5 | sm:max-w-[fit-content]"
				href="{path}/add"
			>
				Add Example
			</a>
		{/if}
	</header>
	<main class="grid gap-6 | sm:grid-cols-2 lg:grid-cols-3">
		{#each examples as example}
			<CardExample isDedicated {...example} {displayName} redirectTo={path} />
		{/each}
	</main>
</div>

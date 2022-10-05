<script lang="ts">
	import type { PageData } from "./$types";
	import { currentUser } from "@root/state";
	import { page } from "$app/stores";
	import { getFormatedDate } from "$lib/utils";

	export let data: PageData;

	const { collection, foundUser } = data;
	const isOwner = $currentUser?.id === foundUser.id;
	const path = $page.url.pathname;
</script>

<svelte:head>
	<title>{collection.name} Collection / Boxinary</title>
</svelte:head>

<div class="grid gap-9">
	<header class="flex items-end justify-between flex-wrap gap-x-12 gap-y-6">
		<div class="grid">
			<h1 class="text-2xl text-white">{collection.name}</h1>
			<div>
				<a class="text-sm hover:(text-aqua-50 underline)" href="/{foundUser.displayName}">
					@{foundUser.displayName}
				</a>
				<span class="mx-1.5" aria-hidden> • </span>
				<time class="text-xs text-rich-50" datetime={collection.createdAt.toISOString()}>
					{getFormatedDate(collection.createdAt)}
				</time>
			</div>
		</div>
		{#if isOwner}
			<div class="flex items-center gap-3">
				<a
					class="button button--raisin grid-center"
					href="{path}/edit"
					aria-label="Edit Collection"
					data-sveltekit-prefetch
				>
					Edit
				</a>
				<button class="button button--rose" aria-label="Delete Collection"> Delete </button>
			</div>
		{/if}
	</header>
	<main>
		<div class="grid gap-3 | leading-relaxed">
			{#if collection.shortDescription}
				<p class="text-lg text-rich-90">{collection.shortDescription}</p>
			{/if}
			{#if collection.longDescription}
				<p>{collection.longDescription}</p>
			{/if}
		</div>
	</main>
</div>

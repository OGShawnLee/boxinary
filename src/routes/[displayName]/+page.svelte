<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinition, CardExample } from "$lib/components";
	import { currentUser } from "@root/state";
	import { getFormatedDate, possessive } from "$lib/utils";

	export let data: PageData;

	const { definitions, examples, foundUser } = data;
	const isOwner = $currentUser?.displayName === foundUser.displayName;
</script>

<svelte:head>
	<title>{foundUser.name} (@{foundUser.displayName}) / Boxinary</title>
</svelte:head>

<main class="grid grid-cols-12 gap-9 items-start">
	<div class="col-span-4 grid gap-9">
		<header class="grid gap-3">
			<div class="flex items-center justify-between">
				<div class="grid">
					<h1 class="text-3xl text-white font-bold">{foundUser.name}</h1>
					<span class="font-medium"> @{foundUser.displayName} </span>
				</div>
				{#if isOwner}
					<a class="button button--raisin grid-center" href="/settings/profile"> Edit Profile </a>
				{/if}
			</div>
			<span class="text-sm text-rich-50">
				Joined {getFormatedDate(foundUser.createdAt)}
			</span>
		</header>
		<section class="grid gap-9">
			<h2 class="text-2xl text-white font-semibold">
				<a
					class="hover:(text-aqua-50 underline)"
					href="{foundUser.displayName}/dictionary/examples"
					title="View {isOwner ? 'your' : possessive(foundUser.displayName)} Examples"
					data-sveltekit-prefetch
				>
					Examples
				</a>
			</h2>
			<div class="grid gap-6">
				{#each examples as example}
					<CardExample isDedicated {...example} displayName={foundUser.displayName} />
				{/each}
			</div>
		</section>
	</div>
	<section class="col-span-8 | grid gap-9">
		<h2 class="text-2xl text-white font-semibold">Definitions</h2>
		<div class="grid gap-6">
			{#each definitions as definition (definition.id)}
				<CardDefinition {definition} />
			{/each}
		</div>
	</section>
</main>

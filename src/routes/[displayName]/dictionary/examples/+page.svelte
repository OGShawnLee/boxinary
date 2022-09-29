<script lang="ts">
	import type { PageData } from "./$types";
	import { CardExample, Header } from "$lib/components";
	import { page } from "$app/stores";
	import { currentUser } from "@root/state";
	import { possessive } from "$lib/utils";

	export let data: PageData;

	const { definitions, foundUser } = data;
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
		{#each definitions as { atomic, title, examples } (title)}
			<section class="py-6 | grid gap-3 | bg-raisin-12 rounded-md">
				<header class="px-6 | grid">
					<h2 class="text-xl text-rich-90 font-medium">
						<a
							class="hover:(text-aqua-50 underline)"
							href="/{foundUser.displayName}/dictionary/{title}"
							title="View {title} Details"
							data-sveltekit-prefetch
						>
							{title}
						</a>
					</h2>
					<span class="text-sm text-aqua-50"> {atomic} </span>
				</header>
				<div class="h-0.75 w-full | bg-raisin-20" aria-hidden />
				<div class="px-6 flex flex-wrap gap-6">
					{#each examples as example (example.id)}
						<CardExample
							isDedicated
							hasBackground={false}
							{...example}
							displayName={foundUser.displayName}
							redirectTo={path}
						/>
					{/each}
				</div>
			</section>
		{/each}
	</main>
</div>

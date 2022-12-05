<script lang="ts">
	import type { PageData } from "./$types";
	import { CardCollection, CardDefinition, CardDefinitionExamples, Header } from "$lib/components";
	import { currentUser } from "@root/state";
	import {
		getCollectionCreatePath,
		getFormatedDate,
		getUserExamplesPath,
		possessive
	} from "$lib/utils";

	export let data: PageData;

	const { collections, definitions, examples, foundUser } = data;
	const isOwner = $currentUser?.displayName === foundUser.displayName;
</script>

<svelte:head>
	<title>{foundUser.name} (@{foundUser.displayName}) / Boxinary</title>
</svelte:head>

<main class="grid lg:grid-cols-12 gap-9 items-start">
	<div class="lg:col-span-4 grid gap-9">
		<header class="grid gap-3">
			<div class="flex items-center justify-between">
				<div class="grid">
					<h1 class="text-3xl text-white font-bold">{foundUser.name}</h1>
					<span class="font-medium"> @{foundUser.displayName} </span>
				</div>
				{#if isOwner}
					<a
						class="button button--raisin | hidden xl:(grid place-content-center)"
						href="/settings/profile"
					>
						Edit Profile
					</a>
					<a
						class="min-h-10 min-w-10 w-10 | grid-center | border-2 border-raisin-20 rounded-full | xl:hidden"
						href="/settings/profile"
						aria-label="Edit your Profile"
						title="Edit your Profile"
					>
						<i class="bx bx-pen" />
					</a>
				{/if}
			</div>
			<span class="text-sm text-rich-50">
				Joined {getFormatedDate(foundUser.createdAt)}
			</span>
			{#if foundUser.description}
				<p class="leading-relaxed">{foundUser.description}</p>
			{/if}
		</header>
		<section class="grid gap-9">
			<Header class="flex items-center justify-between gap-3" as="h2" title="Examples">
				<a
					class="button button--raisin grid-center"
					href={getUserExamplesPath(foundUser.displayName)}
					title="View {isOwner ? 'your' : possessive(foundUser.displayName)} Examples"
					data-sveltekit-prefetch
					slot="right-side"
				>
					See All
				</a>
			</Header>
			<div class="grid gap-6">
				<CardDefinitionExamples displayName={foundUser.displayName} definitions={examples} />
			</div>
		</section>
	</div>
	<div class="grid gap-9 lg:col-span-8">
		<section class="grid gap-9">
			<Header class="flex items-center justify-between" as="h2" title="Collections">
				<svelte:fragment slot="right-side">
					{#if isOwner}
						<a
							class="button button--raisin grid-center"
							href={getCollectionCreatePath(foundUser.displayName)}>Create Collection</a
						>
					{/if}
				</svelte:fragment>
			</Header>
			<div class="grid gap-6">
				{#each collections as collection (collection.id)}
					<CardCollection user={foundUser} {collection} />
				{/each}
			</div>
		</section>
		<section class="grid gap-9">
			<Header as="h2" title="Definitions" />
			<div class="grid gap-6">
				{#each definitions as { id, name, definition } (id)}
					<CardDefinition displayName={foundUser.displayName} {name} {definition} />
				{/each}
			</div>
		</section>
	</div>
</main>

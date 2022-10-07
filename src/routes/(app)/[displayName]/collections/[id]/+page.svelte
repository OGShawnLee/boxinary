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

<main>
	<div class="relative | grid gap-3">
		<div class="min-h-10" aria-hidden />
		<div class="h-full | grid gap-6">
			<header class="grid">
				<h1 class="text-xl text-white md:text-2xl">{collection.name}</h1>
				<span class="text-xs">
					Created by:
					<a
						class="text-sm text-rich-90 hover:(text-aqua-50 underline)"
						href="/{foundUser.displayName}"
					>
						@{foundUser.displayName}
					</a>
				</span>
			</header>
			<div class="h-0.75 w-full | bg-raisin-20 rounded-xl" aria-hidden />
			<div class="mt-1.75 | grid gap-0.75 | leading-relaxed">
				<p class="text-rich-90 md:text-lg">{collection.shortDescription}</p>
				<p class="text-sm md:text-base">{collection.longDescription}</p>
			</div>
		</div>
		<div class="absolute top-0 inset-x-0 h-10 | flex items-center justify-between">
			<time class="h-full | grid-center | text-sm" datetime={collection.createdAt.toISOString()}>
				{getFormatedDate(collection.createdAt)}
			</time>
			{#if isOwner}
				<div class="flex items-center gap-9">
					<a
						class="px-2 text-sm text-white font-medium hover:(text-aqua-50 underline)"
						href="{path}/add"
						aria-label="Add Definitions to your Collection"
						data-sveltekit-prefetch
					>
						Add
					</a>
					<a
						class="text-sm hover:text-aqua-50"
						href="{path}/edit"
						aria-label="Edit Collection"
						data-sveltekit-prefetch
					>
						Edit
					</a>
					<form action="{path}/delete/?redirect-to=/home" method="post">
						<button class="text-sm text-rose-600/80 hover:text-rose-500" type="submit">
							Delete
						</button>
					</form>
				</div>
			{/if}
		</div>
	</div>
</main>

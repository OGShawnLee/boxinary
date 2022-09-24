<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	const { definition, user: currentUser } = data;

	const isOwner = currentUser?.displayName === definition.author.displayName;
</script>

<svelte:head>
	<title>{definition.title} / Boxinary</title>
</svelte:head>

<main class="grid gap-5">
	<header class="flex items-center justify-between">
		<div>
			<h1 class="text-4xl text-white font-bold">{definition.title}</h1>
			<span class="text-aqua-50"> {definition.atomic} </span>
		</div>
		{#if isOwner}
			<div class="flex items-center gap-6">
				<a
					class="min-h-10 px-6 | grid place-content-center | border-2 border-raisin-20 rounded-xl text-rich-90 font-medium"
					href="/{definition.author.displayName}/dictionary/{definition.title}/edit"
					data-sveltekit-prefetch
				>
					Update Definition
				</a>
				<form
					method="post"
					action="/{definition.author.displayName}/dictionary/{definition.title}/delete"
				>
					<button
						class="min-h-10 px-6 | border-2 border-rose-600/50 rounded-xl text-rich-90 font-medium"
					>
						Delete Definition
					</button>
				</form>
			</div>
		{/if}
	</header>
	<div class="grid gap-3">
		<p class="text-lg text-rich-90 leading-relaxed">{definition.description}</p>
		<p class="text leading-relaxed">{definition.definition}</p>
	</div>
</main>

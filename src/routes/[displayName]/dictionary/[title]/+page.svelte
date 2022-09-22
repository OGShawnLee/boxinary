<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	const { definition: def, user: currentUser } = data;

	$: isOwner = currentUser?.displayName === def.author.displayName;
</script>

<svelte:head>
	<title>{def.title} / Boxinary</title>
</svelte:head>

<main class="grid gap-5">
	<header class="flex items-center justify-between">
		<div>
			<h1 class="text-4xl text-white font-bold">{def.title}</h1>
			<span class="text-aqua-50"> {def.atomic} </span>
		</div>
		{#if isOwner}
			<div class="flex items-center gap-6">
				<a
					class="min-h-10 px-6 | grid place-content-center | border-2 border-raisin-20 rounded-xl text-rich-90 font-medium"
					href="/{def.author.displayName}/dictionary/{def.title}/edit"
					data-sveltekit-prefetch
				>
					Update Definition
				</a>
				<form method="post" action="/{def.author.displayName}/dictionary/{def.title}/delete">
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
		<p class="text-lg text-rich-90 leading-relaxed">{def.description}</p>
		<p class="text leading-relaxed">{def.definition}</p>
	</div>
</main>

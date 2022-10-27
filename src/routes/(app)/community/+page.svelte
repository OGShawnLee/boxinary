<script lang="ts">
	import type { PageData } from "./$types";
	import { CardUser } from "$lib/components";

	export let data: PageData;

	const { foundUsers } = data;
</script>

<svelte:head>
	<title>Community / Boxinary</title>
</svelte:head>

<h1 class="sr-only">Community</h1>

<main>
	<section class="grid gap-9">
		<h2 class="text-2xl text-white font-bold">Latest Users</h2>
		<div class="grid gap-6 | md:grid-cols-2 xl:grid-cols-3">
			{#each foundUsers as user (user.displayName)}
				<CardUser {...user} />
			{/each}
		</div>
	</section>
</main>

<script lang="ts" context="module">
	function asc(a: number | string, b: number | string) {
		if (a > b) return -1;
		if (a < b) return 1;
		return 0;
	}

	function desc(a: number | string, b: number | string) {
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	}
</script>

<script lang="ts">
	import type { PageData } from "./$types";
	import { Header, InputGroup } from "$lib/components";
	import { getDefinitionPath, possessive } from "$lib/utils";
	import { flip } from "svelte/animate";
	import { quadOut } from "svelte/easing";

	export let data: PageData;

	const { definitions, foundUser } = data;

	let filtered = definitions;
	let order: "asc" | "default" | "desc" = "default";
	let value = "";

	function orderAsc(list = filtered) {
		filtered = list.sort((a, b) => asc(a.name, b.name));
	}

	function orderDesc(list = filtered) {
		filtered = list.sort((a, b) => desc(a.name, b.name));
	}

	function handleAscending() {
		order = "asc";
		orderAsc();
	}

	function handleDescending() {
		order = "desc";
		orderDesc();
	}

	$: if (value) {
		const list = definitions.filter(({ name }) =>
			name.toLowerCase().startsWith(value.toLowerCase())
		);
		if (order === "default") filtered = list;
		order === "asc" ? orderAsc(list) : orderDesc(list);
	} else {
		if (order === "default") filtered = definitions;
		else order === "asc" ? orderAsc(definitions) : orderDesc(definitions);
	}
</script>

<svelte:head>
	<title>{possessive(foundUser.displayName)} Definitions / Boxinary</title>
</svelte:head>

<div class="grid gap-12">
	<Header>
		<b class="bold"> {possessive(foundUser.displayName)} </b>
		<b class="medium"> definitions </b>
	</Header>
	<main class="grid gap-9">
		<section class="grid gap-6">
			<h2 class="sr-only">Filtering & Ordering</h2>
			<div class="flex items-end gap-3">
				<form class="w-full" on:submit|preventDefault>
					<InputGroup id="name" icon="bx bx-search" bind:value />
				</form>
				<button
					class="button {order === 'desc' ? 'button--aqua' : 'button--raisin'} | h-12 min-w-28"
					on:click={handleDescending}
				>
					A to Z
				</button>
				<button
					class="button {order === 'asc' ? 'button--aqua' : 'button--raisin'} | h-12 min-w-28"
					on:click={handleAscending}
				>
					Z to A
				</button>
			</div>
		</section>
		<div class="grid gap-6 xl:grid-cols-3">
			{#each filtered as { id, definition, name } (id)}
				<article animate:flip={{ duration: 500, easing: quadOut }}>
					<h2 class="text-lg text-rich-90 font-poppins font-medium">
						<a
							class="hover:text-aqua-50"
							href={getDefinitionPath(foundUser.displayName, name)}
							data-svelkite-preload-data
						>
							{name}
						</a>
					</h2>
					<p class="text-sm">{definition}</p>
				</article>
			{/each}
		</div>
	</main>
</div>

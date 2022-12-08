<script lang="ts">
	import type { PageData } from "./$types";
	import { CardDefinition, InputGroup } from "$lib/components";
	import { fetchDefinitionsByName } from "$lib/client";
	import { plural } from "$lib/utils";
	import { isNullish, isWhitespace } from "@boxinary/predicate-core";
	import { slide } from "svelte/transition";

	export let data: PageData;

	let { name, results } = data;

	async function handleSubmit(this: HTMLFormElement) {
		const data = new FormData(this);
		const title = data.get("name");
		if (typeof title !== "string" || isWhitespace(title)) return;

		const [definitions, error] = await fetchDefinitionsByName(title);
		if (error || isNullish(definitions)) return console.log(error); // todo: handle error
		name = title;
		results = definitions;
	}
</script>

<svelte:head>
	<title>
		{name ? `Showing results for '${name}' / Boxinary` : "Search / Boxinary"}
	</title>
</svelte:head>

<h1 class="sr-only">{name ? `Showing results for ${name}` : "Search"}</h1>

<div class="grid gap-12">
	<div class="grid gap-9">
		<form class="flex items-end gap-3" on:submit|preventDefault={handleSubmit}>
			<InputGroup
				id="name"
				label="Search Definitions"
				icon="bx bx-search"
				value={name}
				placeholder={name}
			/>
			<button class="button button--aqua | h-12 | hidden md:block" type="submit"> Search </button>
		</form>
		<main class="grid gap-3">
			{#if name}
				<h2>
					Showing <b class="text-rich-90"> {results.length} </b>
					{plural("result", results.length)} for "<b class="text-rich-90">{name}</b>"
				</h2>
			{/if}
			<div class="grid gap-6">
				{#each results as { id, definition, name, user: { displayName } } (id)}
					<div in:slide|local>
						<CardDefinition {displayName} {definition} {name} />
					</div>
				{/each}
			</div>
		</main>
	</div>
</div>

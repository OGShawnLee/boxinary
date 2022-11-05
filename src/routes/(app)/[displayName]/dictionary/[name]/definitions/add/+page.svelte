<script lang="ts">
	import type { PageData } from "./$types";
	import { Header, InputGroup } from "$lib/components";

	export let data: PageData;
	export let form: ValidationForm<"example" | "definition">;

	// Might change Definition schema name
	const { definition: word } = data;
</script>

<svelte:head>
	<title>Creating a definition for {word.name}</title>
</svelte:head>

<main class="grid gap-12">
	<Header text={word.definition}>
		Creating a <b class="bold">definition</b>
		for <b class="bold"> {word.name} </b>
	</Header>
	<form class="grid gap-9" method="post">
		<div class="grid gap-6">
			<InputGroup id="definition" charLimit={180} error={form?.definition} />
			<InputGroup id="example" charLimit={80} error={form?.example} />
		</div>
		<button class="button button--aqua | h-12">
			<span class="lg:hidden">Submit</span>
			<span class="hidden lg:block">
				Add <b class="bold-poppins"> definition </b>
				to <b class="bold-poppins"> {word.name} </b>
			</span>
		</button>
	</form>
</main>

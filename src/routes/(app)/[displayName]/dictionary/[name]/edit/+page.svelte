<script lang="ts">
	import type { PageData } from "./$types";
	import { InputGroup } from "$lib/components";

	export let data: PageData;
	export let form: ValidationForm<"name" | "definition" | "description" | "summary">;

	const { definition: def } = data;
</script>

<svelte:head>
	<title>Editing {def.name} / Boxinary</title>
</svelte:head>

<h1 class="sr-only">Editing {def.name}</h1>

<main>
	<form class="grid gap-9" method="post">
		<div class="grid gap-6">
			<InputGroup id="name" charLimit={50} value={def.name} error={form?.name} />
			<InputGroup
				id="definition"
				charLimit={80}
				value={def.definition}
				error={form?.definition}
				let:textarea
				let:bind
			>
				<textarea {...textarea} use:bind>{def.definition}</textarea>
			</InputGroup>
			<InputGroup
				id="description"
				charLimit={300}
				value={def.description}
				error={form?.description}
				let:textarea
				let:bind
			>
				<textarea {...textarea} use:bind>{def.description}</textarea>
			</InputGroup>
			<InputGroup
				id="summary"
				charLimit={560}
				value={def.summary}
				error={form?.summary}
				let:textarea
				let:bind
			>
				<textarea {...textarea} use:bind>{def.summary}</textarea>
			</InputGroup>
		</div>
		<button class="button button--aqua" type="submit"> Submit </button>
	</form>
</main>

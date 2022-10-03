<script lang="ts">
	import type { PageData } from "./$types";
	import { InputGroup } from "$lib/components";

	export let data: PageData;
	export let form: ValidationForm<"title" | "atomic" | "description" | "definition">;

	const { definition: def } = data;
</script>

<svelte:head>
	<title>Editing {def.title} / Boxinary</title>
</svelte:head>

<h1 class="sr-only">Editing {def.title}</h1>

<main>
	<form class="grid gap-9" method="post">
		<div class="grid gap-6">
			<InputGroup id="title" charLimit={50} value={def.title} error={form?.title} />
			<InputGroup
				id="atomic-definition"
				charLimit={80}
				value={def.atomic}
				error={form?.atomic}
				let:textarea
				let:bind
			>
				<textarea {...textarea} use:bind>{def.atomic}</textarea>
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
				id="definition"
				charLimit={560}
				value={def.definition}
				error={form?.definition}
				let:textarea
				let:bind
			>
				<textarea {...textarea} use:bind>{def.definition}</textarea>
			</InputGroup>
		</div>
		<button class="button button--aqua" type="submit"> Submit </button>
	</form>
</main>

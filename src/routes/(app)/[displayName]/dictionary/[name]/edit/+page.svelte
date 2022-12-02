<script lang="ts">
	import type { PageData } from "./$types";
	import { Header, InputGroup } from "$lib/components";

	export let data: PageData;
	export let form: ValidationForm<"name" | "definition" | "description" | "summary" | "source">;

	const { definition } = data;
</script>

<svelte:head>
	<title>Editing {definition.name} / Boxinary</title>
</svelte:head>

<div class="grid gap-12">
	<Header text={definition.definition}>
		Editing <b class="bold">{definition.name}</b>
	</Header>
	<main>
		<form class="grid gap-9" method="post">
			<div class="grid gap-6">
				<InputGroup id="name" charLimit={50} value={definition.name} error={form?.name} />
				<InputGroup
					id="definition"
					charLimit={80}
					value={definition.definition}
					error={form?.definition}
					let:textarea
					let:bind
				>
					<textarea {...textarea} use:bind>{definition.definition}</textarea>
				</InputGroup>
				<InputGroup
					id="description"
					charLimit={300}
					value={definition.description}
					error={form?.description}
					let:textarea
					let:bind
				>
					<textarea {...textarea} use:bind>{definition.description}</textarea>
				</InputGroup>
				<InputGroup
					id="summary"
					charLimit={560}
					value={definition.summary}
					error={form?.summary}
					let:textarea
					let:bind
				>
					<textarea {...textarea} use:bind>{definition.summary}</textarea>
				</InputGroup>
				<InputGroup id="source" charLimit={40} value={definition.source} error={form?.source} />
			</div>
			<button class="button button--aqua" type="submit">
				Update <b class="bold-poppins"> definition </b>
			</button>
		</form>
	</main>
</div>

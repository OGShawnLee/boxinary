<script lang="ts">
	import type { PageData } from "./$types";
	import { Header, InputGroup } from "$lib/components";
	import { isString } from "malachite-ui/predicate";

	export let data: PageData;
	export let form: ValidationForm<"text" | "source">;

	const { example, definition } = data;
</script>

<svelte:head>
	<title>Editing {definition.name} Example / Boxinary</title>
</svelte:head>

<div class="grid gap-9">
	<Header text={definition.definition}>
		Editing an <b class="medium">example</b>
		of <b class="bold">{definition.name}</b>
	</Header>
	<main>
		<form class="grid gap-9" method="post">
			<div class="grid gap-6">
				<InputGroup
					id="example"
					charLimit={240}
					value={example.text}
					error={form?.text}
					let:textarea
					let:bind
				>
					<textarea {...textarea} use:bind
						>{isString(form?.text) ? form?.text : example.text}</textarea
					>
				</InputGroup>
				<InputGroup id="source" charLimit={60} value={example.source} error={form?.source} />
			</div>
			<button class="button button--aqua | py-2" type="submit">
				Update <b class="bold-poppins"> example </b>
			</button>
		</form>
	</main>
</div>

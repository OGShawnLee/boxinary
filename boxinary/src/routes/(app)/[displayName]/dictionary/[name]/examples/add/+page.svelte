<script lang="ts">
	import type { PageData } from "./$types";
	import { Header, InputGroup } from "$lib/components";
	import { isString } from "@boxinary/predicate-core";

	export let data: PageData;
	export let form: ValidationForm<"text" | "source">;

	const { definition } = data;
</script>

<svelte:head>
	<title>Creating example for {definition.name} / Boxinary</title>
</svelte:head>

<div class="grid gap-12">
	<Header text={definition.definition}>
		Creating an <b class="medium"> example </b>
		for <b class="bold"> {definition.name} </b>
	</Header>
	<main>
		<form class="grid gap-9" method="post">
			<div class="grid gap-6">
				<InputGroup id="example" charLimit={240} error={form?.text} let:textarea let:bind>
					<textarea {...textarea} use:bind>{isString(form?.text) ? form?.text : ""}</textarea>
				</InputGroup>
				<InputGroup id="source" charLimit={60} error={form?.source} />
			</div>
			<button class="button button--aqua | py-2" type="submit">
				Create <b class="bold-poppins"> example </b>
			</button>
		</form>
	</main>
</div>

<script lang="ts">
	import type { PageData } from "./$types";
	import { InputGroup } from "$lib/components";
	import { isString } from "malachite-ui/predicate";

	export let data: PageData;
	export let form: ValidationForm<"text" | "source">;

	const { definition } = data;
</script>

<svelte:head>
	<title>New {definition.name} Example / Boxinary</title>
</svelte:head>

<div class="grid gap-9">
	<header class="grid">
		<h1 class="text-lg text-rich-90">
			Creating <strong class="text-white"> {definition.name} </strong> Example
		</h1>
		<span class="text-xs text-aqua-50"> {definition.definition} </span>
	</header>
	<main>
		<form class="grid gap-9" method="post">
			<div class="grid gap-6">
				<InputGroup id="example" charLimit={240} error={form?.text} let:textarea let:bind>
					<textarea {...textarea} use:bind>{isString(form?.text) ? form?.text : ""}</textarea>
				</InputGroup>
				<InputGroup id="source" charLimit={60} error={form?.source} />
			</div>
			<button class="button button--aqua | py-2" type="submit"> Submit </button>
		</form>
	</main>
</div>

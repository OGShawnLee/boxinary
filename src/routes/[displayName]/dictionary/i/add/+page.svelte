<script lang="ts">
	import { InputGroup } from "$lib/components";

	export let form: ValidationForm<"title" | "atomic" | "description" | "definition">;
</script>

<svelte:head>
	<title>Creating a new Definition / Boxinary</title>
</svelte:head>

<h1 class="sr-only">Creating a new Definition</h1>

<main>
	<form class="grid gap-9" method="post">
		<div class="grid gap-6">
			<InputGroup id="title" charLimit={50} error={form?.title} />
			<InputGroup id="atomic-definition" charLimit={80} error={form?.atomic} let:input let:bind>
				<textarea {...input} use:bind />
			</InputGroup>
			<InputGroup id="description" charLimit={300} error={form?.description} let:input let:bind>
				<textarea {...input} use:bind />
			</InputGroup>
			<InputGroup id="definition" charLimit={560} error={form?.definition} let:input let:bind>
				<textarea {...input} use:bind />
			</InputGroup>
		</div>
		<button
			class="min-h-10 px-6 | grid place-content-center | border-2 border-aqua-50 rounded-xl font-bold text-white"
			type="submit"
		>
			Submit
		</button>
	</form>
</main>

<script lang="ts">
	import { Header, InputGroup } from "$lib/components";

	export let form: ValidationForm<"name" | "definition" | "description" | "summary" | "source">;
</script>

<svelte:head>
	<title>Creating Definition / Boxinary</title>
</svelte:head>

<div class="grid gap-12">
	<Header>
		Creating <b class="bold">definition</b>
	</Header>
	<main>
		<form class="grid gap-9" method="post">
			<div class="grid gap-6">
				<InputGroup id="name" charLimit={50} error={form?.name} />
				<InputGroup id="definition" charLimit={80} error={form?.definition} let:input let:bind>
					<textarea {...input} use:bind />
				</InputGroup>
				<InputGroup id="description" charLimit={300} error={form?.description} let:input let:bind>
					<textarea {...input} use:bind />
				</InputGroup>
				<InputGroup id="summary" charLimit={560} error={form?.summary} let:input let:bind>
					<textarea {...input} use:bind />
				</InputGroup>
				<InputGroup id="source" charLimit={40} error={form?.source} />
			</div>
			<button class="button button--aqua" type="submit">
				Create <b class="bold-poppins">definition</b>
			</button>
		</form>
	</main>
</div>

<script lang="ts">
	import { InputGroup } from "$lib/components";

	export let form: ValidationForm<"email" | "password">;
</script>

<svelte:head>
	<title>Boxinary / Sign In</title>
</svelte:head>

<h1 class="sr-only">Sign In</h1>

<main>
	<form class="grid gap-9" method="post">
		<div class="grid gap-6">
			<InputGroup id="email" charLimit={254} error={form?.email} let:input let:bind>
				<input type="email" {...input} use:bind />
			</InputGroup>
			<InputGroup id="password" charLimit={60} error={form?.password} let:input let:bind>
				<input type="password" {...input} use:bind />
			</InputGroup>
		</div>
		<button class="button button--aqua" type="submit"> Sign In </button>
	</form>
</main>

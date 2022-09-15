<script lang="ts">
	import { InputGroup } from "$lib/components";

	export let form: ValidationForm<"name" | "displayName" | "email" | "password">;
</script>

<svelte:head>
	<title>Boxinary / Sign Up</title>
</svelte:head>

<h1 class="sr-only">Sign Up</h1>

<main>
	<form method="post">
		<div class="grid gap-6">
			<InputGroup id="name" charLimit={50} error={form?.name} />
			<InputGroup id="display-name" label="Display Name" charLimit={16} error={form?.displayName} />
			<InputGroup id="email" charLimit={254} error={form?.email} let:input>
				<input type="email" {...input} />
			</InputGroup>
			<InputGroup id="password" charLimit={60} error={form?.password} let:input>
				<input type="password" {...input} />
			</InputGroup>
		</div>
		<button type="submit"> Submit </button>
	</form>
</main>

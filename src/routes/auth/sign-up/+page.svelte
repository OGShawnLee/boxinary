<script lang="ts">
	import { InputGroup } from "$lib/components";

	export let form: ValidationForm<"name" | "displayName" | "email" | "password">;
</script>

<svelte:head>
	<title>Boxinary / Sign Up</title>
</svelte:head>

<h1 class="sr-only">Sign Up</h1>

<main>
	<form class="grid gap-9" method="post">
		<div class="grid gap-6">
			<InputGroup id="name" charLimit={50} error={form?.name} />
			<InputGroup id="display-name" label="Display Name" charLimit={16} error={form?.displayName} />
			<InputGroup id="email" charLimit={254} error={form?.email} let:input let:bind>
				<input type="email" {...input} use:bind />
			</InputGroup>
			<InputGroup id="password" charLimit={60} error={form?.password} let:input let:bind>
				<input type="password" {...input} use:bind />
			</InputGroup>
		</div>
		<button
			class="min-h-10 px-6 | grid place-content-center | border-2 border-aqua-50 rounded-xl font-bold text-white"
			type="submit"
		>
			Sign Up
		</button>
	</form>
</main>

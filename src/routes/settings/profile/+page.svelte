<script lang="ts">
	import type { PageData } from "./$types";
	import { InputGroup } from "$lib/components";

	export let form: ValidationForm<"name" | "displayName">;
	export let data: PageData;
</script>

<svelte:head>
	<title>Boxinary / Edit Profile</title>
</svelte:head>

<h1 class="sr-only">Edit Profile</h1>

<main>
	<form class="grid gap-9" method="post">
		<div class="grid gap-6">
			<InputGroup id="name" charLimit={50} error={form?.name} value={data.user.name} />
			<InputGroup
				id="display-name"
				label="Display Name"
				charLimit={16}
				error={form?.displayName}
				value={data.user.displayName}
			/>
		</div>
		<button class="button button--aqua" type="submit"> Update Profile </button>
	</form>
</main>

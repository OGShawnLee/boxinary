<script lang="ts">
	import type { PageData } from "./$types";
	import { Header, InputGroup } from "$lib/components";

	export let form: ValidationForm<"name" | "displayName">;
	export let data: PageData;
</script>

<svelte:head>
	<title>Editing Profile / Boxinary</title>
</svelte:head>

<div class="grid gap-12">
	<Header>
		<span class="text-white"> Editing Profile </span>
	</Header>
	<main>
		<form class="grid gap-9" method="post">
			<div class="grid gap-6">
				<InputGroup id="name" charLimit={50} error={form?.name} value={data.user.name} />
				<InputGroup
					id="display-name"
					label="username"
					charLimit={16}
					error={form?.displayName}
					value={data.user.displayName}
				/>
			</div>
			<button class="button button--aqua" type="submit"> Update Profile </button>
		</form>
	</main>
</div>

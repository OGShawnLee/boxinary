<script lang="ts">
	import type { PageData } from "./$types";
	import { Header, InputGroup } from "$lib/components";

	export let form: ValidationForm<"name" | "displayName" | "description">;
	export let data: PageData;

	const { user } = data;
</script>

<svelte:head>
	<title>Editing Profile / Boxinary</title>
</svelte:head>

<div class="grid gap-7.5">
	<Header as="h2">Editing Profile</Header>
	<main>
		<form class="grid gap-9" method="post">
			<div class="grid gap-6">
				<InputGroup id="name" charLimit={50} error={form?.name} value={user.name} />
				<InputGroup
					id="display-name"
					label="username"
					charLimit={16}
					error={form?.displayName}
					value={user.displayName}
				/>
				<InputGroup
					id="description"
					charLimit={300}
					error={form?.description}
					value={user.description}
					let:textarea
					let:bind
				>
					<textarea {...textarea} use:bind>{user.description || ""}</textarea>
				</InputGroup>
			</div>
			<button class="button button--aqua" type="submit">
				Update <b class="bold-poppins">profile</b>
			</button>
		</form>
	</main>
</div>

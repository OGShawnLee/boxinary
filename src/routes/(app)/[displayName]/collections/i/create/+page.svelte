<script lang="ts">
	import { Header, InputGroup } from "$lib/components";

	export let form: ValidationForm<"name" | "description" | "details">;
</script>

<svelte:head>
	<title>Creating a new Collection / Boxinary</title>
</svelte:head>

<div class="grid gap-12">
	<Header>
		Creating a new <b class="text-white">Collection</b>
	</Header>
	<main>
		<form class="grid gap-9" method="post">
			<div class="grid gap-4.5">
				<InputGroup id="name" charLimit={80} error={form?.name} />
				<InputGroup
					id="description"
					charLimit={120}
					error={form?.description}
					let:textarea
					let:bind
				>
					<textarea {...textarea} use:bind />
				</InputGroup>
				<InputGroup id="details" charLimit={460} error={form?.details} let:textarea let:bind>
					<textarea {...textarea} use:bind />
				</InputGroup>
			</div>
			<button class="button button--aqua" type="submit"> Create Collection </button>
		</form>
	</main>
</div>

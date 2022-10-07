<script lang="ts">
	import type { PageData } from "./$types";
	import { Header, InputGroup } from "$lib/components";
	import { isString } from "malachite-ui/predicate";

	export let data: PageData;
	export let form: ValidationForm<"name" | "description" | "details">;

	const { collection } = data;
</script>

<svelte:head>
	<title>Editing {collection.name} / Boxinary</title>
</svelte:head>

<div class="grid gap-12">
	<Header subtitle={collection.description}>
		Editing <b class="text-white">{collection.name}</b>
	</Header>
	<main>
		<form class="grid gap-9" method="post">
			<div class="grid gap-4.5">
				<InputGroup id="name" value={collection.name} charLimit={80} error={form?.name} />
				<InputGroup
					id="description"
					value={collection.description}
					charLimit={120}
					error={form?.description}
					let:textarea
					let:bind
				>
					<textarea {...textarea} use:bind
						>{isString(collection.description) ? collection.description : ""}</textarea
					>
				</InputGroup>
				<InputGroup
					id="details"
					value={collection.details}
					charLimit={460}
					error={form?.details}
					let:textarea
					let:bind
				>
					<textarea {...textarea} use:bind
						>{isString(collection.details) ? collection.details : ""}</textarea
					>
				</InputGroup>
			</div>
			<button class="button button--aqua" type="submit"> Update Collection </button>
		</form>
	</main>
</div>

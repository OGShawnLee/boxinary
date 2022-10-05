<script lang="ts">
	import type { PageData } from "./$types";
	import { Header, InputGroup } from "$lib/components";
	import { isString } from "malachite-ui/predicate";

	export let data: PageData;
	export let form: ValidationForm<"name" | "shortDescription" | "longDescription">;

	const { collection } = data;
</script>

<svelte:head>
	<title>Editing {collection.name} / Boxinary</title>
</svelte:head>

<div class="grid gap-12">
	<Header subtitle={collection.shortDescription}>
		Editing <b class="text-white">{collection.name}</b>
	</Header>
	<main>
		<form class="grid gap-9" method="post">
			<div class="grid gap-4.5">
				<InputGroup id="name" value={collection.name} charLimit={80} error={form?.name} />
				<InputGroup
					id="short-description"
					value={collection.shortDescription}
					charLimit={120}
					error={form?.shortDescription}
					let:textarea
					let:bind
				>
					<textarea {...textarea} use:bind
						>{isString(collection.shortDescription) ? collection.shortDescription : ""}</textarea
					>
				</InputGroup>
				<InputGroup
					id="long-description"
					value={collection.longDescription}
					charLimit={460}
					error={form?.longDescription}
					let:textarea
					let:bind
				>
					<textarea {...textarea} use:bind
						>{isString(collection.longDescription) ? collection.longDescription : ""}</textarea
					>
				</InputGroup>
			</div>
			<button class="button button--aqua" type="submit"> Update Collection </button>
		</form>
	</main>
</div>

<script lang="ts">
	import { Options } from ".";

	export let title: string;
</script>

<svelte:head>
	<title>{title} - Boxinary UI</title>
</svelte:head>

<main class="grid gap-12">
	<div class="grid gap-6">
		<h1 class="text-2xl text-white font-semibold">{title}</h1>
		<Options>
			<slot name="options" />
		</Options>
	</div>
	<slot />
</main>

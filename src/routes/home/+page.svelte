<script lang="ts">
	import type { ClientUser } from "@root/app";

	export let data: ClientUser;
</script>

<svelte:head>
	<title>Boxinary / Home</title>
</svelte:head>

<h1 class="sr-only">Home</h1>

<main>Hello, {data.name}!</main>

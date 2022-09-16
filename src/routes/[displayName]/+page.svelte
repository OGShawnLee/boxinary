<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.foundUser.name} (@{data.foundUser.displayName}) / Boxinary</title>
</svelte:head>

<header class="grid">
	<h1 class="text-lg text-white font-bold">{data.foundUser.name}</h1>
	<span class="font-medium"> @{data.foundUser.displayName} </span>
</header>

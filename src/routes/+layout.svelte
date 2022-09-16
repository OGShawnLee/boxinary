<script lang="ts">
	import "virtual:windi.css";
	import type { LayoutData } from "./$types";
	import { NavBar } from "$lib/layout";

	export let data: LayoutData;
</script>

<svelte:head>
	<title>Boxinary</title>
</svelte:head>

<NavBar currentUser={data.user} />

<div class="w-full max-w-6xl mx-auto my-12 | <lg:(px-4 mt-32)">
	<slot />
</div>

<script lang="ts">
	import type { Definition } from "@prisma/client";

	export let data: { definition: Definition };
	const def = data.definition;
</script>

<svelte:head>
	<title>{def.title} / Boxinary</title>
</svelte:head>

<main class="grid gap-5">
	<header>
		<div>
			<h1 class="text-4xl text-white font-bold">{def.title}</h1>
			<span class="text-aqua-50"> {def.atomic} </span>
		</div>
	</header>
	<div class="grid gap-3">
		<p class="text-lg text-rich-90 leading-relaxed">{def.description}</p>
		<p class="text leading-relaxed">{def.definition}</p>
	</div>
</main>

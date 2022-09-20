<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.foundUser.name} (@{data.foundUser.displayName}) / Boxinary</title>
</svelte:head>

<header class="flex items-center gap-9">
	<div class="grid">
		<h1 class="text-lg text-white font-bold">{data.foundUser.name}</h1>
		<span class="font-medium"> @{data.foundUser.displayName} </span>
	</div>
	{#if data.isCurrentUser}
		<a
			class="min-h-10 px-6 | grid place-content-center | border-2 border-raisin-20 rounded-xl text-rich-90 font-medium"
			href="/settings/profile"
		>
			Edit Profile
		</a>
	{/if}
</header>

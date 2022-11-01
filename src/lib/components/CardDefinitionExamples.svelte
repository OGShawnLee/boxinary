<script lang="ts">
	import type { User } from "@prisma/client";
	import { CardExample } from "$lib/components";
	import { page } from "$app/stores";
	import { getDefinitionPath, groupExamplesByDefinition } from "$lib/utils";

	export let displayName: User["displayName"];
	export let definitions: ReturnType<typeof groupExamplesByDefinition>;
	export let headingLevel: "h2" | "h3" = "h2";

	const path = $page.url.pathname;
</script>

{#each definitions as { definition, name, examples } (name)}
	<section class="py-6 | grid gap-3 | bg-raisin-12 rounded-md">
		<header class="px-6 | grid">
			<svelte:element this={headingLevel} class="m-0 | text-xl text-rich-90 font-medium">
				<a
					class="hover:(text-aqua-50 underline)"
					href={getDefinitionPath(displayName, name)}
					title="View {name} Details"
					data-sveltekit-prefetch
				>
					{name}
				</a>
			</svelte:element>
			<span class="text-sm text-aqua-50"> {definition} </span>
		</header>
		<div class="h-0.75 w-full | bg-raisin-20" aria-hidden />
		<div class="px-6 flex flex-wrap gap-6">
			{#each examples as example (example.id)}
				<CardExample
					isDedicated
					hasBackground={false}
					{...example}
					{displayName}
					redirect={path}
					headingLevel={headingLevel === "h2" ? "h3" : "h4"}
				/>
			{/each}
		</div>
	</section>
{/each}

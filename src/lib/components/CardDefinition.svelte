<script lang="ts">
	import { currentUser } from "@root/state";

	export let definition: AtomicDefinition;

	$: isOwner = $currentUser?.displayName === definition.author.displayName;
</script>

<article class="px-6 py-3 | flex items-end justify-between gap-3 | bg-raisin-12 rounded-md">
	<div>
		<header>
			<h2 class="text-xl text-white font-medium">
				<a
					class="hover:text-aqua-50"
					href="/{definition.author.displayName}/dictionary/{definition.title}"
					data-sveltekit-prefetch
				>
					{definition.title}
				</a>
			</h2>
		</header>
		<span> {definition.atomic} </span>
	</div>
	{#if isOwner}
		<div>
			<a
				class="min-h-10 px-6 | grid place-content-center | border-2 border-raisin-20 rounded-xl text-rich-90 font-medium"
				href="/{definition.author.displayName}/dictionary/{definition.title}/edit"
				data-sveltekit-prefetch
			>
				Edit
			</a>
		</div>
	{/if}
</article>

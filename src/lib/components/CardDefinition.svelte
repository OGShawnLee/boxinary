<script lang="ts">
	export let definition: AtomicDefinition;
</script>

<article class="px-6 py-3 | flex items-end gap-3 | bg-raisin-12 rounded-md">
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
</article>

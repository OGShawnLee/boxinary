<script lang="ts">
	import { formatUserJoinDate, getProfilePath } from "$lib/utils";

	export let name: string;
	export let displayName: string;
	export let createdAt: Date;
</script>

<article class="px-6 py-3 | bg-raisin-12 rounded-md">
	<header>
		<h2 class="text-lg text-white font-medium">
			<a class="hover:text-aqua-50" href={getProfilePath(displayName)} data-sveltekit-prefetch>
				{name}
			</a>
		</h2>
		<div class="flex items-end justify-between gap-6">
			<span class="text-sm">@{displayName}</span>
			<span class="text-xs text-rich-50">{formatUserJoinDate(createdAt)}</span>
		</div>
	</header>
</article>

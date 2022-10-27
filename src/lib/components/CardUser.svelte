<script lang="ts">
	import { getFormatedDate, getProfilePath } from "$lib/utils";

	export let name: string;
	export let displayName: string;
	export let createdAt: Date;
</script>

<article class="px-6 py-3 | bg-raisin-12 rounded-md">
	<header>
		<h2 class="text-lg text-rich-90 font-medium">{name}</h2>
		<div class="flex items-end justify-between">
			<a
				class="max-w-fit | text-sm hover:(text-aqua-50 underline)"
				href={getProfilePath(displayName)}
				data-sveltekit-prerender
			>
				@{displayName}
			</a>
			<span class="text-xs text-rich-50">
				Joined {getFormatedDate(createdAt)}
			</span>
		</div>
	</header>
</article>

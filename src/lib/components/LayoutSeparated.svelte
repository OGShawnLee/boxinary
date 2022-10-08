<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { FloatingOptions } from "$lib/components";
	import { getProfilePath } from "$lib/utils";

	export let isOwner: boolean;
	export let title: string;
	export let displayName: string;
	export let definition: Nullable<string> = null;
	export let createdAt: Date;
	export let pathing: { add?: FloatingOption; edit: FloatingOption; $delete: FloatingOption };
</script>

<div class="grid gap-6">
	<div class="relative | grid">
		<div class="min-h-10" aria-hidden />
		<header class="grid">
			<div class:grid={definition}>
				<h1 class="text-3xl text-white font-bold md:text-2xl">{title}</h1>
				{#if definition}
					<span class="text-aqua-50"> {definition} </span>
				{/if}
			</div>
			<span class="text-xs">
				Created by:
				<a
					class="text-sm text-rich-90 hover:(text-aqua-50 underline)"
					href={getProfilePath(displayName)}
				>
					@{displayName}
				</a>
			</span>
			<FloatingOptions {isOwner} {createdAt} {pathing} />
		</header>
	</div>
	<div class="h-0.75 w-full | bg-raisin-20 rounded-xl" aria-hidden />
	<slot />
</div>

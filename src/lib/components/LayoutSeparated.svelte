<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { FloatingOptions } from "$lib/components";
	import { getProfilePath } from "$lib/utils";
	import { clearString } from "malachite-ui/utils";

	let className: string = "";

	export { className as class };
	export let isOwner: boolean;
	export let title: string;
	export let displayName: string;
	export let definition: Nullable<string> = null;
	export let createdAt: Date;
	export let pathing: FloatingOptionsPathing;
	export let isBigTitle = false;

	$: finalClassName = clearString(`grid gap-6 ${className}`);
</script>

<div class={finalClassName}>
	<div class="relative | grid">
		<div class="min-h-10" aria-hidden />
		<header class="grid">
			<div class:grid={definition}>
				<h1
					class="{isBigTitle
						? 'text-3xl md:text-4xl'
						: 'text-2xl md:text-3xl'} text-white font-bold"
				>
					{title}
				</h1>
				{#if definition}
					<span class="text-aqua-50"> {definition} </span>
				{/if}
			</div>
			<span class="text-xs" class:mt-1.75={definition}>
				Created by
				<a
					class="text-rich-90 font-semibold hover:(text-aqua-50 underline)"
					href={getProfilePath(displayName)}
				>
					@{displayName}
				</a>
			</span>
			<FloatingOptions {isOwner} {createdAt} {pathing} />
		</header>
	</div>
	<slot />
</div>

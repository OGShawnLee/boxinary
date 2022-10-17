<script lang="ts">
	import { Checkbox } from "$lib/components";
	import type { GameDefinition } from "@root/app";

	export let isCurrentQuestion: boolean;
	export let definition: Pick<
		GameDefinition,
		"definition" | "description" | "name" | "options" | "summary"
	>;
</script>

{#if isCurrentQuestion}
	<article class="grid items-start gap-12 | lg:(grid-cols-2)">
		<!-- Question -->
		<div class="py-8 | grid gap-7.5 | bg-raisin-12 rounded-xl">
			<span class="px-8">
				<strong class="text-2xl md:text-3xl text-white font-bold"> {definition.name} </strong>
				<span class="tex-lg"> means: </span>
			</span>
			<div class="h-0.75 w-full | bg-raisin-20" aria-hidden />
			<div class="px-8 grid gap-4.5">
				{#each definition.options as option}
					<div class="flex items-start gap-1.5">
						<form on:submit|preventDefault>
							<Checkbox
								class="h-3.75 min-w-3.75 w-3.5 mt-2 | grid place-content-center rounded-full bg-white"
								type="submit"
								label="Select Option"
								on:click
							>
								<span class="h-2.75 min-w-2.75 w-2.5 | bg-raisin-10 rounded-full" />
							</Checkbox>
						</form>
						<span class="md:text-lg">{option}</span>
					</div>
				{/each}
			</div>
		</div>
		<!-- Result -->
		<div class="grid gap-3">
			<p class="text-rich-90 leading-relaxed | md:text-xl">{definition.description}</p>
			<p class="leading-relaxed | md:text-lg">{definition.summary}</p>
		</div>
	</article>
{/if}

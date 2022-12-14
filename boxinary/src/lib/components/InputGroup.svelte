<script lang="ts" context="module">
	import { capitalise } from "$lib/utils";
	import { isAround } from "@boxinary/predicate-core";

	function getCharCountColour(amount: number, total: number) {
		const percentage = getPercentage(amount, total);
		if (isAround(percentage, { min: 0, max: 50 })) return "text-lime-400";
		if (isAround(percentage, { min: 50, max: 80 })) return "text-orange-400";
		return "text-rose-400";
	}

	function getErrorText(label: string, error: OnlyObject<ValidationUnit>) {
		label = capitalise(handleDashes(label));
		if (error.duplicate) return `${label} has been already taken.`;
		if (error.incorrect) return `Incorrect ${label}.`;
		if (error.invalid) return `${label} is invalid.`;
		if (error.missing) return `${label} is required.`;
		return `${label} not found.`;
	}

	function getPercentage(amount: number, total: number) {
		return (amount / total) * 100;
	}

	function handleDashes(str: string) {
		return str.split("-").join(" ");
	}
</script>

<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { useListener } from "malachite-ui/hooks";
	import { isObject, isString } from "@boxinary/predicate-core";

	let className =
		"w-full py-2.5 px-3 | bg-raisin-12 outline-none text-white font-medium placeholder-rich-50";

	export let id: string;
	export let label = id;
	export let error: Nullable<ValidationUnit> = undefined;
	export let value: Nullable<string> = isString(error) ? error : "";
	export let placeholder: Nullable<string> = value;
	export let charLimit: Nullable<number> = undefined;
	export let charCount = value?.length ?? 0;
	export let icon: Nullable<string> = undefined;
	export { className as class };

	$: charCount = value?.length ?? 0;

	function bind(element: HTMLInputElement | HTMLTextAreaElement) {
		return {
			destroy: useListener(element, "input", () => {
				value = element.value;
			})
		};
	}
</script>

<div class="w-full group grid gap-1.5">
	<div class="flex items-center justify-between">
		<label class="font-medium capitalize group-focus-within:text-white" for={id}>
			{handleDashes(label)}
		</label>
		{#if charLimit}
			<div class="font-victor">
				<span class="font-medium {getCharCountColour(charCount, charLimit)}">
					{charCount}
				</span>
				<span> / </span>
				<span class="font-bold"> {charLimit} </span>
			</div>
		{/if}
	</div>
	<div>
		<div
			class="min-h-10 | flex | border-2 border-transparent rounded-xl overflow-hidden focus-within:border-white"
		>
			{#if icon}
				<div class="w-12 min-w-12 h-12 | grid-center | bg-raisin-15">
					<i class="bx {icon} text-2xl group-focus-within:text-white" />
				</div>
			{/if}
			<!-- svelte-ignore invalid-html-attribute -->
			<slot
				{id}
				{className}
				maxlength={charLimit}
				{bind}
				input={{ class: className, id, name: id, maxlength: charLimit, placeholder, value }}
				textarea={{ class: className, id, name: id, maxlength: charLimit, placeholder }}
			>
				<input
					class={className}
					type="text"
					name={id}
					{placeholder}
					{id}
					maxlength={charLimit}
					bind:value
				/>
			</slot>
		</div>
		{#if isObject(error)}
			<div class="mt-1.5">
				<span>{getErrorText(label, error)}</span>
			</div>
		{/if}
	</div>
</div>

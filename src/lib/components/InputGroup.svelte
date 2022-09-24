<script lang="ts" context="module">
	function handleDashes(str: string) {
		return str.split("-").join(" ");
	}
</script>

<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { useListener } from "malachite-ui/hooks";
	import { isObject, isString } from "malachite-ui/predicate";

	let className = "w-full py-2.5 px-3 | bg-raisin-12 outline-none text-white font-medium";

	export let id: string;
	export let label = id;
	export let error: Nullable<ValidationUnit> = undefined;
	export let value = isString(error) ? error : "";
	export let placeholder: Nullable<string> = undefined;
	export let charLimit: Nullable<number> = undefined;
	export let charCount = value.length;
	export { className as class };

	$: charCount = value.length;

	function bind(element: HTMLInputElement | HTMLTextAreaElement) {
		element.value = value;
		return {
			destroy: useListener(element, "input", () => {
				value = element.value;
			})
		};
	}
</script>

<div class="grid gap-3">
	<div class="flex items-center justify-between">
		<label class="text-white font-bold capitalize" for={id}> {handleDashes(label)} </label>
		{#if charLimit}
			<span>{charCount} / {charLimit}</span>
		{/if}
	</div>
	<div>
		<div class="border-2 border-transparent focus-within:border-white">
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
		<div class="mt-1.5">
			{#if isObject(error)}
				{#if error.duplicate}
					<span>{label} has been already taken.</span>
				{:else if error.incorrect}
					<span>Incorrect {label}.</span>
				{:else if error.invalid}
					<span>{label} is invalid.</span>
				{:else if error.missing}
					<span>{label} is required.</span>
				{:else if error["not-found"]}
					<span>{label} not found.</span>
				{/if}
			{/if}
		</div>
	</div>
</div>

<script lang="ts">
	import { Page } from "@app/components";
	import { Switch, SwitchGroup, SwitchDescription, SwitchLabel } from "$lib";
	import { useClassNameResolver, useSwitch } from "$lib/hooks";

	let checked = useSwitch(false);

	const className = useClassNameResolver<"CHECKED">({
		base: "relative inline-flex h-8 w-20 items-center rounded-full",
		checked: { off: "bg-slate-800", on: "bg-indigo-500" }
	});
</script>

<Page title="Switch">
	<div>
		<button
			class="button focus:border-slate-400"
			class:border-purple-500={$checked}
			on:click={() => checked.toggle()}
		>
			Toggle Checked
		</button>
	</div>
	<div>
		<Switch bind:checked={$checked} class={className}>
			<span class="sr-only">Enable notifications</span>
			<span
				class="{$checked
					? 'translate-x-13'
					: 'translate-x-1'} inline-block h-6 w-6 transform rounded-full bg-white transition"
				aria-hidden
			/>
		</Switch>
		<SwitchGroup class="flex items-center gap-3">
			<div class="flex flex-col">
				<SwitchLabel class="text-sm font-medium" passive>Enable Notifications</SwitchLabel>
				<SwitchDescription class="text-xs">
					You will receive notifications in your email once every weekend.
				</SwitchDescription>
			</div>
			<Switch class={className} checked={$checked} let:isChecked>
				<span class="sr-only">Enable notifications</span>
				<span
					class="{isChecked
						? 'translate-x-12'
						: 'translate-x-1'} inline-block h-6 w-6 transform rounded-full bg-white transition"
					aria-hidden
				/>
			</Switch>
		</SwitchGroup>
		<SwitchGroup initialChecked={$checked} class="flex items-center gap-3" let:isChecked>
			<span class="text-xs">
				Group isChecked: {isChecked}
				Actual Checked: {$checked}
			</span>
			<SwitchLabel id="the-label" class="sr-only">First Label</SwitchLabel>
			<SwitchLabel class="sr-only">Another Label</SwitchLabel>
			<SwitchDescription id="the-description" class="sr-only">First Description</SwitchDescription>
			<SwitchDescription class="sr-only">Another Description</SwitchDescription>
			<Switch checked={$checked} class={className}>
				<span class="sr-only">Enable notifications</span>
				<span
					class="{isChecked
						? 'translate-x-12'
						: 'translate-x-1'} inline-block h-6 w-6 transform rounded-full bg-white transition"
					aria-hidden
				/>
			</Switch>
		</SwitchGroup>
	</div>
</Page>

<script lang="ts">
	import { Page, Toggle } from "@app/components";
	import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from "$lib";
	import { useClassNameResolver } from "$lib/hooks";

	const className = useClassNameResolver<"CHECKED" | "DISABLED">({
		base: "relative w-16 h-7 | rounded-full",
		disabled: "opacity-50",
		checked: { off: "bg-raisin-15/75", on: "bg-raisin-20" }
	});

	const knobClassName = useClassNameResolver<"CHECKED">({
		base: "absolute bottom-1/2 w-5.5 min-w-5.5 h-5.5 | bg-white rounded-full transform transition translate-y-1/2",
		checked: { off: "translate-x-1", on: "translate-x-9.75" }
	});

	let checked = false;
	let disabled = false;
	let passive = false;
</script>

<Page title="Switch">
	<div class="flex items-center gap-3" slot="options">
		<Toggle bind:checked />
		<Toggle text="Toggle Disabled" bind:checked={disabled} />
		<Toggle text="Toggle Passive" bind:checked={passive} />
	</div>
	<div class="grid gap-12">
		<div class="flex items-center gap-6">
			<Switch class={className} bind:checked let:isChecked>
				<span class="sr-only">Turn on Notifications</span>
				<div class={knobClassName({ isChecked })} aria-hidden />
			</Switch>
			<Switch class={className} {checked} {disabled} let:isChecked>
				<span class="sr-only">Turn on Notifications</span>
				<div class={knobClassName({ isChecked })} aria-hidden />
			</Switch>
		</div>
		<div class="flex items-center gap-6">
			<SwitchGroup class="flex items-center gap-1.5" initialChecked={checked}>
				<SwitchLabel {passive}>Turn on Notifications</SwitchLabel>
				<SwitchDescription class="sr-only">
					We will send you notifications on our latest products to your email inbox once every
					weekend.
				</SwitchDescription>
				<Switch class={className} let:isChecked>
					<div class={knobClassName({ isChecked })} aria-hidden />
				</Switch>
			</SwitchGroup>
			<SwitchGroup class="flex items-center gap-1.5" initialChecked={checked}>
				<div class="flex flex-col | text-xs">
					<SwitchLabel {passive}>Turn on Notifications</SwitchLabel>
					<SwitchLabel id="psycho-mode-label" {passive}>Turn on Psycho Mode</SwitchLabel>
				</div>
				<SwitchDescription class="sr-only">
					We will send you notifications on our latest products to your email inbox once every
					weekend.
				</SwitchDescription>
				<SwitchDescription id="psycho-mode-description" class="sr-only">
					Psycho-Mode will allow us to send you information about our "Psycho Products", which are
					only suitable for people with the "Sigma Grindset".
				</SwitchDescription>
				<Switch class={className} let:isChecked>
					<div class={knobClassName({ isChecked })} aria-hidden />
				</Switch>
			</SwitchGroup>
		</div>
	</div>
</Page>

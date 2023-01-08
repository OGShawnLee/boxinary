import Context from "./Group.context";
import type { Writable } from "svelte/store";
import type { ComponentInitialiser } from "$lib/types";
import { ElementBinder, ElementLabel, defineActionComponent } from "$lib/core";
import { useComponentNaming, useListener, useSwitch } from "$lib/hooks";
import { createReadableRef, ref } from "$lib/utils";

interface Settings {
	initialChecked: boolean; // enrures it has the right value in SSR
	isPassive: boolean;
}

export function createSwitchGroupState(settings: Settings) {
	const isChecked = useSwitch(settings.initialChecked);
	const isPassive = ref(settings.isPassive);
	const button = new ElementBinder();
	const descriptions = new ElementLabel();
	const labels = new ElementLabel();
	const { baseName, nameChild } = useComponentNaming({ component: "switch" });
	button.name.value = baseName;

	const createDescription: ComponentInitialiser = (id, binder) =>
		defineActionComponent({
			binder: binder,
			id: id,
			name: nameChild("description"),
			onInit: ({ name }) => {
				descriptions.onInitLabel(name, id);
			},
			onMount: ({ binder, name }) => {
				return descriptions.onMountLabel(name, binder);
			}
		});

	function createLabel(id: string | undefined) {
		return defineActionComponent<Writable<boolean>>({
			id: id,
			name: nameChild("label"),
			onInit: ({ name }) => {
				labels.onInitLabel(name, id);
				return isPassive;
			},
			onMount: ({ binder, element, name }) => {
				return [
					labels.onMountLabel(name, binder),
					useListener(element, "click", (event) => {
						event.preventDefault();
						if (button.disabled.value || isPassive.value) return;
						isChecked.toggle();
					})
				];
			}
		});
	}

	Context.setContext({
		isChecked,
		isPassive,
		button,
		labels: labels.finalName,
		descriptions: descriptions.finalName,
		createSwitchDescription: createDescription,
		createSwitchLabel: createLabel
	});

	return { isChecked: createReadableRef(isChecked), isPassive };
}

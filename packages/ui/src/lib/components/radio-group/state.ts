import type { ComponentInitialiser, Navigable, Ref } from "$lib/types";
import { GroupContext, OptionContext } from "./context";
import { ElementBinder, ElementLabel, defineActionComponent } from "$lib/core";
import { Navigation } from "$lib/stores";
import { useComponentNaming } from "$lib/hooks";
import { ref } from "$lib/utils";

interface Settings<T> extends Navigable.Settings {
	initialValue: T;
}

interface Item<T> extends Navigable.Item {
	value: T;
}

export function createRadioGroupState<T>(settings: Settings<T>) {
	const { baseName, nameChild } = useComponentNaming({ component: "radio-group" });
	const navigation = new Navigation<Item<T>>(settings);
	const radioGroup = new ElementBinder();
	const descriptions = new ElementLabel();
	const labels = new ElementLabel();
	const value = ref(settings.initialValue);
	let isPending = true;

	function createRadioGroup(id: string | undefined) {
		return defineActionComponent({
			binder: radioGroup,
			id: id,
			name: baseName,
			onInit() {
				navigation.onInit((previous, current) => {
					if (current) {
						value.set(current.value);
						if (current.element) {
							current.element.ariaChecked = "true";
						}
					}

					if (previous?.element) previous.element.ariaChecked = "false";
				});
			},
			onMount({ element }) {
				return [
					navigation.initNavigation(element),
					descriptions.handleAriaDescribedby(element),
					labels.handleAriaLabelledby(element)
				];
			}
		});
	}

	const createDescription: ComponentInitialiser = (id, binder) => {
		const { descriptions } = getDescriptionContext();
		return defineActionComponent({
			id: id,
			binder: binder,
			name: nameChild("label"),
			onInit({ name }) {
				descriptions.onInitLabel(name, id);
			},
			onMount({ binder, name }) {
				return descriptions.onMountLabel(name, binder);
			}
		});
	};

	const createLabel: ComponentInitialiser = (id, binder) => {
		const { labels } = getDescriptionContext();
		return defineActionComponent({
			id: id,
			binder: binder,
			name: nameChild("label"),
			onInit({ name }) {
				labels.onInitLabel(name, id);
			},
			onMount({ binder, name }) {
				return labels.onMountLabel(name, binder);
			}
		});
	};

	function createOptionState(initialValue: T, isSelected: boolean) {
		const { baseName } = useComponentNaming({ component: "option" });
		const option = new ElementBinder();
		const descriptions = new ElementLabel();
		const labels = new ElementLabel();

		const createOption: ComponentInitialiser = (id) =>
			defineActionComponent({
				binder: option,
				id: id,
				name: baseName,
				onInit: ({ binder, name }) => {
					const index = navigation.onInitItem(name, binder, { value: initialValue });
					if (initialValue === value.value || (isSelected && isPending)) {
						navigation.index.set(index);
						navigation.isWaiting.set(false);
						isPending = false;
					}
				},
				onMount({ element, name }) {
					element.tabIndex = 0;
					return [
						navigation.initItem(element, name),
						descriptions.handleAriaDescribedby(element),
						labels.handleAriaLabelledby(element)
					];
				}
			});

		OptionContext.setContext({ labels, descriptions, parentName: option.finalName });
		return { createOption, descriptions: descriptions.finalName, labels: labels.finalName };
	}

	GroupContext.setContext({
		labels,
		descriptions,
		createRadioGroupDescription: createDescription,
		createRadioGroupLabel: createLabel,
		createRadioGroupOptionState: createOptionState,
		parentName: radioGroup.finalName
	});

	return {
		createRadioGroup,
		descriptions: descriptions.finalName,
		labels: labels.finalName,
		navigation,
		value
	};
}

function getDescriptionContext() {
	const { descriptions, labels } = OptionContext.getContext(false) || GroupContext.getContext();
	return { descriptions, labels };
}

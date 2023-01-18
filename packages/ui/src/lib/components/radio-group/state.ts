import type { Navigable } from "$lib/types";
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
	const descriptions = new ElementLabel();
	const globalValue = ref(settings.initialValue);
	const navigation = new Navigation<Item<T>>(settings);
	const labels = new ElementLabel();
	const radioGroup = new ElementBinder();
	const { baseName, nameChild } = useComponentNaming({ component: "radio-group" });
	let isInitialValueFound = false;

	GroupContext.setContext({
		parentName: radioGroup.finalName,
		labels,
		descriptions,
		createRadioGroupDescription,
		createRadioGroupLabel,
		createRadioGroupOptionState
	});

	function createRadioGroup(id: string | undefined) {
		return defineActionComponent({
			binder: radioGroup,
			id: id,
			name: baseName,
			onMount({ element }) {
				return [
					navigation.initNavigation(element),
					descriptions.handleAriaDescribedby(element),
					labels.handleAriaLabelledby(element)
				];
			}
		});
	}

	function createRadioGroupDescription(id: string | undefined, binder: ElementBinder) {
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
	}

	function createRadioGroupLabel(id: string | undefined, binder: ElementBinder) {
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
	}

	function createRadioGroupOptionState(initialValue: T, isSelected: boolean) {
		const descriptions = new ElementLabel();
		const labels = new ElementLabel();
		const option = new ElementBinder();
		const { baseName } = useComponentNaming({ component: "option" });

		OptionContext.setContext({ labels, descriptions, parentName: option.finalName });

		function createRadioGroupOption(id: string | undefined) {
			return defineActionComponent({
				binder: option,
				id: id,
				name: baseName,
				onInit: ({ binder, name }) => {
					const index = navigation.onInitItem(name, binder, { value: initialValue });
					if (isInitialValueFound) return;
					if (initialValue === globalValue.value || isSelected) {
						navigation.index.set(index);
						navigation.isWaiting.set(false);
						isInitialValueFound = true;
					}
				},
				onMount({ element, name }) {
					element.tabIndex = 0;
					return [
						navigation.initItem(element, name),
						descriptions.handleAriaDescribedby(element),
						labels.handleAriaLabelledby(element),
						option.isSelected.subscribe((isSelected) => {
							if (isSelected) {
								globalValue.set(initialValue);
								element.ariaChecked = "true";
							} else element.ariaChecked = "false";
						})
					];
				}
			});
		}

		return {
			createRadioGroupOption,
			descriptions: descriptions.finalName,
			labels: labels.finalName
		};
	}

	return {
		createRadioGroup,
		descriptions: descriptions.finalName,
		globalValue,
		labels: labels.finalName,
		navigation
	};
}

function getDescriptionContext() {
	const { descriptions, labels } = OptionContext.getContext(false) || GroupContext.getContext();
	return { descriptions, labels };
}

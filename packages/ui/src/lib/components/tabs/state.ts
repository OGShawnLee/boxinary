import type { ComponentInitialiser, Navigable, ReadableRef } from "$lib/types";
import type { Tab, TabsContext } from "./context";
import Context from "./context";
import { Navigation } from "$lib/stores";
import { defineActionComponent } from "$lib/core";
import { useComponentNaming, useGarbageCollector } from "$lib/hooks";
import { createReadableRef } from "$lib/utils";
import { isNullish } from "@boxinary/predicate-core";

export function createTabGroupState(settings: Navigable.Settings) {
	const navigation = new Navigation<Tab>(settings);
	const { nameChild } = useComponentNaming({ component: "tabs" });

	const createTabList: ComponentInitialiser<ReadableRef<boolean>> = (id) =>
		defineActionComponent({
			id: id,
			name: nameChild("tablist"),
			onInit: () => {
				navigation.onInit((previous, current) => {
					if (previous?.element) {
						previous.element.ariaSelected = "false";
						previous.element.tabIndex = -1;
					}
					if (current?.element) {
						current.element.ariaSelected = "true";
						current.element.tabIndex = 0;
					}
				});
				return createReadableRef(navigation.isVertical);
			},
			onMount: ({ element }) => {
				element.role = "tablist";
				return [
					navigation.isVertical.subscribe((isVertical) => {
						element.ariaOrientation = isVertical ? "vertical" : "horizontal";
					}),
					navigation.initNavigation(element)
				];
			}
		});

	const createTab: TabsContext["createTab"] = (id, binder) =>
		defineActionComponent({
			binder: binder,
			name: nameChild("tab"),
			id: id,
			onInit: ({ name, binder }) => {
				return navigation.onInitItem(name, binder, { panelName: undefined });
			},
			onMount: ({ binder, element, name }) => {
				if (binder.isSelected.value) {
					element.ariaSelected = "true";
					element.tabIndex = 0;
				} else {
					element.ariaSelected = "false";
					element.tabIndex = -1;
				}
				element.role = "tab";
				return navigation.initItem(element, name);
			}
		});

	const createPanels: ComponentInitialiser = (id) =>
		defineActionComponent({
			id: id,
			name: nameChild("panels"),
			onMount: () => []
		});

	const createPanel: ComponentInitialiser<Tab> = (id, binder) => {
		const tab = navigation.get(({ item: { panelName } }) => isNullish(panelName));
		const name = nameChild("panel");
		navigation.update(tab.name, (tab) => {
			tab.panelName = name;
			return tab;
		});

		return defineActionComponent<Tab>({
			binder: binder,
			id: id,
			name: name,
			onInit: () => {
				return tab.item;
			},
			onMount({ element, binder: { finalName } }) {
				element.role = "tabpanel";
				return useGarbageCollector({
					beforeCollection: () => {
						if (tab.item.element) tab.item.element.removeAttribute("aria-controls");
					},
					init: () => [
						tab.item.binder.finalName.subscribe((id) => {
							if (id) element.setAttribute("aria-labelledby", id);
							else element.removeAttribute("aria-labelledby");
						}),
						finalName.subscribe((name) => {
							if (name && tab.item.element) tab.item.element.setAttribute("aria-controls", name);
							else if (tab.item.element) tab.item.element.removeAttribute("aria-controls");
						})
					]
				});
			}
		});
	};

	Context.setContext({
		index: createReadableRef(navigation.index),
		createPanel,
		createPanels,
		createTab,
		createTabList
	});

	return {
		isFinite: navigation.isFinite,
		isManual: navigation.isManual,
		isVertical: navigation.isVertical
	};
}

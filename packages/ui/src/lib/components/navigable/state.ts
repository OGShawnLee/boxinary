import type { ComponentInitialiser, Navigable } from "$lib/types";
import Context from "./context";
import { Navigation } from "$lib/stores";
import { defineActionComponent } from "$lib/core";
import { useComponentNaming } from "$lib/hooks";
import { useResetOnLeave } from "$lib/plugins";

export function createNavigableState(settings: Navigable.Settings) {
	const navigation = new Navigation(settings);
	const { baseName, nameChild } = useComponentNaming({ component: "navigable" });

	const createNavigable: ComponentInitialiser = (id) =>
		defineActionComponent({
			id: id,
			name: baseName,
			onMount: ({ element }) =>
				navigation.initNavigation(element, {
					plugins: [useResetOnLeave]
				})
		});

	const createNavigableItem: ComponentInitialiser = (id, binder) =>
		defineActionComponent({
			binder: binder,
			id: id,
			name: nameChild("item"),
			onInit: ({ binder, name }) => {
				navigation.onInitItem(name, binder, {});
			},
			onMount: ({ element, name }) => navigation.initItem(element, name)
		});

	Context.setContext({ createNavigableItem });
	return { createNavigable, navigation };
}

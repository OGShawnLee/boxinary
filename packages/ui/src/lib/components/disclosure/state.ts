import type { ComponentInitialiser } from "$lib/types";
import Context from "./context";
import { Toggler } from "$lib/stores";
import { ElementBinder, defineActionComponent } from "$lib/core";
import { useComponentNaming } from "$lib/hooks";
import { createReadableRef } from "$lib/utils";
import { handleAriaControls, handleAriaExpanded } from "$lib/plugins";

export function createDisclosureState(initialValue: boolean) {
	const toggler = new Toggler({ isOpen: initialValue });
	const { nameChild } = useComponentNaming({ component: "disclosure" });
	const button = new ElementBinder();
	const panel = new ElementBinder();

	const createButton: ComponentInitialiser = (id) =>
		defineActionComponent({
			binder: button,
			id: id,
			name: nameChild("button"),
			onMount: ({ element }) =>
				toggler.createButton(element, {
					plugins: [handleAriaControls(panel), handleAriaExpanded]
				})
		});

	const createPanel: ComponentInitialiser = (id) => {
		return defineActionComponent({
			binder: panel,
			id: id,
			name: nameChild("panel"),
			isShowing: initialValue,
			onMount: ({ element }) => toggler.createPanel(element)
		});
	};

	Context.setContext({
		close: toggler.handleClose.bind(toggler),
		isOpen: createReadableRef(toggler.isOpen),
		panel,
		createDisclosureButton: createButton,
		createDisclosurePanel: createPanel
	});

	return {
		subscribe: toggler.subscribe,
		isOpen: toggler.isOpen,
		close: toggler.handleClose.bind(toggler),
		button: createButton().action,
		panel: createPanel().action
	};
}

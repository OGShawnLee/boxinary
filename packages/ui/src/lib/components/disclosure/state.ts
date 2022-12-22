import type { ComponentInitialiser } from "$lib/types";
import Context from "./context";
import { Toggler } from "$lib/stores";
import { ElementBinder, defineActionComponent } from "$lib/core";
import { useComponentNaming } from "$lib/hooks";
import { createReadableRef } from "$lib/utils";

export function createDisclosureState(initialValue: boolean) {
	const toggler = new Toggler(initialValue);
	const { nameChild } = useComponentNaming({ component: "disclosure" });
	const button = new ElementBinder();
	const panel = new ElementBinder();

	const createButton: ComponentInitialiser = (id) =>
		defineActionComponent({
			binder: button,
			id: id,
			name: nameChild("button"),
			onMount: ({ element }) => ({
				onActionComponent: () => [
					toggler.subscribe((isOpen) => {
						element.ariaExpanded = String(isOpen);
					}),
					panel.finalName.subscribe((name) => {
						if (name) element.setAttribute("aria-controls", name);
						else element.removeAttribute("aria-controls");
					})
				],
				base: toggler.createButton(element)
			})
		});

	const createPanel: ComponentInitialiser = (id) => {
		return defineActionComponent({
			binder: panel,
			id: id,
			name: nameChild("panel"),
			isShowing: initialValue,
			onMount: ({ element }) => ({
				base: toggler.createPanel(element)
			})
		});
	};

	Context.setContext({
		close: toggler.handleClose.bind(toggler),
		isOpen: createReadableRef(toggler.open),
		panel,
		createDisclosureButton: createButton,
		createDisclosurePanel: createPanel
	});

	return {
		subscribe: toggler.subscribe,
		isOpen: toggler.open,
		close: toggler.handleClose.bind(toggler),
		button: createButton().action,
		panel: createPanel().action
	};
}
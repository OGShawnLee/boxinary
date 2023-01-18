import Context from "./context";
import { Toggler } from "$lib/stores";
import { ElementBinder, defineActionComponent } from "$lib/core";
import { useComponentNaming } from "$lib/hooks";
import { createReadableRef } from "$lib/utils";
import { handleAriaControls, handleAriaExpanded } from "$lib/plugins";

export function createDisclosureState(initialValue: boolean) {
	const button = new ElementBinder();
	const panel = new ElementBinder();
	const toggler = new Toggler({ isOpen: initialValue });
	const { nameChild } = useComponentNaming({ component: "disclosure" });

	Context.setContext({
		isOpen: createReadableRef(toggler.isOpen),
		close: toggler.handleClose.bind(toggler),
		createDisclosureButton,
		createDisclosurePanel
	});

	function createDisclosureButton(id: string | undefined) {
		return defineActionComponent({
			binder: button,
			id: id,
			name: nameChild("button"),
			onInit: () => panel.finalName,
			onMount: ({ element }) =>
				toggler.createButton(element, {
					plugins: [handleAriaControls(panel), handleAriaExpanded]
				})
		});
	}

	function createDisclosurePanel(id: string | undefined) {
		return defineActionComponent({
			binder: panel,
			id: id,
			name: nameChild("panel"),
			isShowing: initialValue,
			onMount: ({ element }) => toggler.createPanel(element)
		});
	}

	return {
		isOpen: toggler.isOpen,
		button: createDisclosureButton("").action,
		close: toggler.handleClose.bind(toggler),
		panel: createDisclosurePanel("").action
	};
}

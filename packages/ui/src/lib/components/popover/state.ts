import type { ComponentInitialiser, Toggleable } from "$lib/types";
import Context from "./context";
import { Toggler } from "$lib/stores";
import { ElementBinder, defineActionComponent } from "$lib/core";
import { useComponentNaming } from "$lib/hooks";
import {
	handleAriaControls,
	handleAriaExpanded,
	useCloseClickOutside,
	useCloseEscapeKey,
	useCloseFocusLeave
} from "$lib/plugins";
import { createReadableRef } from "$lib/utils";

export function createPopoverState(configuration: Toggleable.Configuration) {
	const { nameChild } = useComponentNaming({ component: "popover" });
	const toggler = new Toggler(configuration);
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

	const createOverlay: ComponentInitialiser = (id) =>
		defineActionComponent({
			id: id,
			name: nameChild("overlay"),
			isShowing: false,
			onMount: ({ element }) => ({
				base: toggler.createOverlay(element)
			})
		});

	const createPanel: ComponentInitialiser = (id) =>
		defineActionComponent({
			binder: panel,
			id: id,
			name: nameChild("panel"),
			isShowing: false,
			onMount: ({ element }) => ({
				base: toggler.createPanel(element, {
					plugins: [useCloseClickOutside, useCloseEscapeKey, useCloseFocusLeave]
				})
			})
		});

	Context.setContext({
		isOpen: createReadableRef(toggler.isOpen),
		close: toggler.handleClose.bind(toggler),
		panel,
		createPopoverButton: createButton,
		createPopoverOverlay: createOverlay,
		createPopoverPanel: createPanel
	});

	return {
		isOpen: toggler.isOpen,
		isFocusForced: toggler.isFocusForced,
		close: toggler.handleClose.bind(toggler),
		button: createButton().action,
		panel: createPanel().action,
		overlay: createOverlay().action
	};
}

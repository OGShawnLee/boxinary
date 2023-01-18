import type { Toggleable } from "$lib/types";
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
	const button = new ElementBinder();
	const panel = new ElementBinder();
	const toggler = new Toggler(configuration);
	const { nameChild } = useComponentNaming({ component: "popover" });

	Context.setContext({
		isOpen: createReadableRef(toggler.isOpen),
		close: toggler.handleClose.bind(toggler),
		createPopoverButton,
		createPopoverOverlay,
		createPopoverPanel
	});

	function createPopoverButton(id: string | undefined) {
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

	function createPopoverOverlay(id: string | undefined) {
		return defineActionComponent({
			id: id,
			name: nameChild("overlay"),
			isShowing: false,
			onMount: ({ element }) => toggler.createOverlay(element)
		});
	}

	function createPopoverPanel(id: string | undefined) {
		return defineActionComponent({
			binder: panel,
			id: id,
			name: nameChild("panel"),
			isShowing: false,
			onMount: ({ element }) =>
				toggler.createPanel(element, {
					plugins: [useCloseClickOutside, useCloseEscapeKey, useCloseFocusLeave]
				})
		});
	}

	return {
		isFocusForced: toggler.isFocusForced,
		isOpen: toggler.isOpen,
		button: createPopoverButton("").action,
		close: toggler.handleClose.bind(toggler),
		overlay: createPopoverOverlay("").action,
		panel: createPopoverPanel("").action
	};
}

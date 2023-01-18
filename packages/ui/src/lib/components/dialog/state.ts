import type { Nullable, Ref } from "$lib/types";
import Context from "./context";
import { ElementBinder, ElementLabel, defineActionComponent } from "$lib/core";
import { useComponentNaming } from "$lib/hooks";
import { Toggler } from "$lib/stores";
import { isHTMLElement } from "$lib/predicate";
import {
	useCloseClickOutside,
	useCloseEscapeKey,
	useCloseFocusLeave,
	useFocusTrap
} from "$lib/plugins";
import { focusFirstChildElement } from "$lib/utils";
import { tick } from "svelte";

function createPortal(element: HTMLElement) {
	const root = document.body;
	root.appendChild(element);
}

export function createDialogState(initialValue: boolean, initialFocus: Ref<Nullable<HTMLElement>>) {
	const descriptions = new ElementLabel();
	const titles = new ElementLabel();
	const toggler = new Toggler({ isOpen: initialValue });
	const { baseName, nameChild } = useComponentNaming({ component: "dialog" });

	Context.setContext({
		isOpen: toggler.isOpen,
		createDialogContent,
		createDialogDescription,
		createDialogOverlay,
		createDialogTitle,
		close: toggler.handleClose.bind(toggler)
	});

	function createDialogRoot(id: string | undefined) {
		return defineActionComponent({
			id: id,
			name: baseName,
			onMount: ({ element }) => {
				return createPortal(element);
			}
		});
	}

	function createDialogContent(id: string | undefined) {
		return defineActionComponent({
			id: id,
			name: nameChild("content"),
			onMount: ({ element }) => {
				const button = document.activeElement;
				element.role = "dialog";
				element.ariaModal = "true";
				return [
					isHTMLElement(button) && toggler.createButton(button, { isToggler: false }),
					toggler.createPanel(element, {
						onOpen: async () => {
							await tick();
							focusFirstChildElement(element, {
								initialFocus: initialFocus.value
							});
						},
						plugins: [
							useFocusTrap(button),
							useCloseFocusLeave,
							useCloseClickOutside,
							useCloseEscapeKey
						]
					}),
					descriptions.handleAriaDescribedby(element),
					titles.handleAriaLabelledby(element)
				];
			}
		});
	}

	function createDialogDescription(id: string | undefined, binder: ElementBinder) {
		return defineActionComponent({
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
	}

	function createDialogOverlay(id: string | undefined) {
		return defineActionComponent({
			id: id,
			name: nameChild("overlay"),
			onMount: ({ element }) => toggler.createOverlay(element)
		});
	}

	function createDialogTitle(id: string | undefined, binder: ElementBinder) {
		return defineActionComponent({
			binder: binder,
			id: id,
			name: nameChild("description"),
			onInit: ({ name }) => {
				titles.onInitLabel(name, id);
			},
			onMount: ({ binder, name }) => {
				return titles.onMountLabel(name, binder);
			}
		});
	}

	return {
		close: toggler.handleClose.bind(toggler),
		createDialogRoot,
		content: createDialogContent("").action,
		isOpen: toggler.isOpen,
		overlay: createDialogOverlay("").action
	};
}

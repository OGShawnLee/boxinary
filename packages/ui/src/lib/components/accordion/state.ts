import type { Toggler } from "$lib/stores";
import type { Navigable } from "$lib/types";
import { GroupContext, ItemContext } from "./context";
import { Navigation } from "$lib/stores";
import { ElementBinder, defineActionComponent } from "$lib/core";
import { useComponentNaming } from "$lib/hooks";
import { createReadableRef } from "$lib/utils";
import {
	handleAriaControls,
	handleAriaDisabled,
	handleAriaExpanded,
	handleAriaLabelledby
} from "$lib/plugins";

// TODO: ADD SUPPORT FOR UNIQUE OPEN ITEM

export function createAccordionState(settings: Navigable.Settings) {
	const navigation = new Navigation(settings);
	const { baseName } = useComponentNaming({ component: "accordion" });

	function createAccordion(id: string | undefined) {
		return defineActionComponent({
			id: id,
			name: baseName,
			onMount: ({ element }) => navigation.initNavigation(element)
		});
	}

	function createItemState(toggler: Toggler) {
		const { nameChild } = useComponentNaming({ prefix: baseName, component: "item" });
		const button = new ElementBinder();
		const header = new ElementBinder();
		const panel = new ElementBinder();
		const buttonName = nameChild("button");

		function createButton(id: string | undefined) {
			return defineActionComponent({
				id: id,
				binder: button,
				name: buttonName,
				onInit: ({ name }) => {
					navigation.onInitItem(name, button, {});
				},
				onMount({ element, name }) {
					return [
						navigation.initItem(element, name),
						toggler.createButton(element, {
							plugins: [handleAriaExpanded, handleAriaControls(panel), handleAriaDisabled(button)]
						})
					];
				}
			});
		}

		function createHeading(id: string | undefined) {
			return defineActionComponent({
				id: id,
				binder: header,
				name: nameChild("header"),
				onMount: () => {
					// TODO: HANDLE ATTRIBUTES IF ELEMENT IS NOT A NATIVE HEADING
				}
			});
		}

		function createPanel(id: string | undefined) {
			return defineActionComponent({
				id: id,
				binder: panel,
				name: nameChild("panel"),
				onMount({ element }) {
					element.setAttribute("role", "region");
					element.scrollIntoView(); // ? EXPERIMENTAL
					return toggler.createPanel(element, {
						plugins: [handleAriaLabelledby(button)]
					});
				}
			});
		}

		ItemContext.setContext({
			isOpen: createReadableRef(toggler.isOpen),
			button,
			close: toggler.handleClose.bind(toggler),
			panel,
			createAccordionButton: createButton,
			createAccordionHeading: createHeading,
			createAccordionPanel: createPanel
		});

		return {
			isOpen: createReadableRef(toggler.isOpen),
			close: toggler.handleClose.bind(toggler),
			button: createButton("").action,
			heading: createHeading("").action,
			panel: createPanel("").action
		};
	}

	GroupContext.setContext({
		createAccordionItemState: createItemState
	});

	return { createAccordion, navigation };
}

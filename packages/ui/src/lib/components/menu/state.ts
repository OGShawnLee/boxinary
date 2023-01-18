import type { Navigable } from "$lib/types";
import Context from "./context";
import { Navigation, Toggler } from "$lib/stores";
import { ElementBinder, defineActionComponent } from "$lib/core";
import { useComponentNaming, useListener } from "$lib/hooks";
import {
	handleAriaControls,
	handleAriaExpanded,
	handleAriaLabelledby,
	handleAriaOrientation,
	useCloseClickOutside,
	useCloseEscapeKey,
	useCloseFocusLeave,
	useFocusKeep,
	useKeyMatch,
	useNavigationStarter
} from "$lib/plugins";

export function createMenuState(settings: Navigable.Settings) {
	const navigation = new Navigation(settings);
	const toggler = new Toggler();
	const button = new ElementBinder();
	const panel = new ElementBinder();
	const { nameChild } = useComponentNaming({ component: "menu" });

	Context.setContext({
		isOpen: toggler.isOpen,
		createMenuButton,
		createMenuItem,
		createMenuPanel
	});

	function createMenuButton(id: string | undefined) {
		return defineActionComponent({
			id: id,
			binder: button,
			name: nameChild("button"),
			onMount: ({ element }) => {
				return [
					toggler.createButton(element, {
						plugins: [
							useNavigationStarter(navigation),
							handleAriaControls(panel),
							handleAriaExpanded
						]
					})
				];
			}
		});
	}

	function createMenuPanel(id: string | undefined) {
		return defineActionComponent({
			binder: panel,
			id: id,
			name: nameChild("items"),
			isShowing: false,
			onMount: ({ element }) => {
				element.role = "menu";
				element.tabIndex = 0;
				return [
					navigation.initNavigation(element, {
						plugins: [handleAriaOrientation, useFocusKeep, useKeyMatch]
					}),
					toggler.createPanel(element, {
						plugins: [
							handleAriaLabelledby(button),
							useCloseClickOutside,
							useCloseEscapeKey,
							useCloseFocusLeave
						],
						onOpen: () => element.focus()
					}),
					navigation.active.subscribe((item) => {
						const name = item?.binder.finalName.value;
						if (name) element.setAttribute("aria-activedescendant", name);
						else element.removeAttribute("aria-activedescendant");
					})
				];
			}
		});
	}

	function createMenuItem(id: string | undefined, binder: ElementBinder) {
		return defineActionComponent({
			binder: binder,
			id: id,
			name: nameChild("item"),
			onInit: ({ binder, name }) => {
				navigation.onInitItem(name, binder, {});
			},
			onMount: ({ element, name }) => {
				element.role = "menuitem";
				element.tabIndex = -1;
				return [
					navigation.initItem(element, name),
					useListener(element, "click", () => {
						toggler.handleClose(event);
						element.click();
					})
				];
			}
		});
	}

	return {
		button: createMenuButton("").action,
		isOpen: toggler.isOpen,
		navigation,
		panel: createMenuPanel("").action
	};
}

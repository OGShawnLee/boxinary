import type { Navigable } from "$lib/types";
import Context from "./context";
import ToolbarContext from "../toolbar/context";
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
	useHoverMove,
	useKeyMatch,
	useNavigationStarter
} from "$lib/plugins";
import { isDisabled } from "$lib/predicate";

export function createMenuState(settings: Navigable.Settings) {
	const button = new ElementBinder();
	const navigation = new Navigation(settings);
	const panel = new ElementBinder();
	const toggler = new Toggler();
	const toolbar = ToolbarContext.getContext(false);
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
							useNavigationStarter(navigation, toolbar),
							handleAriaControls(panel),
							handleAriaExpanded
						]
					}),
					toolbar?.item(element)
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
						plugins: [handleAriaOrientation, useHoverMove, useFocusKeep, useKeyMatch]
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
						if (isDisabled(element)) return;
						toggler.handleClose();
						element.click();
					})
				];
			}
		});
	}

	return {
		isOpen: toggler.isOpen,
		navigation,
		button: createMenuButton("").action,
		panel: createMenuPanel("").action
	};
}

import type { Navigable, Nullable } from "$lib/types";
import Context from "./context";
import { ElementBinder, ElementLabel, defineActionComponent } from "$lib/core";
import { Navigation, Toggler } from "$lib/stores";
import { createReadableRef, ref } from "$lib/utils";
import { useComponentNaming, useListener } from "$lib/hooks";
import { isDisabled as isDisabledFn } from "$lib/predicate";
import {
	handleAriaControls,
	handleAriaExpanded,
	handleAriaOrientation,
	useCloseClickOutside,
	useCloseEscapeKey,
	useCloseFocusLeave,
	useFocusKeep,
	useHoverMove,
	useKeyMatch
} from "$lib/plugins";
import { tick } from "svelte";

interface Settings<T> extends Navigable.Settings {
	initialValue: T;
}

interface Item<T> extends Navigable.Item {
	initialValue: T;
}

export function createListboxState<T>(settings: Settings<T>) {
	const button = new ElementBinder();
	const globalValue = ref(settings.initialValue);
	const navigation = new Navigation<Item<T>>(settings);
	const labels = new ElementLabel();
	const panel = new ElementBinder();
	const toggler = new Toggler();
	const { nameChild } = useComponentNaming({ component: "listbox" });
	let isInitialValueFound = false;

	Context.setContext({
		isOpen: toggler.isOpen,
		createListboxButton,
		createListboxOptionState,
		createListboxPanel,
		createListboxLabel
	});

	function createListboxButton(id: string | undefined) {
		return defineActionComponent({
			binder: button,
			id: id,
			name: nameChild("button"),
			onInit: ({ name }) => {
				labels.onInitLabel(name, id);
			},
			onMount: ({ element, name }) => {
				element.ariaHasPopup = "true";
				return [
					labels.onMountLabel(name, button),
					toggler.createButton(element, {
						plugins: [handleAriaControls(panel), handleAriaExpanded]
					}),
					useListener(element, "keydown", async ({ code }) => {
						switch (code) {
							case "ArrowDown":
								toggler.handleOpen();
								await tick();
								if (navigation.selected.value) return;
								return navigation.goFirst();
							case "ArrowUp":
								toggler.handleOpen();
								await tick();
								if (navigation.selected.value) return;
								return navigation.goLast();
						}
					})
				];
			}
		});
	}

	function createListboxLabel(id?: string, binder?: ElementBinder) {
		return defineActionComponent({
			binder: binder,
			id: id,
			name: nameChild("label"),
			onInit: ({ name }) => {
				labels.onInitLabel(name, id);
				return panel.finalName;
			},
			onMount: ({ binder, name }) => {
				return labels.onMountLabel(name, binder);
			}
		});
	}

	function createListboxPanel(id: string | undefined) {
		return defineActionComponent({
			binder: panel,
			id: id,
			name: nameChild("panel"),
			isShowing: false,
			onMount: ({ element }) => {
				element.tabIndex = 0;
				element.role = "listbox";
				return [
					navigation.initNavigation(element, {
						plugins: [handleAriaOrientation, useFocusKeep, useHoverMove, useKeyMatch]
					}),
					toggler.createPanel(element, {
						plugins: [useCloseFocusLeave, useCloseClickOutside, useCloseEscapeKey],
						onOpen: () => element.focus()
					}),
					labels.handleAriaLabelledby(element),
					navigation.active.subscribe((active) => {
						const name = active?.binder.finalName.value;
						if (active && name) element.setAttribute("aria-activedescendant", name);
						else element.removeAttribute("aria-activedescendant");
					})
				];
			}
		});
	}

	function createListboxOptionState(initialValue: T, isDisabled: Nullable<boolean>) {
		return {
			createListboxOption(id: string | undefined, binder: ElementBinder) {
				return defineActionComponent({
					binder: binder,
					id: id,
					name: nameChild("option"),
					onInit: ({ name }) => {
						const index = navigation.onInitItem(name, binder, { initialValue });
						if (isInitialValueFound || isDisabled) return;
						if (initialValue === globalValue.value) {
							navigation.index.set(index);
							navigation.isWaiting.set(false);
							globalValue.set(initialValue);
							isInitialValueFound = true;
						}
					},
					onMount: ({ element, binder, name }) => {
						element.tabIndex = -1;
						element.role = "option";
						return [
							navigation.initItem(element, name),
							binder.isSelected.subscribe((isSelected) => {
								if (isSelected) {
									globalValue.set(initialValue);
									element.ariaSelected = "true";
								} else element.ariaSelected = "false";
							}),
							useListener(element, "click", () => {
								if (isDisabledFn(element)) return;
								toggler.handleClose();
								element.click();
							})
						];
					}
				});
			}
		};
	}

	return {
		isOpen: toggler.isOpen,
		globalValue: createReadableRef(globalValue),
		navigation,
		button: createListboxButton("").action,
		panel: createListboxPanel("").action
	};
}

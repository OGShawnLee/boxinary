import type { ElementBinder } from "$lib/core";
import type { Toggleable } from "$lib/types";
import type { Navigation } from "$lib/stores";
import { useListener, useWindowListener } from "$lib/hooks";
import { isFocusable, isHTMLElement, isNavigationKey, isWithinContainer } from "$lib/predicate";
import { useDOMTraversal } from "$lib/hooks";
import { tick } from "svelte";

export function handleAriaControls(panel: ElementBinder): Toggleable.Plugin {
	return function (element) {
		return panel.finalName.subscribe((name) => {
			if (name) element.setAttribute("aria-controls", name);
			else element.removeAttribute("aria-controls");
		});
	};
}

export function handleAriaDisabled(button: ElementBinder): Toggleable.Plugin {
	return function (element) {
		return button.disabled.subscribe((isDisabled) => {
			if (isDisabled) element.ariaDisabled = "true";
			element.ariaDisabled = null;
		});
	};
}

export const handleAriaExpanded: Toggleable.Plugin = function (element) {
	return this.isOpen.subscribe((isOpen) => {
		element.ariaExpanded = "" + isOpen;
	});
};

export function handleAriaLabelledby(button: ElementBinder): Toggleable.Plugin {
	return function (element) {
		return button.finalName.subscribe((name) => {
			if (name) element.setAttribute("aria-labelledby", name);
			else element.removeAttribute("aria-labelledby");
		});
	};
}

export const useCloseClickOutside: Toggleable.Plugin = function () {
	return useWindowListener("click", ({ target }) => {
		if (this.isClosed || !isHTMLElement(target) || this.isWithinElements(target)) return;
		this.handleClose(target);
	});
};

export const useCloseEscapeKey: Toggleable.Plugin = function () {
	return useWindowListener("keydown", ({ code }) => {
		if (this.isClosed || code !== "Escape") return;
		this.handleClose();
	});
};

export const useCloseFocusLeave: Toggleable.Plugin = function (panel) {
	return useWindowListener("focusin", ({ target }) => {
		if (this.isClosed || target === document || target === window || !isHTMLElement(target)) return;
		if (this.isFocusForced.value && !isWithinContainer(panel, target))
			return this.handleClose(target);
		if (this.isWithinElements(target)) return;
		this.handleClose(target);
	});
};

export function useFocusKeep(panel: HTMLElement) {
	return useListener(panel, "keydown", (event) => {
		if (event.code === "Tab") event.preventDefault();
	});
}

export const useHidePanelFocusOnClose: Toggleable.Plugin = function (panel) {
	const elements = useDOMTraversal(panel, isFocusable);
	const tabIndexes = elements.map(({ tabIndex }) => tabIndex);
	return this.isOpen.subscribe((isOpen) => {
		if (isOpen) {
			elements.forEach((element, index) => {
				element.tabIndex = tabIndexes[index];
			});
		} else {
			elements.forEach((element) => (element.tabIndex = -1));
		}
	});
};

export function useNavigationStarter(nav: Navigation): Toggleable.Plugin {
	return function (button) {
		const open = async (act: () => void) => {
			this.handleOpen();
			await tick();
			act();
		};
		return useListener(button, "keydown", async (event) => {
			if (!isNavigationKey(event.code)) return;
			switch (event.code) {
				case "ArrowDown":
					if (nav.isVertical.value) return open(() => nav.goFirst());
				case "ArrowUp":
					if (nav.isVertical.value) return open(() => nav.goLast());
			}
		});
	};
}

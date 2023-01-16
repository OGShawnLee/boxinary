import type { Navigation } from "$lib/stores";
import type { Navigable, Plugin } from "$lib/types";
import { useCleanup, useListener, useWindowListener } from "$lib/hooks";
import { isDisabled, isHTMLElement, isNavigationKey } from "$lib/predicate";

export const handleAriaOrientation: Plugin<Navigation> = function (panel) {
	return this.isVertical.subscribe((isVertical) => {
		panel.ariaOrientation = isVertical ? "vertical" : "horizontal";
	});
};

export const handleNavigation: Navigable.Handler = function (event) {
	const isNavigationRoot = event.target === event.currentTarget;
	const isNavigationElement =
		isNavigationRoot || (isHTMLElement(event.target) && this.isNavigationElement(event.target));
	if (!this.isGlobal.value && !isNavigationElement) return;

	if (!this.isFocusEnabled.value && this.isManual.value && event.code === "Enter")
		this.set(this.manualIndex.value);

	if (!isNavigationKey(event.code)) return;
	switch (event.code) {
		case "ArrowDown":
		case "ArrowRight":
		case "End":
			if (event.code === "End" && this.isGlobal.value) return;
			event.preventDefault();
			return this.handleNextKey(event.code, event.ctrlKey);
		case "ArrowLeft":
		case "ArrowUp":
		case "Home":
			if (event.code === "Home" && this.isGlobal.value) return;
			event.preventDefault();
			return this.handleBackKey(event.code, event.ctrlKey);
	}
};

export const useKeyMatch: Plugin<Navigation> = function (element) {
	return useCleanup(
		useListener(element, "keydown", ({ key }) => {
			key = key.toLowerCase();
			const index = this.findIndex((element) => {
				if (isDisabled(element)) return;
				return element.textContent?.toLowerCase().trim().startsWith(key);
			});
			if (index > -1) this.interact(index, false);
		})
	);
};

export const useResetOnLeave: Plugin<Navigation> = function () {
	return useCleanup(
		useWindowListener("click", (event) => {
			if (!isHTMLElement(event.target) || this.isWithin(event.target)) return;
			this.index.set(0);
		}),
		useWindowListener("focusin", (event) => {
			if (!isHTMLElement(event.target) || this.isWithin(event.target)) return;
			this.index.set(0);
		})
	);
};

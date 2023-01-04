import type { Navigation } from "$lib/stores";
import type { Navigable, Plugin } from "$lib/types";
import { useCleanup, useWindowListener } from "$lib/hooks";
import { isHTMLElement, isNavigationKey } from "$lib/predicate";

export const handleNavigation: Navigable.Handler = function (event) {
	const isNavigationElement = isHTMLElement(event.target) && this.isNavigationElement(event.target);
	if (!isNavigationKey(event.code) || (!this.isGlobal.value && !isNavigationElement)) return;
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

import type { Navigation } from "$lib/stores";
import type { Navigable, Plugin } from "$lib/types";
import { useCleanup, useListener, useWindowListener } from "$lib/hooks";
import { isDisabled, isHTMLElement, isNavigationKey } from "$lib/predicate";
import { isString, isWhitespace } from "@boxinary/predicate-core";

export const handleNavigation: Navigable.Handler = function (event) {
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

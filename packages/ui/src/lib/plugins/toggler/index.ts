import type { Toggleable } from "$lib/types";
import { useWindowListener } from "$lib/hooks";
import { isHTMLElement, isWithinContainer } from "$lib/predicate";

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

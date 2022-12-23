import type { SToggler } from "$lib/types";
import { useWindowListener } from "$lib/hooks";
import { isHTMLElement, isWithinContainer } from "$lib/predicate";

export const useCloseClickOutside: SToggler.Plugin = function (panel) {
	return useWindowListener("click", ({ target }) => {
		if (this.isClosed || !isHTMLElement(target) || this.isWithinElements(target)) return;
		this.handleClose(target);
	});
};

export const useCloseEscapeKey: SToggler.Plugin = function () {
	return useWindowListener("keydown", ({ code, target }) => {
		if (this.isClosed || code !== "Escape") return;
		this.handleClose();
	});
};

export const useCloseFocusLeave: SToggler.Plugin = function (panel) {
	return useWindowListener("focusin", ({ target }) => {
		if (this.isClosed || target === document || target === window || !isHTMLElement(target)) return;
		if (this.isFocusForced.value && !isWithinContainer(panel, target))
			return this.handleClose(target);
		if (this.isWithinElements(target)) return;
		this.handleClose(target);
	});
};

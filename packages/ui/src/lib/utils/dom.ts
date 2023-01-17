import type { Nullable } from "$lib/types";
import { isFocusable, isHTMLElement, isWithinContainer } from "$lib/predicate";

function findElement(
	container: HTMLElement,
	isTargetElement: (child: HTMLElement) => boolean
): HTMLElement | undefined {
	if (!container.hasChildNodes) return;
	const children = container.children;
	for (const child of children) {
		if (!isHTMLElement(child)) continue;
		if (isTargetElement(child)) return child;
		const element = findElement(child, isTargetElement);
		if (element) return element;
	}
}

export function focusFirstChildElement(
	container: HTMLElement,
	config: {
		fallback?: Nullable<HTMLElement>;
		initialFocus?: Nullable<HTMLElement>;
	} = {}
) {
	const { fallback, initialFocus } = config;
	if (initialFocus && isFocusable(initialFocus) && isWithinContainer(container, initialFocus))
		return initialFocus.focus();
	const child = findElement(container, isFocusable);
	if (child) child.focus();
	else fallback?.focus();
}

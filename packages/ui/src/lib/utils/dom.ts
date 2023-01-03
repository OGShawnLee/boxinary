import type { Nullable } from "$lib/types";
import { isFocusable, isHTMLElement } from "$lib/predicate";

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
	configuration: {
		fallback?: Nullable<HTMLElement>;
	}
) {
	const child = findElement(container, isFocusable);
	if (child) child.focus();
	else configuration.fallback?.focus();
}

import type { NavigationKey } from "$lib/types";

const NAVIGATION_KEY: Record<NavigationKey, boolean> = {
	ArrowDown: true,
	ArrowLeft: true,
	ArrowRight: true,
	ArrowUp: true,
	End: true,
	Home: true
};

const VOID_TAGS = Object.freeze({
	area: true,
	base: true,
	br: true,
	col: true,
	command: true,
	embed: true,
	hr: true,
	img: true,
	input: true,
	keygen: true,
	link: true,
	meta: true,
	param: true,
	source: true,
	track: true,
	wbr: true
});

export function isDisabled(element: HTMLElement) {
	return element.hasAttribute("disabled");
}

export function isFocusable(element: HTMLElement | EventTarget) {
	return isHTMLElement(element) && !isDisabled(element) && element.tabIndex >= -1;
}

export function isHTMLElement(value: unknown): value is HTMLElement {
	return value instanceof HTMLElement;
}

export function isNavigationKey(code: string): code is NavigationKey {
	return code in NAVIGATION_KEY;
}

export function isVoidElement(tagName: string) {
	return tagName in VOID_TAGS;
}

export function isWithinContainer(container: Node | Array<Node>, element: Node): boolean {
	if (container instanceof Node) return container.contains(element);
	return container.some((container) => isWithinContainer(container, element));
}

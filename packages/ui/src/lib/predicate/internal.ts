import type { ReadableRef, Ref } from "$lib/types";
import { ElementBinder } from "$lib/core";
import { isStore, isWritable } from "@boxinary/predicate-svelte";

export function isElementBinder(value: unknown): value is ElementBinder {
	return value instanceof ElementBinder;
}

export function isReadableRef(value: unknown): value is ReadableRef<any> {
	return isStore(value);
}

export function isRef(value: unknown): value is Ref<any> {
	return isWritable(value);
}

export function isValidHTMLElementID(id: string) {
	const regex = /^[A-Za-z]+[\w\-\:\.]*$/;
	return regex.test(id);
}

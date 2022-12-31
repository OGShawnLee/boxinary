import type { ActionComponent, Collectable } from "$lib/types";
import type { Unsubscriber } from "svelte/store";
import { ElementBinder } from "$lib/core";
import { useGarbageCollector } from "$lib/hooks";
import { isFunction, isObject } from "@boxinary/predicate-core";

export function defineActionComponent<T = void>(config: {
	binder?: ElementBinder;
	id: string | undefined;
	name: string;
	isShowing?: boolean;
	onInit?: (context: { binder: ElementBinder; name: string }) => T;
	onMount: (context: {
		binder: ElementBinder;
		element: HTMLElement;
		name: string;
	}) =>
		| { onActionComponent?: () => Collectable; base?: Collectable }
		| Unsubscriber[]
		| Unsubscriber
		| void;
}): ActionComponent<T> {
	const { binder = new ElementBinder(), name, onMount, id, isShowing = true } = config;
	if (isShowing) {
		binder.name.value = name;
		binder.id.value = id;
	}
	const context = config.onInit?.({ binder, name }) as T;
	return {
		context,
		binder: binder,
		action: (element: HTMLElement) => {
			const destroy = onMount?.({ binder, element, name });
			return {
				destroy: useGarbageCollector({
					beforeInit: () => binder.onMount(element, name),
					init: () => {
						if (Array.isArray(destroy) || isFunction(destroy)) return destroy;
						else if (isObject(destroy))
							return [binder.isUsingFragment.value && destroy.onActionComponent?.(), destroy.base];
					}
				})
			};
		}
	};
}

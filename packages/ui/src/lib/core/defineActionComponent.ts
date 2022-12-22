import type { Collectable } from "$lib/types";
import type { ElementBinder } from "./ElementBinder";
import { useGarbageCollector } from "$lib/hooks";
import { isObject } from "@boxinary/predicate-core";

export function defineActionComponent(config: {
	binder: ElementBinder;
	id: string | undefined;
	name: string;
	isShowing?: boolean;
	onMount: (context: {
		binder: ElementBinder;
		element: HTMLElement;
		name: string;
	}) => { onActionComponent?: () => Collectable; base?: Collectable } | void;
}) {
	const { binder, name, onMount, id, isShowing = true } = config;
	if (isShowing) {
		binder.name.value = name;
		binder.id.value = id;
	}
	return {
		binder: binder,
		action: (element: HTMLElement) => {
			const destroy = onMount?.({ binder, element, name });
			return {
				destroy: useGarbageCollector({
					beforeInit: () => binder.onMount(element, name),
					init: () => {
						if (isObject(destroy)) {
							return [binder.isUsingFragment.value && destroy.onActionComponent?.(), destroy.base];
						}
					}
				})
			};
		}
	};
}

import type { Collectable } from "$lib/types";
import type { Unsubscriber } from "svelte/store";
import { isArray, isFunction, isObject } from "@boxinary/predicate-core";

function free(collectable: Collectable) {
	if (isArray(collectable)) collectable.forEach(free);
	else if (isFunction(collectable)) collectable();
	else if (isObject(collectable, ["destroy"])) free(collectable);
}

export function useCleanup(...items: Collectable[]): Unsubscriber {
	return () => free(items);
}

export function useGarbageCollector(options: {
	afterInit?: () => Collectable | void;
	beforeInit?: () => Collectable | void;
	init: () => Collectable;
	beforeCollection?: () => void;
}): Unsubscriber {
	const { afterInit, beforeCollection, beforeInit, init } = options;
	const collectable: Collectable[] = [];

	const before = beforeInit?.();
	const toCollect = init();
	const after = afterInit?.();

	collectable.push(before, toCollect, after);
	return () => {
		beforeCollection?.();
		free(collectable);
	};
}

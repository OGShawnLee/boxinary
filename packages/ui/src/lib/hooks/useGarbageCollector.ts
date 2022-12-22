import type { Collectable } from "$lib/types";
import type { Unsubscriber } from "svelte/store";
import { isArray, isFunction, isObject } from "@boxinary/predicate-core";

function destroy(collectable: Collectable) {
	if (isArray(collectable)) collectable.forEach(destroy);
	else if (isFunction(collectable)) collectable();
	else if (isObject(collectable, ["destroy"])) destroy(collectable);
}

export default function useGarbageCollector(options: {
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
		destroy(collectable);
	};
}

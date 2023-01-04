import type ElementBinder from "./ElementBinder";
import { Hash } from "$lib/stores";
import { createDerivedRef } from "$lib/utils";
import { onDestroy } from "svelte";
import { useGarbageCollector } from "$lib/hooks";

export default function createComponentLabels() {
	const labels = new Hash<string, string | undefined>({ entries: false, keys: false });
	const finalName = createDerivedRef(labels.values, (labels) => {
		if (labels.length) return labels.join(" ");
	});

	function onInitLabel(name: string, id: string | undefined) {
		labels.set(name, id ?? name);
		onDestroy(labels.destroy(name));
	}

	function onMountLabel(name: string, binder: ElementBinder) {
		return useGarbageCollector({
			beforeCollection: () => {
				labels.set(name, undefined);
			},
			init: () =>
				binder.finalName.subscribe((id) => {
					labels.set(name, id);
				})
		});
	}

	return { finalName, onInitLabel, onMountLabel };
}

import { createReadableRef, ref } from "$lib/utils";
import { isString } from "@boxinary/predicate-core";
import { useGarbageCollector, usePair } from "$lib/hooks";
import { derived } from "svelte/store";
import { isValidHTMLElementID } from "$lib/predicate";

/*
	id: id provided by the user
	name: unique id provided by the library
	finalName: derived of id and name -> if id is nullish or invalid it defaults to name 
*/

export default class ElementBinder {
	protected readonly node = ref<HTMLElement | undefined>(undefined);
	readonly name = ref<string | undefined>(undefined);
	readonly id = ref<string | undefined>(undefined);
	readonly isUsingFragment = ref(true);
	readonly finalName = derived([this.id, this.name], ([id, name]) => {
		return ElementBinder.getFinalName(id, name);
	});

	get element() {
		return createReadableRef(this.node);
	}

	onMount(this: ElementBinder, element: HTMLElement, name: string) {
		this.node.value = element;
		this.name.value = name;
		this.id.value = element.id;
		return useGarbageCollector({
			beforeCollection: () => {
				this.node.value = undefined;
				this.name.value = undefined;
				this.id.value = undefined;
			},
			init: () => [
				this.isUsingFragment.value &&
					usePair(this.element, this.finalName, (element, id) => {
						if (element && id) element.id = id;
					})
			]
		});
	}

	static getFinalName(id: string | undefined, name: string | undefined) {
		return isString(id) && isValidHTMLElementID(id) ? id : name;
	}
}

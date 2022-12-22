import type { ReadableRef, Ref } from "$lib/types";
import type { StartStopNotifier } from "svelte/store";
import { writable } from "svelte/store";

export function createReadableRef<T>(ref: Ref<T>): ReadableRef<T> {
	return {
		subscribe: ref.subscribe,
		get value() {
			return ref.value;
		}
	};
}

export function ref<T>(initialValue: T, start?: StartStopNotifier<T>): Ref<T> {
	const store = writable(initialValue, start);
	return {
		subscribe: store.subscribe,
		get value() {
			return initialValue;
		},
		set value(value: T) {
			initialValue = value;
			store.set(initialValue);
		},
		set(value: T) {
			initialValue = value;
			store.set(initialValue);
		},
		update(callback: (currentValue: T) => T) {
			initialValue = callback(initialValue);
			store.set(initialValue);
		}
	};
}

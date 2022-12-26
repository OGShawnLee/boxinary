import type { Unsubscriber } from "svelte/store";
import { ref } from "$lib/utils";

export default class Hash<K, V> {
	protected readonly hash = ref(new Map<K, V>());

	get size() {
		return this.hash.value.size;
	}

	get subscribe() {
		return this.hash.subscribe;
	}

	delete(this: Hash<K, V>, key: K) {
		let isDeleted = this.has(key);
		this.hash.update((hash) => {
			return hash.delete(key), hash;
		});
		return isDeleted;
	}

	destroy(this: Hash<K, V>, key: K): Unsubscriber {
		return () => this.delete(key);
	}

	get(this: Hash<K, V>, key: K) {
		return this.hash.value.get(key);
	}

	getSafe(this: Hash<K, V>, key: K) {
		if (this.has(key)) return this.get(key) as V;
		throw new Error(`Unable to Get ${key}`);
	}

	has(this: Hash<K, V>, key: K) {
		return this.hash.value.has(key);
	}

	set(this: Hash<K, V>, key: K, value: V) {
		this.hash.update((hash) => hash.set(key, value));
		return this.hash.value.size;
	}

	update(this: Hash<K, V>, key: K, callback: (value: V) => V) {
		this.hash.update((hash) => {
			const value = hash.get(key);
			return value ? hash.set(key, callback(value)) : hash;
		});
	}
}

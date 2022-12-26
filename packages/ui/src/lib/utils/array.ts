export function findIndex<T>(
	arr: T[],
	fn: (element: T, index: number, arr: T[]) => unknown,
	index = 0
) {
	for (index; index < arr.length; index++) {
		const element = arr[index];
		if (fn(element, index, arr)) return index;
	}
	return -1;
}

export function findLastIndex<T>(
	arr: T[],
	fn: (element: T, index: number, arr: T[]) => unknown,
	index = arr.length - 1
) {
	for (index; index >= 0; index--) {
		const element = arr[index];
		if (fn(element, index, arr)) return index;
	}
	return -1;
}

export function toUnique<T>(arr: T[]) {
	const cache = new Set<T>();
	return arr.reduce((cleared, item) => {
		if (cache.has(item)) return cleared;
		cache.add(item);
		cleared.push(item);
		return cleared;
	}, [] as T[]);
}

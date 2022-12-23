export function toUnique<T>(arr: T[]) {
	const cache = new Set<T>();
	return arr.reduce((cleared, item) => {
		if (cache.has(item)) return cleared;
		cache.add(item);
		cleared.push(item);
		return cleared;
	}, [] as T[]);
}

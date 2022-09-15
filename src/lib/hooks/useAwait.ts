export async function useAwait<T, E = unknown>(
	callback: () => T | Promise<T>
): Promise<[T, null] | [null, E]> {
	try {
		const result = await callback();
		return [result, null];
	} catch (error) {
		return [null, error as E];
	}
}

export async function useAwaitError<E = unknown>(
	callback: () => void | Promise<void>
): Promise<E | null> {
	try {
		await callback();
		return null;
	} catch (error) {
		return error as E;
	}
}

export function shuffle<T>(array: Array<T>) {
	for (let index = 0; index < array.length; index++) {
		const random = Math.floor(Math.random() * (index + 1));
		[array[index], array[random]] = [array[random], array[index]];
	}
	return array;
}

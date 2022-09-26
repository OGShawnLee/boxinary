export function capitalise(str: string) {
	return str
		.split(" ")
		.map((str) => str[0].toUpperCase() + str.substring(1))
		.join(" ");
}

export function defineMessage(message: string) {
	return JSON.stringify({ message });
}

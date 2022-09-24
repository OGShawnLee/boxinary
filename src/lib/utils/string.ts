export function capitalise(str: string) {
	return str
		.split(" ")
		.map((str) => str[0].toUpperCase() + str.substring(1))
		.join(" ");
}

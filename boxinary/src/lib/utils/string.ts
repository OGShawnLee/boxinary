export function capitalise(str: string) {
	return str
		.split(" ")
		.map((str) => str[0].toUpperCase() + str.substring(1))
		.join(" ");
}

export function defineMessage(message: string) {
	return JSON.stringify({ message });
}

export function possessive(name: string) {
	return name.toLowerCase().endsWith("s") ? name + "'" : name + "'s";
}

export function plural(str: string, count: number) {
	return count > 1 ? str + "s" : str;
}

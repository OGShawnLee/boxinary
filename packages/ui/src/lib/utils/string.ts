export function capitalise(str: string) {
	return str[0].toUpperCase() + str.substring(1);
}

export function clearString(str: string) {
	return str.trim().replace(/\s\s+/g, " ");
}

export function coolString(str: string) {
	return str.trim().replace(/\s+/g, "-").split("-").map(capitalise).join("-");
}
export function separateWithDashes(str: string) {
	return clearString(str).replace(/\s/, "-");
}

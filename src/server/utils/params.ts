import { isEmpty, isNullish } from "malachite-ui/predicate";
import { error } from "@sveltejs/kit";

export function handleNumber(string: string | null, stringName: string) {
	if (isNullish(string) || isEmpty(string))
		throw error(400, { message: `${stringName} is required!` });
	const number = +string;
	if (isNaN(number)) throw error(400, { message: `Invalid ${stringName}, it must be a number.` });
	return number;
}

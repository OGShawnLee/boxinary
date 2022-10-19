import { isEmpty, isNullish } from "malachite-ui/predicate";
import { error } from "@sveltejs/kit";

export function handleBigint(string: string | null, stringName: string) {
	if (isNullish(string) || isEmpty(string))
		throw error(400, { message: `${stringName} is required!` });
	try {
		return BigInt(string);
	} catch {
		throw error(400, { message: `Invalid ${stringName}, it must be a number.` });
	}
}

export function toBigint(string: string | null) {
	if (isNullish(string) || isEmpty(string)) return null;
	try {
		return BigInt(string);
	} catch {
		return null;
	}
}

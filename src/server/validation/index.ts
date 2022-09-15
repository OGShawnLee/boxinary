import { isInterface, isNumber, isString } from "malachite-ui/predicate";
import { compare } from "bcrypt";
import { useAwait } from "$lib/hooks";

export function isIncorrectPassword(data: string | Buffer, password: string) {
	return useAwait(async () => {
		const isCorrectPassword = await compare(data, password);
		return !isCorrectPassword;
	});
}

export function isJWTPayloadState(val: unknown): val is JWTPayloadState {
	return isInterface<JWTPayloadState>(val, { id: isNumber, email: isString, name: isString });
}

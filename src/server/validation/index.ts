import { ACCESS_TOKEN } from "$env/static/private";
import { verify } from "jsonwebtoken";
import { isEmpty } from "malachite-ui/predicate";
import { isInterface, isNumber, isString } from "malachite-ui/predicate";
import { compare } from "bcrypt";
import { useAwait } from "$lib/hooks";

export function isIncorrectPassword(data: string | Buffer, password: string) {
	return useAwait(async () => {
		const isCorrectPassword = await compare(data, password);
		return !isCorrectPassword;
	});
}
export async function isLoggedIn(authStateCookie: string | void) {
	if (authStateCookie === undefined || isEmpty(authStateCookie)) return false;
	const authState = verify(authStateCookie, ACCESS_TOKEN);
	return isJWTPayloadState(authState);
}

export function isJWTPayloadState(val: unknown): val is JWTPayloadState {
	return isInterface<JWTPayloadState>(val, { id: isNumber, email: isString, name: isString });
}

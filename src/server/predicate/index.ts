import db from "$lib/db";
import { ACCESS_TOKEN } from "$env/static/private";
import { verify } from "jsonwebtoken";
import { isEmpty, isInterface, isString, isNullish } from "malachite-ui/predicate";
import { compare } from "bcrypt";
import { useAwait } from "$lib/hooks";
import type { Definition, User } from "@prisma/client";

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

export function isNotDefinitionOwner(did: Definition["id"], uid: User["id"]) {
	return useAwait(async () => {
		const definition = db.definition.findFirst({ where: { id: did, userId: uid } });
		return isNullish(definition);
	});
}

export function isJWTPayloadState(val: unknown): val is JWTPayloadState {
	return isInterface<JWTPayloadState>(val, {
		id: isString,
		email: isString,
		name: isString,
		displayName: isString
	});
}

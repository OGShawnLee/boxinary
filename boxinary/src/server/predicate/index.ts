import type { Definition, User } from "@prisma/client";
import type { Cookies } from "@sveltejs/kit";
import db from "$lib/db";
import isEmail from "validator/lib/isEmail";
import { ACCESS_TOKEN, AUTH_COOKIE } from "$env/static/private";
import { verify } from "jsonwebtoken";
import { isInterface, isNullish, isString, isWhitespace } from "@boxinary/predicate-core";
import { compare } from "bcrypt";
import { useAwait } from "$lib/hooks";

export function isIncorrectPassword(data: string | Buffer, password: string) {
	return useAwait(async () => {
		const isCorrectPassword = await compare(data, password);
		return !isCorrectPassword;
	});
}

export function isInvalidEmail(email: string) {
	return !isEmail(email);
}

export async function isLoggedIn(cookies: Cookies) {
	const authStateCookie = cookies.get(AUTH_COOKIE);
	if (isNullish(authStateCookie) || isWhitespace(authStateCookie)) return false;
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

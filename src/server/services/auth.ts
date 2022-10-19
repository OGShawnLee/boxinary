import type { User } from "@prisma/client";
import { ACCESS_TOKEN, AUTH_COOKIE } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";
import { error, redirect } from "@sveltejs/kit";
import { verify } from "jsonwebtoken";
import { isEmpty, isNullish } from "malachite-ui/predicate";
import { useAwait } from "$lib/hooks";
import { deleteAuthCookie } from "@server/utils";
import { isJWTPayloadState } from "@server/predicate";

export function getAuthToken(cookies: Cookies) {
	const token = cookies.get(AUTH_COOKIE);
	return token ? getUserJWTTokenPayload(token) : undefined;
}

export async function getUserJWTTokenPayload(authStateCookie: string) {
	const authState = verify(authStateCookie, ACCESS_TOKEN);
	if (isJWTPayloadState(authState)) return authState;
	throw new Error("Invalid Auth Token");
}

export async function handleAuth(
	cookies: Cookies,
	displayName: User["displayName"],
	isAction = false
) {
	const currentUser = await handleAuthState(cookies);
	const message = isAction ? "Action Denied" : "Access Denied";
	if (currentUser.displayName !== displayName) throw error(403, { message });
	return currentUser;
}

export async function handleAuthState(cookies: Cookies) {
	const authStateCookie = cookies.get(AUTH_COOKIE);
	if (isNullish(authStateCookie) || isEmpty(authStateCookie)) throw redirect(303, "/auth/sign-in");
	const [authState, err] = await useAwait(() => getUserJWTTokenPayload(authStateCookie));
	if (err || !authState) {
		deleteAuthCookie(cookies);
		throw redirect(303, "/auth/sign-in");
	}
	return authState;
}

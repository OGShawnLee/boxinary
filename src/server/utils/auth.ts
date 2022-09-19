import type { Cookies } from "@sveltejs/kit";
import { AUTH_COOKIE, ACCESS_TOKEN } from "$env/static/private";
import { sign } from "jsonwebtoken";

export function createUserJWT(configuration: JWTPayloadState & { expiresIn?: string | number }) {
	const { id, name, email, displayName, expiresIn = "7d" } = configuration;
	return sign({ id, name, email, displayName }, ACCESS_TOKEN, { expiresIn });
}

export function deleteAuthCookie(cookies: Cookies) {
	cookies.set(AUTH_COOKIE, "", { expires: new Date(Date.now() - 3600), httpOnly: true, path: "/" });
}

import type { Cookies } from "@sveltejs/kit";
import { AUTH_COOKIE, ACCESS_TOKEN } from "$env/static/private";
import { sign } from "jsonwebtoken";

export function createUserJWT(configuration: {
	id: number;
	name: string;
	email: string;
	expiresIn?: string | number;
}) {
	const { id, name, email, expiresIn = "7d" } = configuration;
	return sign({ id, name, email }, ACCESS_TOKEN, { expiresIn });
}

export function deleteAuthCookie(cookies: Cookies) {
	cookies.set(AUTH_COOKIE, "", { expires: new Date(Date.now() - 3600), httpOnly: true, path: "/" });
}

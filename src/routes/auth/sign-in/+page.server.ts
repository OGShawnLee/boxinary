import type { Actions, ServerLoad } from "@sveltejs/kit";
import db from "$lib/db";
import { ACCESS_TOKEN, AUTH_COOKIE } from "$env/static/private";
import { verify } from "jsonwebtoken";
import { error, invalid, redirect } from "@sveltejs/kit";
import { isEmpty } from "malachite-ui/predicate";
import { useAwait } from "$lib/hooks";
import { createUserJWT, deleteAuthCookie } from "@root/server/utils";
import { isJWTPayloadState, isIncorrectPassword } from "@root/server/validation";

export const load: ServerLoad = async ({ cookies }) => {
	const authStateCookie = cookies.get(AUTH_COOKIE);
	if (authStateCookie === undefined || isEmpty(authStateCookie)) return;
	const [authState, err] = await useAwait(() => verify(authStateCookie, ACCESS_TOKEN));
	if (err) {
		deleteAuthCookie(cookies);
		return error(400, { message: "Invalid Auth Token" });
	}
	if (isJWTPayloadState(authState)) throw redirect(303, "/home");
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get("email");
		const password = data.get("password");

		if (typeof email !== "string") return invalid(400, { email: { invalid: true } });
		if (isEmpty(email)) return invalid(400, { email: { missing: true } });

		if (typeof password !== "string") return invalid(400, { email, password: { invalid: true } });
		if (isEmpty(password)) return invalid(400, { email, password: { missing: true } });

		const [foundUser, err] = await useAwait(() => db.user.findFirst({ where: { email } }));
		if (err) return error(500, { message: "Unable to Check User Email" });
		if (!foundUser) return invalid(400, { email: { "not-found": true } });

		const [isWrongPassword, passwordErr] = await isIncorrectPassword(password, foundUser.password);
		if (isWrongPassword) return invalid(400, { email, password: { incorrect: true } });
		if (passwordErr) return error(500, { message: "Unable to Check Password" });

		const token = createUserJWT({
			id: foundUser.id,
			name: foundUser.name,
			email: foundUser.email,
			displayName: foundUser.displayName
		});
		cookies.set(AUTH_COOKIE, token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true, path: "/" });
		return redirect(303, "/home");
	}
};

import type { Actions, ServerLoad } from "@sveltejs/kit";
import db from "$lib/db";
import { ACCESS_TOKEN, AUTH_COOKIE } from "$env/static/private";
import { error, fail, redirect } from "@sveltejs/kit";
import { isWhitespace } from "@boxinary/predicate-core";
import { genSalt, hash } from "bcrypt";
import { useAwait, useAwaitError } from "$lib/hooks";
import { verify } from "jsonwebtoken";
import { deleteAuthCookie } from "@server/utils";
import { isInvalidEmail, isJWTPayloadState } from "@server/predicate";

export const load: ServerLoad = async ({ cookies }) => {
	const authStateCookie = cookies.get(AUTH_COOKIE);
	if (authStateCookie === undefined || isWhitespace(authStateCookie)) return;
	const [authState, err] = await useAwait(() => verify(authStateCookie, ACCESS_TOKEN));
	if (err) {
		deleteAuthCookie(cookies);
		return error(400, { message: "Invalid Auth Token" });
	}
	if (isJWTPayloadState(authState)) throw redirect(303, "/home");
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get("name");
		const displayName = data.get("display-name");
		const email = data.get("email");
		const password = data.get("password");

		if (typeof name !== "string") return fail(400, { name: { invalid: true }, displayName, email });
		if (isWhitespace(name)) return fail(400, { name: { missing: true }, displayName, email });

		if (typeof displayName !== "string")
			return fail(400, { name, displayName: { invalid: true }, email });
		if (isWhitespace(displayName))
			return fail(400, { name, displayName: { missing: true }, email });

		if (typeof email !== "string")
			return fail(400, { name, displayName, email: { invalid: true } });
		if (isWhitespace(email)) return fail(400, { name, displayName, email: { missing: true } });
		if (isInvalidEmail(email)) return fail(400, { name, displayName, email: { invalid: true } });

		if (typeof password !== "string")
			return fail(400, { name, displayName, email, password: { invalid: true } });
		if (isWhitespace(password))
			return fail(400, { name, displayName, email, password: { missing: true } });

		const [isEmailTaken, err] = await useAwait(() => db.user.findFirst({ where: { email } }));
		if (isEmailTaken) return fail(400, { name, displayName, email: { duplicate: true } });
		if (err) throw error(500, { message: "Unable to Verify Credentials" });

		const createError = await useAwaitError(async () => {
			const passwordHash = await hash(password, await genSalt(10));
			await db.user.create({ data: { name, displayName, email, password: passwordHash } });
		});
		if (createError) throw error(500, { message: "Unable to Sign Up" });
		throw redirect(300, "/auth/sign-in");
	}
};

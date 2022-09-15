import type { Actions } from "@sveltejs/kit";
import db from "$lib/db";
import { error, invalid, redirect } from "@sveltejs/kit";
import { isEmpty } from "malachite-ui/predicate";
import { genSalt, hash } from "bcrypt";
import { useAwait, useAwaitError } from "$lib/hooks";

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get("name");
		const displayName = data.get("display-name");
		const email = data.get("email");
		const password = data.get("password");

		if (typeof name !== "string")
			return invalid(400, { name: { invalid: true }, displayName, email, password });
		if (isEmpty(name))
			return invalid(400, { name: { missing: true }, displayName, email, password });

		if (typeof displayName !== "string")
			return invalid(400, { name, displayName: { invalid: true }, email, password });
		if (isEmpty(displayName))
			return invalid(400, { name, displayName: { missing: true }, email, password });

		if (typeof email !== "string")
			return invalid(400, { name, displayName, password, email: { invalid: true } });
		if (isEmpty(email))
			return invalid(400, { name, displayName, password, email: { missing: true } });

		if (typeof password !== "string")
			return invalid(400, { name, displayName, email, password: { invalid: true } });
		if (isEmpty(password))
			return invalid(400, { name, displayName, email, password: { missing: true } });

		const [isEmailTaken, err] = await useAwait(() => db.user.findFirst({ where: { email } }));
		if (isEmailTaken) return invalid(400, { name, displayName, email: { duplicate: true } });
		if (err) return error(500, { message: "Unable to Verify Credentials" });

		const createError = await useAwaitError(async () => {
			const passwordHash = await hash(password, await genSalt(10));
			await db.user.create({ data: { name, displayName, email, password: passwordHash } });
		});
		return createError
			? error(500, { message: "Unable to Sign Up" })
			: redirect(300, "/auth/sign-in");
	}
};
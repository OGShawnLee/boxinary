import type { Actions, PageServerLoad } from "./$types";
import { createCollection, handleAuth } from "@server/services";
import { error, fail, redirect } from "@sveltejs/kit";
import { isWhitespace } from "@boxinary/predicate-core";

export const load: PageServerLoad = async ({ cookies, params }) => {
	await handleAuth(cookies, params.displayName);
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const { id, displayName } = await handleAuth(cookies, params.displayName, true);

		const data = await request.formData();
		const name = data.get("name");
		const description = data.get("description");
		const details = data.get("details");

		if (typeof name !== "string")
			return fail(400, { name: { invalid: true }, description, details });
		if (isWhitespace(name)) return fail(400, { name: { missing: true }, description, details });

		if (description) {
			if (typeof description !== "string")
				return fail(400, { description: { invalid: true }, name, details });
			if (isWhitespace(description))
				return fail(400, { description: { missing: true }, name, details });
		}

		if (details) {
			if (typeof details !== "string")
				return fail(400, { details: { invalid: true }, name, description });
			if (isWhitespace(details))
				return fail(400, { details: { missing: true }, name, description });
		}

		const [collection] = await createCollection(id, { name, description, details });
		if (collection) throw redirect(303, `/${displayName}/collections/${collection.id}`);
		throw error(500, { message: "Unable to Create Collection" });
	}
};

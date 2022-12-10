import type { Actions, PageServerLoad } from "./$types";
import { handleAuth, updateCollection } from "@server/services";
import { error, fail, redirect } from "@sveltejs/kit";
import { isWhitespace } from "@boxinary/predicate-core";
import { handleBigint } from "@server/utils";

export const load: PageServerLoad = async ({ cookies, params }) => {
	await handleAuth(cookies, params.displayName);
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const collectionid = handleBigint(params.id, "collection-id");
		const currentUser = await handleAuth(cookies, params.displayName);

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

		const [collection] = await updateCollection(collectionid, { name, description, details });
		if (collection) throw redirect(303, `/${currentUser.displayName}/collections/${collection.id}`);
		throw error(500, { message: "Unable to Update Collection" });
	}
};

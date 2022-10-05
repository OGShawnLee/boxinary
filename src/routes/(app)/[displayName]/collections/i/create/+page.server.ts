import type { Actions, PageServerLoad } from "./$types";
import { createCollection, findUserCoreData, handleAuthState } from "@server/services";
import { error, invalid, redirect } from "@sveltejs/kit";
import { isEmpty, isNullish } from "malachite-ui/predicate";

export const load: PageServerLoad = async ({ cookies, parent }) => {
	const { id } = await handleAuthState(cookies);
	const { foundUser } = await parent();
	if (id !== foundUser.id) throw error(403, { message: "Access Denied" });
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const { id, displayName } = await handleAuthState(cookies);
		const [targetUser, err] = await findUserCoreData(params.displayName);
		if (err) throw error(500, { message: "Unable to Verify User Authentication" });
		if (isNullish(targetUser)) throw error(404, { message: "User not Found" });

		if (id !== targetUser.id) throw error(403, { message: "Action Forbidden" });

		const data = await request.formData();
		const name = data.get("name");
		const shortDescription = data.get("short-description");
		const longDescription = data.get("long-description");

		if (typeof name !== "string")
			return invalid(400, { name: { invalid: true }, shortDescription, longDescription });
		if (isEmpty(name))
			return invalid(400, { name: { missing: true }, shortDescription, longDescription });

		if (shortDescription) {
			if (typeof shortDescription !== "string")
				return invalid(400, { shortDescription: { invalid: true }, name, longDescription });
			if (isEmpty(shortDescription))
				return invalid(400, { shortDescription: { missing: true }, name, longDescription });
		}

		if (longDescription) {
			if (typeof longDescription !== "string")
				return invalid(400, { longDescription: { invalid: true }, name, shortDescription });
			if (isEmpty(longDescription))
				return invalid(400, { longDescription: { missing: true }, name, shortDescription });
		}

		const [collection] = await createCollection(id, { name, shortDescription, longDescription });
		if (collection) throw redirect(303, `/${displayName}/collections/${collection.id}`);
		throw error(500, { message: "Unable to Create Collection" });
	}
};

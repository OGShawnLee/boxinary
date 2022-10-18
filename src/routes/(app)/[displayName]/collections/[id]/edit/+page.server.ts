import type { Actions, PageServerLoad } from "./$types";
import { findUserCoreData, handleAuthState, updateCollection } from "@server/services";
import { error, invalid, redirect } from "@sveltejs/kit";
import { isEmpty, isNullish } from "malachite-ui/predicate";
import { handleBigint } from "@server/utils";

export const load: PageServerLoad = async ({ cookies, parent }) => {
	const { id } = await handleAuthState(cookies);
	const { foundUser } = await parent();
	if (id !== foundUser.id) throw error(403, { message: "Access Denied" });
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const collectionid = handleBigint(params.id, "collection-id");

		const currentUser = await handleAuthState(cookies);
		const [targetUser, err] = await findUserCoreData(params.displayName);
		if (err) throw error(500, { message: "Unable to Verify User Authentication" });
		if (isNullish(targetUser)) throw error(404, { message: "User not Found" });

		if (targetUser.id !== currentUser.id) throw error(404, { message: "Action Forbidden" });

		const data = await request.formData();
		const name = data.get("name");
		const description = data.get("description");
		const details = data.get("details");

		if (typeof name !== "string")
			return invalid(400, { name: { invalid: true }, description, details });
		if (isEmpty(name)) return invalid(400, { name: { missing: true }, description, details });

		if (description) {
			if (typeof description !== "string")
				return invalid(400, { description: { invalid: true }, name, details });
			if (isEmpty(description))
				return invalid(400, { description: { missing: true }, name, details });
		}

		if (details) {
			if (typeof details !== "string")
				return invalid(400, { details: { invalid: true }, name, description });
			if (isEmpty(details)) return invalid(400, { details: { missing: true }, name, description });
		}

		const [collection] = await updateCollection(collectionid, { name, description, details });
		if (collection) throw redirect(303, `/${currentUser.displayName}/collections/${collection.id}`);
		throw error(500, { message: "Unable to Update Collection" });
	}
};

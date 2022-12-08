import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import {
	createBookmark,
	deleteBookmark,
	findBookmark,
	findDefinitionId,
	handleAuthState
} from "@server/services";
import { isNullish } from "@boxinary/predicate-core";

export const actions: Actions = {
	bookmark: async ({ cookies, params: { displayName, name }, url }) => {
		const { id } = await handleAuthState(cookies);
		const [definition_id] = await findDefinitionId(displayName, name);
		if (definition_id === undefined) throw error(404, { message: "Definition not Found." });
		if (definition_id === null) throw error(500, { message: "Unable to Create Bookmark." });

		const location = url.searchParams.get("redirect-to") || url.pathname;

		const [isBookmarked, err] = await findBookmark(definition_id, id);
		if (err) throw error(500, { message: "Unable to Handle Bookmark." });
		if (isBookmarked) {
			const [isDeleted] = await deleteBookmark(definition_id, id);
			if (isDeleted) throw redirect(303, location);
			throw error(500, { message: "Unable to Delete Bookmark." });
		}

		const [bookmark] = await createBookmark(definition_id, id);
		if (isNullish(bookmark)) throw error(500, { message: "Unable to Create Bookmark." });
		throw redirect(303, location);
	}
};

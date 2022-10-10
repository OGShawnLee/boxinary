import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { createBookmark, findBookmark, getDefinitionId, handleAuthState } from "@server/services";
import { isNullish } from "malachite-ui/predicate";

export const actions: Actions = {
	bookmark: async ({ cookies, params: { displayName, name }, url }) => {
		const { id } = await handleAuthState(cookies);
		const [definition_id] = await getDefinitionId(displayName, name);
		if (definition_id === undefined) throw error(404, { message: "Definition not Found." });
		if (definition_id === null) throw error(500, { message: "Unable to Create Bookmark." });

		const [isBookmarked, err] = await findBookmark(definition_id, id);
		if (err) throw error(500, { message: "Unable to Create Bookmark." });
		if (isBookmarked) throw error(400, { message: "Definition is already Bookmarked." });

		const [bookmark] = await createBookmark(definition_id, id);
		if (isNullish(bookmark)) throw error(500, { message: "Unable to Create Bookmark." });
		const location = url.searchParams.get("redirect-to") || url.pathname;
		throw redirect(303, location);
	}
};

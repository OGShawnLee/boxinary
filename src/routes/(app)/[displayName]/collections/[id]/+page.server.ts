import type { Actions } from "./$types";
import { handleAuth } from "@server/services";
import { isNullish } from "malachite-ui/predicate";
import { error, redirect } from "@sveltejs/kit";
import { removeFromCollection } from "@server/services";
import { handleBigint } from "@server/utils";

export const actions: Actions = {
	remove: async ({ cookies, params, url }) => {
		const collectionid = handleBigint(params.id, "collection-id");
		const definitionid = handleBigint(url.searchParams.get("definition-id"), "definition-id");

		await handleAuth(cookies, params.displayName, true);
		const [definition, err] = await removeFromCollection({ collectionid, definitionid });
		if (err) throw error(500, { message: "Unable to Remove Definition from Collection." });
		if (isNullish(definition))
			throw error(404, { message: "Definition does not exist or not found in Collection." });

		const location = url.searchParams.get("redirect") || url.pathname;
		throw redirect(303, location);
	}
};

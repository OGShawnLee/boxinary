import type { Actions, PageServerLoad } from "./$types";
import db from "$lib/db";
import { handleAuthState } from "@server/services";
import { error, redirect, type Cookies } from "@sveltejs/kit";
import { isNullish } from "malachite-ui/predicate";
import { useAwait } from "$lib/hooks";
import { addToCollection } from "@server/services";
import { isNotDefinitionOwner } from "@server/validation";
import { handleBigint } from "@server/utils";

export const load: PageServerLoad = async ({ cookies, params }) => {
	const collectionid = handleBigint(params.id, "collection-id");
	const { displayName } = await handleAuthState(cookies);
	if (displayName !== params.displayName) throw error(403, { message: "Access Forbidden" });

	const [definitions, err] = await useAwait(() =>
		db.definition.findMany({
			where: { user: { displayName }, collections: { none: { collectionId: collectionid } } },
			select: { id: true, name: true, definition: true, createdAt: true },
			orderBy: { createdAt: "desc" }
		})
	);

	if (definitions) return { definitions };
	if (err) throw error(500, { message: "Unable to Find Definitions" });
	throw error(404, { message: "Collection not Found" });
};

export const actions: Actions = {
	default: async ({ cookies, params, url }) => {
		const collectionid = handleBigint(params.id, "collection-id");
		const definitionid = handleBigint(url.searchParams.get("definition-id"), "definition-id");

		const { id, displayName } = await handleAuthState(cookies);
		if (displayName !== params.displayName) throw error(403, { message: "Action Forbidden" });
		const [isStranger] = await isNotDefinitionOwner(definitionid, id);
		if (isStranger) throw error(403, { message: "Action Forbidden" });

		const [collection] = await addToCollection({ collectionid, definitionid });
		if (isNullish(collection))
			throw error(500, { message: "Unable to Add Definition to Collection" });

		const location = url.searchParams.get("redirect-to");
		if (location) throw redirect(303, location);
		throw redirect(303, `/${displayName}/collections/${collectionid}/add`);
	}
};

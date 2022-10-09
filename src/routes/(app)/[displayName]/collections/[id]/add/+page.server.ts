import type { Actions, PageServerLoad } from "./$types";
import db from "$lib/db";
import { handleAuth } from "@server/services";
import { error, redirect } from "@sveltejs/kit";
import { isNullish } from "malachite-ui/predicate";
import { useAwait } from "$lib/hooks";
import { isNotDefinitionOwner } from "@server/validation";
import { handleNumber } from "@server/utils";

export const load: PageServerLoad = async ({ cookies, parent, params }) => {
	const collectionid = handleNumber(params.id, "collection-id");

	const { foundUser } = await parent();
	const { id } = await handleAuth(cookies, foundUser.id);

	const [definitions, err] = await useAwait(() =>
		db.definition.findMany({
			where: { userId: id, collections: { none: { collectionId: collectionid } } },
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
		const collectionid = handleNumber(params.id, "collection-id");
		const definitionid = handleNumber(url.searchParams.get("definition-id"), "definition-id");

		const { id, displayName } = await handleAuth(cookies, params.displayName, true);
		const [isStranger] = await isNotDefinitionOwner(definitionid, id);
		if (isStranger) throw error(403, { message: "Action Forbidden" });

		const [collection] = await useAwait(() =>
			db.definitionOnCollection.create({
				data: { collectionId: collectionid, definitionId: definitionid }
			})
		);
		if (isNullish(collection))
			throw error(500, { message: "Unable to Add Definition to Collection" });

		const location = url.searchParams.get("redirect-to");
		if (location) throw redirect(303, location);
		throw redirect(303, `/${displayName}/collections/${collectionid}/add`);
	}
};

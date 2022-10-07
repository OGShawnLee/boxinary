import type { Actions, PageServerLoad } from "./$types";
import db from "$lib/db";
import { handleAuth } from "@server/services";
import { error, redirect } from "@sveltejs/kit";
import { isEmpty, isNullish } from "malachite-ui/predicate";
import { useAwait } from "$lib/hooks";
import { isNotDefinitionOwner } from "@server/validation";

export const load: PageServerLoad = async ({ cookies, parent, params }) => {
	if (Number.isNaN(+params.id)) throw error(400, { message: "Invalid Collection ID" });

	const { foundUser } = await parent();
	const { id } = await handleAuth(cookies, foundUser.id);

	const [definitions, err] = await useAwait(() =>
		db.definition.findMany({
			where: { userId: id, collections: { none: { collectionId: +params.id } } },
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
		const did = url.searchParams.get("definition-id");
		if (isNullish(did) || isEmpty(did)) throw error(400, { message: "Definition ID is required!" });
		if (Number.isNaN(+did)) throw error(400, { message: "Invalid Definition ID" });
		const cid = +params.id;
		if (Number.isNaN(cid)) throw error(400, { message: "Invalid Collection ID" });

		const { id, displayName } = await handleAuth(cookies, params.displayName, true);
		const [isStranger] = await isNotDefinitionOwner(+did, id);
		if (isStranger) throw error(403, { message: "Action Forbidden" });

		const [collection] = await useAwait(() =>
			db.definitionOnCollection.create({ data: { collectionId: cid, definitionId: +did } })
		);
		if (isNullish(collection))
			throw error(500, { message: "Unable to Add Definition to Collection" });

		const location = url.searchParams.get("redirect-to");
		if (location) throw redirect(303, location);
		throw redirect(303, `/${displayName}/collections/${cid}/add`);
	}
};

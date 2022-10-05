import type { RequestHandler } from "./$types";
import { deleteCollection, findUserCoreData, handleAuthState } from "@server/services";
import { defineMessage } from "$lib/utils";
import { isNullish } from "malachite-ui/predicate";

export const POST: RequestHandler = async ({ cookies, params, url }) => {
	if (Number.isNaN(+params.id))
		return new Response(defineMessage("Invalid Collection Identifier"), { status: 400 });

	const currentUser = await handleAuthState(cookies);
	const [targetUser, err] = await findUserCoreData(params.displayName);
	if (err) return new Response(defineMessage("Unable to Verify Authentication"), { status: 500 });
	if (isNullish(targetUser)) return new Response(defineMessage("User not Found"), { status: 404 });

	if (targetUser.id !== currentUser.id)
		return new Response(defineMessage("Action Forbidden"), { status: 403 });

	const [collection, deleteError] = await deleteCollection(+params.id);
	if (collection) {
		const location = url.searchParams.get("redirect-to");
		if (location) return new Response(null, { status: 303, headers: { location } });
		return new Response(null, { status: 205 });
	}

	if (deleteError) return new Response(defineMessage("Unable to Delete Collection"));
	return new Response(defineMessage("Collection not Found"), { status: 404 });
};

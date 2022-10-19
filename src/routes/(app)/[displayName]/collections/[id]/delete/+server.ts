import type { RequestHandler } from "./$types";
import { deleteCollection, handleAuthState } from "@server/services";
import { toBigint } from "@server/utils";
import { defineMessage } from "$lib/utils";
import { isNullish } from "malachite-ui/predicate";

export const POST: RequestHandler = async ({ cookies, params, url }) => {
	const id = toBigint(params.id);
	if (isNullish(id))
		return new Response(defineMessage("Invalid Collection Identifier"), { status: 400 });

	const currentUser = await handleAuthState(cookies);
	if (currentUser.id !== params.displayName)
		return new Response(defineMessage("Action Forbidden"), { status: 403 });

	const [collection, err] = await deleteCollection(id);
	if (err) return new Response(defineMessage("Unable to Delete Collection"));
	if (collection) {
		const location = url.searchParams.get("redirect-to");
		if (location) return new Response(null, { status: 303, headers: { location } });
		return new Response(null, { status: 205 });
	}
	return new Response(defineMessage("Collection not Found"), { status: 404 });
};

import type { RequestHandler } from "./$types";
import db from "$lib/db";
import { deleteDefinition, handleAuthState } from "@server/services";
import { isNullish } from "malachite-ui/predicate";
import { useAwait } from "$lib/hooks";
import { defineMessage } from "$lib/utils";

export const POST: RequestHandler = async ({ cookies, params: { displayName, name }, url }) => {
	const currentUser = await handleAuthState(cookies);
	if (displayName !== currentUser.displayName)
		return new Response(defineMessage("Action Forbidden"), { status: 403 });

	const [definition, err] = await useAwait(() =>
		db.definition.findFirst({
			where: { user: { displayName }, name },
			include: { collections: { take: 1 } }
		})
	);

	if (err) return new Response(defineMessage("Unable to Delete Definition"), { status: 500 });
	if (isNullish(definition))
		return new Response(defineMessage("Definition not Found"), { status: 404 });

	const inCollection = definition.collections.length > 0;
	const [payload] = await deleteDefinition(definition.id, inCollection);
	if (isNullish(payload))
		return new Response(defineMessage("Failed to Delete Definition"), { status: 500 });

	const location = url.searchParams.get("redirect-to") || "/home";
	return new Response(null, { status: 303, headers: { location } });
};

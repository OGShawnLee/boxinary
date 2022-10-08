import type { RequestHandler } from "./$types";
import db from "$lib/db";
import { deleteDefinition, handleAuthState } from "@server/services";
import { isNullish } from "malachite-ui/predicate";
import { useAwait } from "$lib/hooks";

function defineMessage(message: string) {
	return JSON.stringify({ message });
}

export const POST: RequestHandler = async ({ cookies, params: { displayName, name } }) => {
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
	const [deletedDefinition] = await deleteDefinition(definition.id, inCollection);
	return deletedDefinition
		? new Response(null, { status: 303, headers: { location: "/home" } })
		: new Response(defineMessage("Failed to Delete Definition"), { status: 500 });
};

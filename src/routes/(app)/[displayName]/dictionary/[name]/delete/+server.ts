import type { RequestHandler } from "./$types";
import { deleteUserDefinition, getDefinitionByName, handleAuthState } from "@server/services";

function defineMessage(message: string) {
	return JSON.stringify({ message });
}

export const POST: RequestHandler = async ({ cookies, params: { displayName, name } }) => {
	const currentUser = await handleAuthState(cookies);
	if (displayName !== currentUser.displayName)
		return new Response(defineMessage("Action Forbidden"), { status: 403 });

	const [initialDefinition, err] = await getDefinitionByName(displayName, name);
	if (err) return new Response(defineMessage("Unable to Delete Definition"), { status: 500 });
	if (!initialDefinition)
		return new Response(defineMessage("Definition not Found"), { status: 404 });

	const [deletedDefinition] = await deleteUserDefinition(initialDefinition.id);
	return deletedDefinition
		? new Response(null, { status: 303, headers: { location: "/home" } })
		: new Response(defineMessage("Failed to Delete Definition"), { status: 500 });
};

import type { RequestHandler } from "./$types";
import { deleteExample, getExample, handleAuthState } from "@server/services";
import { defineMessage } from "$lib/utils";

export const POST: RequestHandler = async ({ cookies, params: { displayName, name, id }, url }) => {
	const currentUser = await handleAuthState(cookies);
	if (currentUser.displayName !== displayName)
		return new Response(defineMessage("Action Forbidden"), { status: 403 });

	const [initialExample, err] = await getExample(Number(id), name);
	if (err) return new Response(defineMessage("Unable to Delete Example"), { status: 500 });
	if (!initialExample) return new Response(defineMessage("Example not Found"), { status: 404 });

	const [example] = await deleteExample(initialExample.id);
	if (example) {
		const location = url.searchParams.get("redirect-to");
		if (location) return new Response(null, { status: 303, headers: { location } });
		return new Response(null, { status: 205 });
	}
	return new Response(defineMessage("Unable to Delete Example"), { status: 500 });
};

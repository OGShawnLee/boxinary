import type { RequestHandler } from "./$types";
import { deleteExample, findExample, handleAuthState } from "@server/services";
import { defineMessage } from "$lib/utils";
import { toBigint } from "@server/utils";
import { isNullish } from "malachite-ui/predicate";

export const POST: RequestHandler = async ({ cookies, params, url }) => {
	const currentUser = await handleAuthState(cookies);
	if (currentUser.displayName !== params.displayName)
		return new Response(defineMessage("Action Forbidden"), { status: 403 });

	const id = toBigint(params.id);
	if (isNullish(id)) return new Response(defineMessage("Invalid Example ID"));

	const [initialExample, err] = await findExample(id, params.name);
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

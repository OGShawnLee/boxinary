import type { RequestHandler } from "./$types";
import { deleteExample, getExample, handleAuthState } from "@server/services";
import { defineMessage } from "$lib/utils";

export const POST: RequestHandler = async ({ cookies, params: { displayName, title, id } }) => {
	const currentUser = await handleAuthState(cookies);
	if (currentUser.displayName !== displayName)
		return new Response(defineMessage("Action Forbidden"), { status: 403 });

	const [initialExample, err] = await getExample(Number(id), title);
	if (err) return new Response(defineMessage("Unable to Delete Example"), { status: 500 });
	if (!initialExample) return new Response(defineMessage("Example not Found"), { status: 404 });

	const [example] = await deleteExample(initialExample.id);
	if (example)
		return new Response(null, {
			status: 303,
			headers: { location: `/${displayName}/dictionary/${title}/examples` }
		});
	return new Response(defineMessage("Unable to Delete Example"), { status: 500 });
};

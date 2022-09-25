import type { Actions } from "./$types";
import { error, invalid, redirect } from "@sveltejs/kit";
import { addDefinitionExample, getDefinitionId, handleAuthState } from "@server/services";
import { isEmpty, isNullish } from "malachite-ui/predicate";

export const actions: Actions = {
	default: async ({ cookies, params, request }) => {
		const { id, displayName } = await handleAuthState(cookies);
		if (displayName !== params.displayName) throw error(403, { message: "Action Forbidden" });

		const data = await request.formData();
		const text = data.get("example");
		const source = data.get("source");

		if (typeof text !== "string") return invalid(400, { text: { invalid: true }, source });
		if (isEmpty(text)) return invalid(400, { text: { missing: true }, source });

		if (source) {
			if (typeof source !== "string") return invalid(400, { text, source: { invalid: true } });
			if (isEmpty(source)) return invalid(400, { text, source: { missing: true } });
		}

		const [definitionId, err] = await getDefinitionId(displayName, params.title);
		if (isNullish(definitionId)) throw error(404, { message: "Definition not Found" });
		if (err) throw error(500, { message: "Unable to Add Example" });

		const [example] = await addDefinitionExample(definitionId, { uid: id, text, source });
		if (example) throw redirect(303, `/${displayName}/dictionary/${params.title}`);
		throw error(500, { message: "Unable to Add Example" });
	}
};

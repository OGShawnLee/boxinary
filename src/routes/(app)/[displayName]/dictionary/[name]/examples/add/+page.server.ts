import type { Actions } from "./$types";
import { error, invalid, redirect } from "@sveltejs/kit";
import { addExample, findDefinitionId, handleAuth } from "@server/services";
import { isEmpty, isNullish } from "malachite-ui/predicate";

export const actions: Actions = {
	default: async ({ cookies, params, request }) => {
		const { id, displayName } = await handleAuth(cookies, params.displayName, true);

		const data = await request.formData();
		const text = data.get("example");
		const source = data.get("source");

		if (typeof text !== "string") return invalid(400, { text: { invalid: true }, source });
		if (isEmpty(text)) return invalid(400, { text: { missing: true }, source });

		if (source) {
			if (typeof source !== "string") return invalid(400, { text, source: { invalid: true } });
			if (isEmpty(source)) return invalid(400, { text, source: { missing: true } });
		}

		const [definitionId, err] = await findDefinitionId(displayName, params.name);
		if (isNullish(definitionId)) throw error(404, { message: "Definition not Found" });
		if (err) throw error(500, { message: "Unable to Add Example" });

		const [payload] = await addExample(definitionId, id, { text, source });
		if (payload) throw redirect(303, `/${displayName}/dictionary/${params.name}`);
		throw error(500, { message: "Unable to Add Example" });
	}
};

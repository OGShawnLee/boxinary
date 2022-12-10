import type { Actions } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";
import { findDefinitionId, handleAuth, updateDefinition } from "@server/services";
import { isWhitespace } from "@boxinary/predicate-core";

export const actions: Actions = {
	default: async ({ cookies, params, request }) => {
		const { displayName } = await handleAuth(cookies, params.displayName, true);

		const data = await request.formData();
		const name = data.get("name");
		const definition = data.get("definition");
		const description = data.get("description");
		const summary = data.get("summary");
		const source = data.get("source");

		if (typeof name !== "string")
			return fail(400, { name: { invalid: true }, definition, description, summary });
		if (isWhitespace(name))
			return fail(400, { name: { missing: true }, definition, description, summary });

		if (typeof definition !== "string")
			return fail(400, { definition: { invalid: true }, name, description, summary });
		if (isWhitespace(definition))
			return fail(400, { definition: { missing: true }, name, description, summary });

		if (typeof description !== "string")
			return fail(400, { description: { invalid: true }, name, definition, summary });
		if (isWhitespace(description))
			return fail(400, { description: { missing: true }, name, definition, summary });

		if (typeof summary !== "string")
			return fail(400, { summary: { invalid: true }, name, definition, description });
		if (isWhitespace(summary))
			return fail(400, { summary: { missing: true }, name, definition, description });

		if (source) {
			if (typeof source != "string")
				return fail(400, { summary, name, definition, description, source: { invalid: true } });
			if (isWhitespace(source))
				return fail(400, { summary, name, definition, description, source: { missing: true } });
		}

		const [id] = await findDefinitionId(params.displayName, params.name);
		if (id === undefined) throw error(404, { message: "Definition not Found" });
		if (id === null) throw error(500, { message: "Unable to Update Definition" });

		const finalData = { name, definition, summary, description, source };
		const [payload] = await updateDefinition(id, finalData);
		if (payload) throw redirect(303, `/${displayName}/dictionary/${name}`);
		throw error(500, { message: "Unable to Update Definition" });
	}
};

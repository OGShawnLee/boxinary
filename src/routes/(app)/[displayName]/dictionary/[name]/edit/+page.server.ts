import type { Actions } from "./$types";
import { error, invalid, redirect } from "@sveltejs/kit";
import { findDefinitionId, handleAuth, updateDefinition } from "@server/services";
import { isEmpty } from "malachite-ui/predicate";

export const actions: Actions = {
	default: async ({ cookies, params, request }) => {
		const { displayName } = await handleAuth(cookies, params.displayName, true);

		const data = await request.formData();
		const name = data.get("name");
		const definition = data.get("definition");
		const description = data.get("description");
		const summary = data.get("summary");

		if (typeof name !== "string")
			return invalid(400, { name: { invalid: true }, definition, description, summary });
		if (isEmpty(name))
			return invalid(400, { name: { missing: true }, definition, description, summary });

		if (typeof definition !== "string")
			return invalid(400, { definition: { invalid: true }, name, description, summary });
		if (isEmpty(definition))
			return invalid(400, { definition: { missing: true }, name, description, summary });

		if (typeof description !== "string")
			return invalid(400, { description: { invalid: true }, name, definition, summary });
		if (isEmpty(description))
			return invalid(400, { description: { missing: true }, name, definition, summary });

		if (typeof summary !== "string")
			return invalid(400, { summary: { invalid: true }, name, definition, description });
		if (isEmpty(summary))
			return invalid(400, { summary: { missing: true }, name, definition, description });

		const [id] = await findDefinitionId(params.displayName, params.name);
		if (id === undefined) throw error(404, { message: "Definition not Found" });
		if (id === null) throw error(500, { message: "Unable to Update Definition" });

		const [payload] = await updateDefinition(id, { name, definition, summary, description });
		if (payload) throw redirect(303, `/${displayName}/dictionary/${name}`);
		throw error(500, { message: "Unable to Update Definition" });
	}
};

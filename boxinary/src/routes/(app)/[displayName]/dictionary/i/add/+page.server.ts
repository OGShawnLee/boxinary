import type { Actions } from "./$types";
import { createDefinition, handleAuth } from "@server/services";
import { error, invalid, redirect } from "@sveltejs/kit";
import { isWhitespace } from "@boxinary/predicate-core";

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const { id, displayName } = await handleAuth(cookies, params.displayName, true);

		const data = await request.formData();
		const name = data.get("name");
		const definition = data.get("definition");
		const description = data.get("description");
		const summary = data.get("summary");
		const source = data.get("source");

		if (typeof name !== "string") return invalid(400, { name: { invalid: true } });
		if (isWhitespace(name)) return invalid(400, { name: { missing: true } });

		if (typeof definition !== "string") return invalid(400, { definition: { invalid: true } });
		if (isWhitespace(definition)) return invalid(400, { definition: { missing: true } });

		if (typeof description !== "string") return invalid(400, { description: { invalid: true } });
		if (isWhitespace(description)) return invalid(400, { description: { missing: true } });

		if (typeof summary !== "string") return invalid(400, { summary: { invalid: true } });
		if (isWhitespace(summary)) return invalid(400, { summary: { missing: true } });

		if (source) {
			if (typeof source !== "string") return invalid(400, { source: { invalid: true } });
			if (isWhitespace(source)) return invalid(400, { source: { missing: true } });
		}

		const [payload] = await createDefinition(id, {
			name,
			definition,
			description,
			summary,
			source
		});
		if (payload) throw redirect(303, `/${displayName}/dictionary/${payload.name}`);
		throw error(500, { message: "Unable to Create Definition" });
	}
};

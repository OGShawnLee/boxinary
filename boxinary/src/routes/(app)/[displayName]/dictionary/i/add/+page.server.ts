import type { Actions } from "./$types";
import { createDefinition, handleAuth } from "@server/services";
import { error, fail, redirect } from "@sveltejs/kit";
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

		if (typeof name !== "string") return fail(400, { name: { invalid: true } });
		if (isWhitespace(name)) return fail(400, { name: { missing: true } });

		if (typeof definition !== "string") return fail(400, { definition: { invalid: true } });
		if (isWhitespace(definition)) return fail(400, { definition: { missing: true } });

		if (typeof description !== "string") return fail(400, { description: { invalid: true } });
		if (isWhitespace(description)) return fail(400, { description: { missing: true } });

		if (typeof summary !== "string") return fail(400, { summary: { invalid: true } });
		if (isWhitespace(summary)) return fail(400, { summary: { missing: true } });

		if (source) {
			if (typeof source !== "string") return fail(400, { source: { invalid: true } });
			if (isWhitespace(source)) return fail(400, { source: { missing: true } });
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

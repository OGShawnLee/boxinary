import type { Actions } from "./$types";
import { createDefinition, handleAuthState } from "@server/services";
import { error, invalid, redirect } from "@sveltejs/kit";
import { isEmpty } from "malachite-ui/predicate";

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const { id, displayName } = await handleAuthState(cookies);
		if (displayName !== params.displayName) throw error(403, { message: "Action Forbidden" });

		const data = await request.formData();
		const title = data.get("title");
		const atomic = data.get("atomic-definition");
		const description = data.get("description");
		const definition = data.get("definition");

		if (typeof title !== "string") return invalid(400, { title: { invalid: true } });
		if (isEmpty(title)) return invalid(400, { title: { missing: true } });

		if (typeof atomic !== "string") return invalid(400, { atomic: { invalid: true } });
		if (isEmpty(atomic)) return invalid(400, { atomic: { missing: true } });

		if (typeof description !== "string") return invalid(400, { description: { invalid: true } });
		if (isEmpty(description)) return invalid(400, { description: { missing: true } });

		if (typeof definition !== "string") return invalid(400, { definition: { invalid: true } });
		if (isEmpty(definition)) return invalid(400, { definition: { missing: true } });

		const [def] = await createDefinition(id, { title, atomic, definition, description });
		if (def) throw redirect(303, `/${displayName}/dictionary/${def.title}`);
		throw error(500, { message: "Unable to Create Definition" });
	}
};

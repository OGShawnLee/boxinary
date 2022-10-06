import type { Actions } from "./$types";
import db from "$lib/db";
import { error, invalid, redirect } from "@sveltejs/kit";
import { handleAuthState } from "@server/services";
import { useAwait, useAwaitError } from "$lib/hooks";
import { isEmpty } from "malachite-ui/predicate";

export const actions: Actions = {
	default: async ({ cookies, params, request }) => {
		const { id, displayName } = await handleAuthState(cookies);
		if (displayName !== params.displayName) throw error(403, "Action Forbidden");

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

		const [initialDefinition] = await useAwait(() =>
			db.definition.findFirst({
				where: { name: params.name, userId: id },
				select: { id: true }
			})
		);
		if (!initialDefinition) throw error(500, { message: "Unable to Update Definition" });

		const updateError = await useAwaitError(async () => {
			await db.definition.update({
				where: { id: initialDefinition.id },
				data: { name, definition, description, summary }
			});
		});
		if (updateError) throw error(500, { message: "Unable to Update Definition" });
		throw redirect(303, `/${displayName}/dictionary/${name}`);
	}
};

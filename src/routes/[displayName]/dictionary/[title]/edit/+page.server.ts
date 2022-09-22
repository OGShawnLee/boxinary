import type { Actions } from "./$types";
import db from "$lib/db";
import { error, invalid, redirect } from "@sveltejs/kit";
import { handleAuthState } from "@root/server/services";
import { useAwait, useAwaitError } from "$lib/hooks";
import { isEmpty } from "malachite-ui/predicate";

export const actions: Actions = {
	default: async ({ cookies, params, request }) => {
		const { id, displayName } = await handleAuthState(cookies);
		if (displayName !== params.displayName) throw error(403, "Action Forbidden");

		const data = await request.formData();
		const title = data.get("title");
		const atomic = data.get("atomic-definition");
		const description = data.get("description");
		const definition = data.get("definition");

		if (typeof title !== "string")
			return invalid(400, { title: { invalid: true }, atomic, description, definition });
		if (isEmpty(title))
			return invalid(400, { title: { missing: true }, atomic, description, definition });

		if (typeof atomic !== "string")
			return invalid(400, { atomic: { invalid: true }, title, description, definition });
		if (isEmpty(atomic))
			return invalid(400, { atomic: { missing: true }, title, description, definition });

		if (typeof description !== "string")
			return invalid(400, { description: { invalid: true }, title, atomic, definition });
		if (isEmpty(description))
			return invalid(400, { description: { missing: true }, title, atomic, definition });

		if (typeof definition !== "string")
			return invalid(400, { definition: { invalid: true }, title, atomic, description });
		if (isEmpty(definition))
			return invalid(400, { definition: { missing: true }, title, atomic, description });

		const [initialDefinition] = await useAwait(() =>
			db.definition.findFirst({
				where: { title: params.title, authorId: id },
				select: { id: true }
			})
		);
		if (!initialDefinition) throw error(500, { message: "Unable to Update Definition" });

		const updateError = await useAwaitError(async () => {
			await db.definition.update({
				where: { id: initialDefinition.id },
				data: { title, atomic, description, definition }
			});
		});
		if (updateError) throw error(500, { message: "Unable to Update Definition" });
		throw redirect(303, `/${displayName}/dictionary/${title}`);
	}
};

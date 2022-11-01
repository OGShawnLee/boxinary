import type { Actions, PageServerLoad } from "./$types";
import type { SubDefinition } from "@prisma/client";
import db from "$lib/db";
import { error, invalid, redirect } from "@sveltejs/kit";
import { isEmpty, isNullish } from "malachite-ui/predicate";
import { findDefinitionId, handleAuth } from "@server/services";
import { getDefinitionPath } from "$lib/utils";
import { useAwait } from "$lib/hooks";

export const load: PageServerLoad = async ({ cookies, params: { displayName } }) => {
	await handleAuth(cookies, displayName);
};

export const actions: Actions = {
	default: async ({ cookies, params: { displayName, name }, request }) => {
		await handleAuth(cookies, displayName, true);

		const data = await request.formData();
		const example = data.get("example");
		const definition = data.get("definition");

		if (typeof definition !== "string" || definition.length > 180)
			return invalid(400, { definition: { invalid: true }, example });
		if (isEmpty(definition)) return invalid(400, { definition: { missing: true }, example });

		if (example) {
			if (typeof example !== "string" || example.length > 80)
				return invalid(400, { definition, example: { invalid: true } });
			if (isEmpty(example)) return invalid(400, { definition, example: { missing: true } });
		}

		const [id] = await findDefinitionId(displayName, name);
		if (isNullish(id)) throw error(404, { message: "Word not Found." });

		const [payload] = await createSubDefinition(id, definition, example);
		if (payload) throw redirect(303, getDefinitionPath(displayName, name));
		throw error(500, { message: "Unable to Add Definition" });
	}
};

function createSubDefinition(
	wordId: bigint,
	definition: SubDefinition["definition"],
	example: SubDefinition["example"]
) {
	return useAwait(() =>
		db.subDefinition.create({
			data: { wordId, definition, example }
		})
	);
}

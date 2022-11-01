import type { PageServerLoad } from "./$types";
import { findUserExamples } from "@server/services";
import { error } from "@sveltejs/kit";
import { isNullish } from "malachite-ui/predicate";
import { groupExamplesByDefinition } from "$lib/utils";

export const load: PageServerLoad = async ({ params: { displayName } }) => {
	const [examples] = await findUserExamples(displayName);
	if (isNullish(examples)) throw error(500, { message: "Unable to Find User Examples" });
	return {
		examples: groupExamplesByDefinition(examples)
	};
};

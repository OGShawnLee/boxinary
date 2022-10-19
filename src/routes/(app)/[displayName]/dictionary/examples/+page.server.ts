import type { PageServerLoad } from "./$types";
import { findUserExamples } from "@server/services";
import { error } from "@sveltejs/kit";
import { isNullish } from "malachite-ui/predicate";

export const load: PageServerLoad = async ({ params: { displayName } }) => {
	const [examples] = await findUserExamples(displayName);
	if (isNullish(examples)) throw error(500, { message: "Unable to Find User Examples" });

	const definitions = examples.reduce((definitions, { definition }) => {
		if (definitions.some(({ name }) => name === definition.name)) return definitions;
		return definitions.push(definition), definitions;
	}, [] as { definition: string; name: string }[]);
	return {
		definitions: definitions.map(({ definition, name }) => {
			const matches = examples.filter((example) => example.definition.name === name);
			return { definition, name, examples: matches };
		})
	};
};

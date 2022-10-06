import type { PageServerLoad } from "./$types";
import { getUserExamples } from "@server/services";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
	const { foundUser } = await parent();
	const [examples] = await getUserExamples(foundUser.id);
	if (examples) {
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
	} else throw error(500, { message: "Unable to Get User Examples" });
};

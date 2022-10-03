import type { PageServerLoad } from "./$types";
import { getUserExamples } from "@server/services";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
	const { foundUser } = await parent();
	const [examples] = await getUserExamples(foundUser.id);
	if (examples) {
		const definitions = examples.reduce((definitions, { definition }) => {
			if (definitions.some(({ title }) => title === definition.title)) return definitions;
			return definitions.push(definition), definitions;
		}, [] as { atomic: string; title: string }[]);
		return {
			definitions: definitions.map(({ atomic, title }) => {
				const matches = examples.filter((example) => example.definition.title === title);
				return { atomic, title, examples: matches };
			})
		};
	} else throw error(500, { message: "Unable to Get User Examples" });
};

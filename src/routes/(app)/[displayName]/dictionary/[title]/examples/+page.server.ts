import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getDefinitionExamples } from "@server/services";

export const load: PageServerLoad = async ({ parent }) => {
	const { definition } = await parent();
	const [examples] = await getDefinitionExamples(definition.id);
	if (examples) return { examples };
	throw error(500, { message: "Unable to Get Definition Examples" });
};

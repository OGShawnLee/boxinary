import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { findDefinitionExamplesPageData } from "@server/services";

export const load: PageServerLoad = async ({ params: { displayName, name } }) => {
	const [examples] = await findDefinitionExamplesPageData(displayName, name);
	if (examples) return { examples };
	throw error(500, { message: "Unable to Get Definition Examples" });
};

import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getDefinitionByTitle } from "@server/services";

export const load: LayoutServerLoad = async ({ params: { displayName, title } }) => {
	const [definition, err] = await getDefinitionByTitle(displayName, title);
	if (err) throw error(500, { message: "Unable to Get Definition" });
	if (definition) return { definition };
	throw error(404, { message: "Definition not Found" });
};
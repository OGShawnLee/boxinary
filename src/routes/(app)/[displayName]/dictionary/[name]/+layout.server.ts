import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getDefinitionByName } from "@server/services";

export const load: LayoutServerLoad = async ({ params: { displayName, name } }) => {
	const [definition, err] = await getDefinitionByName(displayName, name);
	if (err) throw error(500, { message: "Unable to Get Definition" });
	if (definition) return { definition };
	throw error(404, { message: "Definition not Found" });
};

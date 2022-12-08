import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { findDefinitionsByName } from "@server/services";
import { isNullish, isWhitespace } from "@boxinary/predicate-core";

export const load: PageServerLoad = async ({ url }) => {
	const name = url.searchParams.get("name");
	if (isNullish(name) || isWhitespace(name)) return { results: [] };
	const [results] = await findDefinitionsByName(name.toLowerCase());
	if (results) return { name: name.toLowerCase(), results };
	throw error(500, { message: "Unable to Find Definitions" });
};

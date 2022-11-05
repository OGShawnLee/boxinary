import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { findDefinitionsByName } from "@server/services";
import { isEmpty, isNullish } from "malachite-ui/predicate";

export const load: PageServerLoad = async ({ url }) => {
	const name = url.searchParams.get("name");
	if (isNullish(name) || isEmpty(name)) return { results: [] };
	const [results] = await findDefinitionsByName(name.toLowerCase());
	if (results) return { name: name.toLowerCase(), results };
	throw error(500, { message: "Unable to Find Definitions" });
};

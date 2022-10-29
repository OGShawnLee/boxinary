import type { PageServerLoad } from "./$types";
import db from "$lib/db";
import { error } from "@sveltejs/kit";
import { useAwait } from "$lib/hooks";
import { isEmpty, isNullish } from "malachite-ui/predicate";

export const load: PageServerLoad = async ({ url }) => {
	const name = url.searchParams.get("name");
	if (isNullish(name) || isEmpty(name)) return { results: [] };
	const [results] = await findDefinitionsByName(name.toLowerCase());
	if (results) return { name: name.toLowerCase(), results };
	throw error(500, { message: "Unable to Find Definitions" });
};

function findDefinitionsByName(name: string) {
	return useAwait(() =>
		db.definition.findMany({
			where: { name: { startsWith: name } },
			include: { user: { select: { displayName: true } } },
			orderBy: { name: "asc" }
		})
	);
}

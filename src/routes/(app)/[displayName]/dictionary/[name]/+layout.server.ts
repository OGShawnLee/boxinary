import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getAuthToken, findBookmark, findDefinitionPageData } from "@server/services";

export const load: LayoutServerLoad = async ({ cookies, params: { displayName, name } }) => {
	const [definition, err] = await findDefinitionPageData(displayName, name);
	if (err) throw error(500, { message: "Unable to Get Definition" });
	if (definition) {
		const token = await getAuthToken(cookies);
		if (token && definition.user.displayName !== token.displayName) {
			const [bookmark, err] = await findBookmark(definition.id, token.id);
			return { definition, isBookmarked: err ? "ERROR" : Boolean(bookmark) };
		}
		return { definition };
	}
	throw error(404, { message: "Definition not Found" });
};

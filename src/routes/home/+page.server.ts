import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getUserDefinitionsById, handleAuthState } from "@server/services";

export const load: PageServerLoad = async ({ cookies }) => {
	const { id } = await handleAuthState(cookies);
	const [definitions] = await getUserDefinitionsById(id);
	if (definitions) return { definitions };
	throw error(500, { message: "Unable to Get User Definitions" });
};

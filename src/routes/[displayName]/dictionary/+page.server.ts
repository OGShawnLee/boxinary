import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getUserDefinitions } from "@root/server/services";

export const load: PageServerLoad = async ({ params: { displayName } }) => {
	const [definitions] = await getUserDefinitions(displayName);
	if (definitions) return { definitions };
	throw error(500, { message: "Unable to Get User Definitions" });
};

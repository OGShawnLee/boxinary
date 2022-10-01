import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getUserDashboard, handleAuthState } from "@server/services";

export const load: PageServerLoad = async ({ cookies }) => {
	const { id, displayName } = await handleAuthState(cookies);
	const [dashboard] = await getUserDashboard(id);
	if (dashboard)
		return {
			definitions: dashboard.definitions,
			examples: dashboard.examples,
			currentUser: { displayName }
		};
	throw error(500, { message: "Unable to Get User Definitions" });
};

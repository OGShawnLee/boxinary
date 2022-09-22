import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getUserByDisplayName, getUserDefinitions } from "@root/server/services";

export const load: PageServerLoad = async ({ params: { displayName } }) => {
	const [foundUser, err] = await getUserByDisplayName(displayName);
	if (err) throw error(500, { message: "Unable to Get User Information" });
	if (!foundUser) throw error(404, { message: "User not Found" });

	const [definitions] = await getUserDefinitions(displayName);
	if (definitions) return { definitions };
	throw error(500, { message: "Unable to Get User Definitions" });
};
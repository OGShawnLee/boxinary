import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getUserProfileData } from "@server/services";

export const load: LayoutServerLoad = async ({ params: { displayName } }) => {
	const [foundUser, err] = await getUserProfileData(displayName);
	if (foundUser) return foundUser;
	if (err) throw error(500, { message: "Unable to Get User Data" });
	throw error(404, { message: "User not Found" });
};

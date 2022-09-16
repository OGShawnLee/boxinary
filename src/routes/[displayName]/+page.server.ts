import type { PageServerLoad } from "./$types";
import { getUserByDisplayName } from "@root/server/services";
import { error } from "@sveltejs/kit";
import { exclude } from "$lib/utils";

export const load: PageServerLoad = async ({ params: { displayName } }) => {
	const [foundUser, err] = await getUserByDisplayName(displayName);
	if (err) throw error(500, { message: "Unable To Get User Data" });
	if (foundUser) return { foundUser: exclude(foundUser, "email", "password") };
	throw error(404, { message: "User Not Found" });
};
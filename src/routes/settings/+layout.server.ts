import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (user) return { user };
	throw redirect(303, "/auth/sign-in");
};

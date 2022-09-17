import type { ServerLoad } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { handleClientUser } from "@root/server/services";

export const load: ServerLoad = async ({ locals, parent }) => {
	await parent();
	const { id } = locals.currentUser || {};
	if (id) return await handleClientUser(id);
	throw redirect(303, "/auth/sign-up");
};

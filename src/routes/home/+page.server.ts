import type { ServerLoad } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { handleClientUser } from "@root/server/services";

export const load: ServerLoad = async ({ locals, parent }) => {
	await parent();
	const { uid } = locals;
	if (uid) return await handleClientUser(uid);
	throw redirect(303, "/auth/sign-up");
};

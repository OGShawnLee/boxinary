import type { ServerLoad } from "@sveltejs/kit";
import { useAwait } from "$lib/hooks";
import { redirect } from "@sveltejs/kit";
import { deleteAuthCookie } from "@server/utils";
import { isLoggedIn } from "@server/predicate";

export const load: ServerLoad = async ({ cookies }) => {
	const [isSignedIn, err] = await useAwait(() => isLoggedIn(cookies));
	if (isSignedIn) throw redirect(303, "/home");
	if (err) {
		deleteAuthCookie(cookies);
		throw redirect(303, "/auth/sign-in");
	}
};

import type { ServerLoad } from "@sveltejs/kit";
import { AUTH_COOKIE } from "$env/static/private";
import { useAwait } from "$lib/hooks";
import { redirect } from "@sveltejs/kit";
import { deleteAuthCookie } from "@server/utils";
import { isLoggedIn } from "@server/validation";

export const load: ServerLoad = async ({ cookies }) => {
	const [isSignedIn, err] = await useAwait(() => isLoggedIn(cookies.get(AUTH_COOKIE)));
	if (isSignedIn) throw redirect(303, "/home");
	if (err) {
		deleteAuthCookie(cookies);
		throw redirect(303, "/auth/sign-in");
	}
};

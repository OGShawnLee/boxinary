import type { ServerLoad } from "@sveltejs/kit";
import { AUTH_COOKIE } from "$env/static/private";
import { error, redirect } from "@sveltejs/kit";
import { useAwait } from "$lib/hooks";
import { isJWTPayloadState } from "@server/predicate";
import { isEmpty } from "malachite-ui/predicate";
import { deleteAuthCookie } from "@server/utils";
import { exclude } from "$lib/utils";
import { getUser, getUserJWTTokenPayload } from "@server/services";

export const load: ServerLoad = async ({ cookies, locals }) => {
	const authStateCookie = cookies.get(AUTH_COOKIE);
	if (authStateCookie === undefined || isEmpty(authStateCookie)) return { user: null };
	const [authState] = await useAwait(() => getUserJWTTokenPayload(authStateCookie));

	if (isJWTPayloadState(authState)) {
		const [user, err] = await getUser(authState.id);
		if (!user || err) throw error(500, { message: "Unable to Get User Data" });
		locals.currentUser = { id: user.id, name: user.name, displayName: user.displayName };
		return { user: exclude(user, "email", "password") };
	}

	deleteAuthCookie(cookies);
	throw redirect(303, "/auth/sign-in");
};

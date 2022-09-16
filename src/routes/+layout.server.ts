import type { ServerLoad } from "@sveltejs/kit";
import { AUTH_COOKIE } from "$env/static/private";
import { error } from "@sveltejs/kit";
import { useAwait } from "$lib/hooks";
import { isJWTPayloadState } from "@root/server/validation";
import { isEmpty } from "malachite-ui/predicate";
import { deleteAuthCookie } from "@root/server/utils";
import { exclude } from "$lib/utils";
import { getUser, getUserJWTTokenPayload } from "@root/server/services";

export const load: ServerLoad = async ({ cookies, locals }) => {
	const authStateCookie = cookies.get(AUTH_COOKIE);
	if (authStateCookie === undefined || isEmpty(authStateCookie)) return;
	const [authState] = await useAwait(() => getUserJWTTokenPayload(authStateCookie));

	if (isJWTPayloadState(authState)) {
		const [user, err] = await getUser(authState.id);
		if (!user || err) throw error(500, { message: "Unable to Get User Data" });
		locals.uid = user.id;
		return { user: exclude(user, "email", "password") };
	}

	deleteAuthCookie(cookies);
	throw error(400, { message: "Invalid Auth Token" });
};

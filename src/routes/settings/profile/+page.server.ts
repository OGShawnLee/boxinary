import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { error, invalid, redirect } from "@sveltejs/kit";
import { handleAuthState, updateUser } from "@root/server/services";
import { isEmpty } from "malachite-ui/predicate";

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	return { user };
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const { id } = await handleAuthState(cookies);
		const data = await request.formData();
		const name = data.get("name");
		const displayName = data.get("display-name");

		if (typeof name !== "string") return invalid(400, { name: { invalid: true }, displayName });
		if (isEmpty(name)) return invalid(400, { name: { missing: true }, displayName });

		if (typeof displayName !== "string")
			return invalid(400, { displayName: { invalid: true }, name });
		if (isEmpty(displayName)) return invalid(400, { displayName: { missing: true }, name });

		const [updatedUser] = await updateUser(id, { name, displayName });
		if (updatedUser) throw redirect(303, `/${updatedUser.displayName}`);
		return error(500, { message: "Unable to Update Profile" });
	}
};

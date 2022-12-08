import type { Actions } from "@sveltejs/kit";
import { error, invalid, redirect } from "@sveltejs/kit";
import { handleAuthState, updateUser } from "@server/services";
import { isWhitespace } from "@boxinary/predicate-core";

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const { id } = await handleAuthState(cookies);
		const data = await request.formData();
		const name = data.get("name");
		const displayName = data.get("display-name");
		const description = data.get("description");

		if (typeof name !== "string")
			return invalid(400, { description, displayName, name: { invalid: true } });
		if (isWhitespace(name))
			return invalid(400, { description, displayName, name: { missing: true } });

		if (typeof displayName !== "string")
			return invalid(400, { description, displayName: { invalid: true }, name });
		if (isWhitespace(displayName))
			return invalid(400, { description, displayName: { missing: true }, name });

		if (description) {
			if (typeof description !== "string" || isWhitespace(description))
				return invalid(400, { description: { invalid: true }, displayName, name });
		}

		const [updatedUser] = await updateUser(id, { name, displayName, description });
		if (updatedUser) throw redirect(303, `/${updatedUser.displayName}`);
		return error(500, { message: "Unable to Update Profile" });
	}
};

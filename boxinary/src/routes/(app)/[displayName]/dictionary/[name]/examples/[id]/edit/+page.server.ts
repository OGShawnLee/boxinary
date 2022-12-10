import type { Actions, PageServerLoad } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";
import { findExample, handleAuth, updateExample } from "@server/services";
import { handleBigint } from "@server/utils";
import { isWhitespace } from "@boxinary/predicate-core";

export const load: PageServerLoad = async ({
	cookies,
	params: { displayName, name, id: str_id }
}) => {
	await handleAuth(cookies, displayName);

	const id = handleBigint(str_id, "example-id");
	const [example, err] = await findExample(id, name);
	if (err) throw error(500, { message: "Unable to Get Example" });
	if (example) return { example };
	throw error(404, { message: "Example not Found" });
};

export const actions: Actions = {
	default: async ({ cookies, params: { displayName, name, id: str_id }, request }) => {
		await handleAuth(cookies, displayName);

		const data = await request.formData();
		const text = data.get("example");
		const source = data.get("source");

		if (typeof text !== "string") return fail(400, { text: { invalid: true }, source });
		if (isWhitespace(text)) return fail(400, { text: { missing: true }, source });

		if (source) {
			if (typeof source !== "string") return fail(400, { source: { invalid: true }, text });
			if (isWhitespace(text)) return fail(400, { source: { missing: true }, text });
		}

		const id = handleBigint(str_id, "example-id");
		const [initialExample, err] = await findExample(id, name);
		if (err) throw error(500, { message: "Unable to Update Example" });
		if (!initialExample)
			throw error(403, { message: "Example does not belong to this Definition" });

		const [example] = await updateExample(initialExample.id, { text, source });
		if (example) throw redirect(303, `/${displayName}/dictionary/${name}/examples`);
		throw error(500, { message: "Unable to Update Example" });
	}
};

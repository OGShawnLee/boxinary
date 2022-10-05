import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { findCollection } from "@server/services";

export const load: LayoutServerLoad = async ({ params: { displayName, id } }) => {
	if (Number.isNaN(+id)) throw error(400, { message: "Invalid Collection ID" });
	const [collection, err] = await findCollection(+id, displayName);
	if (collection) return { collection };
	if (err) throw error(500, { message: "Unable to Find Collection" });
	throw error(404, { message: "Collection not Found" });
};

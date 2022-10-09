import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { findCollection } from "@server/services";
import { handleNumber } from "@server/utils";

export const load: LayoutServerLoad = async ({ params: { displayName, id } }) => {
	const collectionid = handleNumber(id, "collection-id");
	const [collection, err] = await findCollection(collectionid, displayName);
	if (collection) return { collection };
	if (err) throw error(500, { message: "Unable to Find Collection" });
	throw error(404, { message: "Collection not Found" });
};

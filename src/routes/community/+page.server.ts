import type { ServerLoad } from "@sveltejs/kit";
import db from "$lib/db";
import { useAwait } from "$lib/hooks";
import { error } from "@sveltejs/kit";

export const load: ServerLoad = async () => {
	const [foundUsers] = await useAwait(() =>
		db.user.findMany({ select: { name: true, displayName: true, createdAt: true } })
	);
	if (foundUsers) return { foundUsers };
	throw error(500, { message: "Unable to Get Users" });
};

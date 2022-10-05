import type { Collection } from "@prisma/client";
import db from "$lib/db";
import { useAwait } from "$lib/hooks";

export function createCollection(
	uid: number,
	data: Pick<Collection, "name" | "shortDescription" | "longDescription">
) {
	return useAwait(() => db.collection.create({ data: { userId: uid, ...data } }));
}

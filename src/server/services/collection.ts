import type { Collection } from "@prisma/client";
import db from "$lib/db";
import { useAwait } from "$lib/hooks";

export function createCollection(
	uid: number,
	data: Pick<Collection, "name" | "shortDescription" | "longDescription">
) {
	return useAwait(() => db.collection.create({ data: { userId: uid, ...data } }));
}

export function findCollection(id: number, displayName: string) {
	return useAwait(() => db.collection.findFirst({ where: { id, user: { displayName } } }));
}

export function updateCollection(
	id: number,
	data: Pick<Collection, "name" | "shortDescription" | "longDescription">
) {
	return useAwait(() => db.collection.update({ where: { id }, data }));
}

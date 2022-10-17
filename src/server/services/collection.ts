import type { Collection } from "@prisma/client";
import db from "$lib/db";
import { useAwait } from "$lib/hooks";

export function addToCollection({
	collectionid,
	definitionid
}: {
	collectionid: number;
	definitionid: number;
}) {
	return useAwait(() =>
		db.definitionOnCollection.create({
			data: { collectionId: collectionid, definitionId: definitionid }
		})
	);
}

export function createCollection(
	uid: number,
	data: Pick<Collection, "name" | "description" | "details">
) {
	return useAwait(() => db.collection.create({ data: { userId: uid, ...data } }));
}

export function deleteCollection(id: number) {
	return useAwait(() => db.collection.delete({ where: { id } }));
}

export function findCollection(id: number, displayName: string) {
	return useAwait(() =>
		db.collection.findFirst({
			where: { id, user: { displayName } },
			include: {
				definitions: {
					include: { definition: true },
					orderBy: { createdAt: "desc" }
				}
			}
		})
	);
}

export function removeFromCollection({
	collectionid,
	definitionid
}: {
	collectionid: number;
	definitionid: number;
}) {
	return useAwait(() =>
		db.definitionOnCollection.delete({
			where: {
				definitionId_collectionId: { definitionId: definitionid, collectionId: collectionid }
			}
		})
	);
}

export function updateCollection(
	id: number,
	data: Pick<Collection, "name" | "description" | "details">
) {
	return useAwait(() => db.collection.update({ where: { id }, data }));
}

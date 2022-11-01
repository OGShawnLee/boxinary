import type { Definition, User } from "@prisma/client";
import db from "$lib/db";
import { useAwait } from "$lib/hooks";

export function createDefinition(
	uid: User["id"],
	data: Pick<Definition, "name" | "definition" | "description" | "summary">
) {
	const { name, definition, description, summary } = data;
	return useAwait(async () =>
		db.definition.create({ data: { userId: uid, name, definition, description, summary } })
	);
}

export function findDefinitionId(displayName: User["displayName"], name: Definition["name"]) {
	return useAwait(async () => {
		const definition = await db.definition.findFirst({ where: { user: { displayName }, name } });
		return definition?.id;
	});
}

export function findDefinitionExamplesPageData(
	displayName: User["displayName"],
	name: Definition["name"]
) {
	return useAwait(() =>
		db.example.findMany({
			where: { definition: { name, user: { displayName } } },
			include: { definition: { select: { name: true } } },
			orderBy: { createdAt: "desc" }
		})
	);
}

export function findDefinitionPageData(displayName: User["displayName"], name: Definition["name"]) {
	return useAwait(() =>
		db.definition.findFirst({
			where: { name, user: { displayName } },
			include: {
				user: { select: { displayName: true } },
				examples: {
					select: { text: true, source: true },
					orderBy: { createdAt: "desc" }
				},
				definitions: {
					select: { id: true, definition: true, example: true },
					orderBy: { createdAt: "desc" }
				}
			}
		})
	);
}

export function deleteDefinition(id: Definition["id"], inCollection: boolean) {
	return useAwait(async () => {
		if (inCollection) await db.definitionOnCollection.deleteMany({ where: { definitionId: id } });
		return db.definition.delete({ where: { id } });
	});
}

export function updateDefinition(
	id: Definition["id"],
	data: Pick<Definition, "definition" | "description" | "name" | "summary">
) {
	return useAwait(() => db.definition.update({ where: { id }, data }));
}

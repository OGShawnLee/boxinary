import type { Definition, Example, User } from "@prisma/client";
import db from "$lib/db";
import { useAwait } from "$lib/hooks";

export function addExample(
	did: Definition["id"],
	uid: User["id"],
	data: Pick<Example, "text" | "source">
) {
	return useAwait(() =>
		db.example.create({
			data: {
				definitionId: did,
				userId: uid,
				source: data.source,
				text: data.text
			}
		})
	);
}

export function deleteExample(id: Example["id"]) {
	return useAwait(() => db.example.delete({ where: { id } }));
}

export function findExample(id: Example["id"], name: Definition["name"]) {
	return useAwait(() =>
		db.example.findFirst({
			where: { id, definition: { name } },
			select: { id: true, text: true, source: true }
		})
	);
}

export function updateExample(id: Definition["id"], data: Pick<Example, "text" | "source">) {
	return useAwait(() => db.example.update({ where: { id }, data }));
}

import db from "$lib/db";
import { useAwait } from "$lib/hooks";

export function deleteDefinition(id: number, inCollection: boolean) {
	return useAwait(async () => {
		if (inCollection) await db.definitionOnCollection.deleteMany({ where: { definitionId: id } });
		return db.definition.delete({ where: { id } });
	});
}

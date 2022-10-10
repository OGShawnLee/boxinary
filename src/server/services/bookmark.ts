import db from "$lib/db";
import { useAwait } from "$lib/hooks";

export function createBookmark(definition_id: number, user_id: number) {
	return useAwait(() => db.bookmark.create({ data: { definition_id, user_id } }));
}

export function findBookmark(definition_id: number, user_id: number) {
	return useAwait(() => db.bookmark.findFirst({ where: { definition_id, user_id } }));
}

import type { Example } from "@prisma/client";
import db from "$lib/db";
import { useAwait } from "$lib/hooks";

export function deleteExample(id: bigint | number) {
	return useAwait(() => db.example.delete({ where: { id } }));
}

export function getExample(id: number, definitionTitle: string) {
	return useAwait(() =>
		db.example.findFirst({
			where: { id, definition: { title: definitionTitle } },
			select: { id: true, text: true, source: true }
		})
	);
}

export function updateExample(id: bigint | number, data: Pick<Example, "text" | "source">) {
	return useAwait(() => db.example.update({ where: { id }, data }));
}

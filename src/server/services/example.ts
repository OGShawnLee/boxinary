import type { Example } from "@prisma/client";
import db from "$lib/db";
import { useAwait } from "$lib/hooks";

export function deleteExample(id: bigint | number) {
	return useAwait(() => db.example.delete({ where: { id } }));
}

export function getExample(id: number, name: string) {
	return useAwait(() =>
		db.example.findFirst({
			where: { id, definition: { name } },
			select: { id: true, text: true, source: true }
		})
	);
}

export function updateExample(id: bigint | number, data: Pick<Example, "text" | "source">) {
	return useAwait(() => db.example.update({ where: { id }, data }));
}

import type { Definition } from "@prisma/client";
import { useAwait } from "$lib/hooks";
import { parse } from "devalue";

export function fetchDefinitionsByName(name: string) {
	return useAwait(async () => {
		const request = await fetch(`/dictionary/search?name=${name}`);
		const text = await request.text();
		return parse(text) as Array<Definition & { user: { displayName: string } }>;
	});
}

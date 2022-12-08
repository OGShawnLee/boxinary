import type { RequestHandler } from "./$types";
import { isWhitespace, isNullish } from "@boxinary/predicate-core";
import { stringify } from "devalue";
import { findDefinitionsByName } from "@server/services";
import { defineMessage } from "$lib/utils";

export const GET: RequestHandler = async (event) => {
	const name = event.url.searchParams.get("name");
	if (isNullish(name) || isWhitespace(name))
		return new Response(defineMessage("'name' query parameter is required."), { status: 400 });
	const [definitions] = await findDefinitionsByName(name);
	if (definitions) return new Response(stringify(definitions), { status: 200 });
	return new Response(defineMessage("Unable to Find Definitions."), { status: 500 });
};

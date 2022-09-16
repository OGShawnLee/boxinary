import db from "$lib/db";
import { ACCESS_TOKEN } from "$env/static/private";
import { useAwait } from "$lib/hooks";
import { exclude } from "$lib/utils";
import { verify } from "jsonwebtoken";
import { isJWTPayloadState } from "@root/server/validation";
import { error } from "@sveltejs/kit";

export function getUser(id: number) {
	return useAwait(() => db.user.findFirstOrThrow({ where: { id } }));
}

export async function getUserJWTTokenPayload(authStateCookie: string) {
	const authState = verify(authStateCookie, ACCESS_TOKEN);
	if (isJWTPayloadState(authState)) return authState;
	throw new Error("Invalid Auth Token");
}

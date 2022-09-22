import type { Cookies } from "@sveltejs/kit";
import type { Definition, User } from "@prisma/client";
import type { ClientUser } from "@root/app";
import db from "$lib/db";
import { ACCESS_TOKEN, AUTH_COOKIE } from "$env/static/private";
import { useAwait } from "$lib/hooks";
import { exclude } from "$lib/utils";
import { verify } from "jsonwebtoken";
import { isJWTPayloadState } from "@root/server/validation";
import { deleteAuthCookie } from "@root/server/utils";
import { error, redirect } from "@sveltejs/kit";
import { isEmpty, isString } from "malachite-ui/predicate";

export function createDefinition(
	authorId: number,
	data: Pick<Definition, "title" | "atomic" | "definition" | "description">
) {
	const { title, atomic, definition, description } = data;
	return useAwait(() =>
		db.definition.create({ data: { authorId, title, atomic, definition, description } })
	);
}

export function getDefinitionByTitle(displayName: string, title: string) {
	return useAwait(async () => {
		const def = await db.definition.findFirst({
			where: { author: { displayName }, title },
			include: { author: true }
		});
		return def ? { ...def, author: { displayName: def.author.displayName } } : null;
	});
}

export function getUser(id: number) {
	return useAwait(() => db.user.findFirstOrThrow({ where: { id } }));
}

export function getUserByDisplayName(displayName: string) {
	return useAwait(() => db.user.findFirst({ where: { displayName } }));
}

export function getUserDefinitions(displayName: string) {
	return useAwait(() =>
		db.definition.findMany({
			where: { author: { displayName } },
			select: { id: true, title: true, atomic: true, author: { select: { displayName: true } } },
			orderBy: { createdAt: "desc" }
		})
	);
}

export function getUserDefinitionsById(id: number) {
	return useAwait(() =>
		db.definition.findMany({
			where: { authorId: id },
			select: { id: true, title: true, atomic: true, author: { select: { displayName: true } } },
			orderBy: { createdAt: "desc" }
		})
	);
}

export async function getUserJWTTokenPayload(authStateCookie: string) {
	const authState = verify(authStateCookie, ACCESS_TOKEN);
	if (isJWTPayloadState(authState)) return authState;
	throw new Error("Invalid Auth Token");
}

export async function handleAuthState(cookies: Cookies) {
	const authStateCookie = cookies.get(AUTH_COOKIE);
	if (!isString(authStateCookie) || isEmpty(authStateCookie)) throw redirect(303, "/auth/sign-in");
	const [authState, err] = await useAwait(() => getUserJWTTokenPayload(authStateCookie));
	if (err || !authState) {
		deleteAuthCookie(cookies);
		throw redirect(303, "/auth/sign-in");
	}
	return authState;
}

export async function handleClientUser(id: number) {
	const [currentUser, err] = await useAwait(() => db.user.findUnique({ where: { id } }));
	if (err) throw error(500, { message: "Unable to Find User" });
	if (currentUser) return exclude(currentUser, "email", "password");
	throw error(404, { message: "User Not Found" });
}

export function updateUser(id: number, data: Partial<Omit<User, "id">>) {
	return useAwait<ClientUser>(async () => {
		const updatedUser = await db.user.update({ where: { id }, data });
		return exclude(updatedUser, "email", "password");
	});
}

import type { Cookies } from "@sveltejs/kit";
import type { Definition, User } from "@prisma/client";
import type { ClientUser } from "@root/app";
import type { Nullable } from "malachite-ui/types";
import db from "$lib/db";
import { ACCESS_TOKEN, AUTH_COOKIE } from "$env/static/private";
import { useAwait } from "$lib/hooks";
import { exclude } from "$lib/utils";
import { verify } from "jsonwebtoken";
import { isJWTPayloadState } from "@server/validation";
import { deleteAuthCookie } from "@server/utils";
import { error, redirect } from "@sveltejs/kit";
import { isEmpty, isString } from "malachite-ui/predicate";

export function addDefinitionExample(
	id: number,
	data: { uid: number; text: string; source: Nullable<string> }
) {
	const { uid, text, source } = data;
	return useAwait(() =>
		db.example.create({ data: { userId: uid, text, definitionId: id, source } })
	);
}

export function createDefinition(
	authorId: number,
	data: Pick<Definition, "title" | "atomic" | "definition" | "description">
) {
	const { title, atomic, definition, description } = data;
	return useAwait(() =>
		db.definition.create({ data: { authorId, title, atomic, definition, description } })
	);
}

export function deleteUserDefinition(definitionId: number) {
	return useAwait(() => db.definition.delete({ where: { id: definitionId } }));
}

export function getDefinitionByTitle(displayName: string, title: string) {
	return useAwait(() =>
		db.definition.findFirst({
			where: { author: { displayName }, title },
			select: {
				id: true,
				title: true,
				atomic: true,
				definition: true,
				description: true,
				createdAt: true,
				author: { select: { displayName: true } },
				examples: {
					select: { text: true, source: true },
					orderBy: { createdAt: "desc" },
					take: 3
				}
			}
		})
	);
}

export function getDefinitionExamples(definitionId: number) {
	return useAwait(() =>
		db.example.findMany({
			where: { definitionId },
			select: {
				id: true,
				text: true,
				source: true,
				createdAt: true,
				definition: { select: { title: true } }
			},
			orderBy: { createdAt: "desc" }
		})
	);
}

export function getDefinitionId(displayName: string, title: string) {
	return useAwait(async () => {
		const def = await db.definition.findFirst({
			where: { author: { displayName }, title },
			select: { id: true }
		});
		return def?.id;
	});
}

export function getUser(id: number) {
	return useAwait(() => db.user.findFirstOrThrow({ where: { id } }));
}

export function getUserByDisplayName(displayName: string) {
	return useAwait(() => db.user.findFirst({ where: { displayName } }));
}

export function getUserDashboard(id: number) {
	return useAwait(() =>
		db.user.findFirst({
			where: { id },
			select: {
				Definition: {
					select: {
						id: true,
						title: true,
						atomic: true,
						author: { select: { displayName: true } }
					},
					orderBy: { createdAt: "desc" }
				},
				examples: {
					select: {
						id: true,
						text: true,
						source: true,
						createdAt: true,
						definition: { select: { title: true } }
					},
					take: 4,
					orderBy: { createdAt: "desc" }
				}
			}
		})
	);
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

export function getUserExamples(uid: number) {
	return useAwait(() =>
		db.example.findMany({
			where: { userId: uid },
			select: {
				id: true,
				text: true,
				source: true,
				createdAt: true,
				definition: { select: { atomic: true, title: true } }
			},
			orderBy: { createdAt: "desc" }
		})
	);
}

export async function getUserJWTTokenPayload(authStateCookie: string) {
	const authState = verify(authStateCookie, ACCESS_TOKEN);
	if (isJWTPayloadState(authState)) return authState;
	throw new Error("Invalid Auth Token");
}

export function getUserProfileData(displayName: string) {
	return useAwait(async () => {
		const foundUser = await db.user.findFirst({
			where: { displayName },
			select: {
				id: true,
				name: true,
				displayName: true,
				createdAt: true,
				Definition: {
					select: { id: true, title: true, atomic: true },
					orderBy: { createdAt: "desc" }
				},
				examples: {
					select: {
						id: true,
						text: true,
						source: true,
						createdAt: true,
						definition: { select: { title: true } }
					},
					take: 4,
					orderBy: { createdAt: "desc" }
				}
			}
		});

		if (!foundUser) return null;

		return {
			foundUser: {
				id: foundUser.id,
				name: foundUser.name,
				displayName,
				createdAt: foundUser.createdAt
			},
			definitions: foundUser.Definition.map((definition) => {
				return { ...definition, author: { displayName } };
			}),
			examples: foundUser.examples
		};
	});
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

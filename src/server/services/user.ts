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
import { isEmpty, isNullish, isString } from "malachite-ui/predicate";

export function addDefinitionExample(
	id: number,
	data: { uid: User["id"]; text: string; source: Nullable<string> }
) {
	const { uid, text, source } = data;
	return useAwait(() =>
		db.example.create({ data: { userId: uid, text, definitionId: id, source } })
	);
}

export function createDefinition(
	userId: User["id"],
	data: Pick<Definition, "name" | "definition" | "description" | "summary">
) {
	const { name, definition, description, summary } = data;
	return useAwait(() =>
		db.definition.create({ data: { userId, name, definition, description, summary } })
	);
}

export function deleteUserDefinition(definitionId: number) {
	return useAwait(() => db.definition.delete({ where: { id: definitionId } }));
}

export function getAuthToken(cookies: Cookies) {
	const token = cookies.get(AUTH_COOKIE);
	return token ? getUserJWTTokenPayload(token) : undefined;
}

export function getDefinitionByName(displayName: string, name: string) {
	return useAwait(() =>
		db.definition.findFirst({
			where: { user: { displayName }, name },
			select: {
				id: true,
				name: true,
				definition: true,
				description: true,
				summary: true,
				createdAt: true,
				user: { select: { displayName: true } },
				examples: {
					select: { text: true, source: true },
					orderBy: { createdAt: "desc" },
					take: 3
				}
			}
		})
	);
}

export function findUserCoreData(displayName: string) {
	return useAwait(() =>
		db.user.findFirst({ where: { displayName }, select: { id: true, displayName: true } })
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
				definition: { select: { name: true } }
			},
			orderBy: { createdAt: "desc" }
		})
	);
}

export function getDefinitionId(displayName: string, name: string) {
	return useAwait(async () => {
		const def = await db.definition.findFirst({
			where: { user: { displayName }, name },
			select: { id: true }
		});
		return def?.id;
	});
}

export function getUser(id: User["id"]) {
	return useAwait(() => db.user.findFirstOrThrow({ where: { id } }));
}

export function getUserByDisplayName(displayName: string) {
	return useAwait(() => db.user.findFirst({ where: { displayName } }));
}

export function getUserDashboard(id: User["id"]) {
	return useAwait(() =>
		db.user.findFirst({
			where: { id },
			select: {
				bookmarks: {
					select: {
						createdAt: true,
						definition: {
							select: {
								id: true,
								createdAt: true,
								name: true,
								definition: true,
								user: { select: { displayName: true } }
							}
						}
					},
					orderBy: { createdAt: "desc" }
				},
				collections: {
					select: { id: true, name: true, description: true, createdAt: true },
					orderBy: { createdAt: "desc" }
				},
				definitions: {
					select: {
						id: true,
						name: true,
						definition: true,
						user: { select: { displayName: true } }
					},
					orderBy: { createdAt: "desc" }
				},
				examples: {
					select: {
						id: true,
						text: true,
						source: true,
						createdAt: true,
						definition: { select: { name: true } }
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
			where: { user: { displayName } },
			select: { id: true, name: true, definition: true, user: { select: { displayName: true } } },
			orderBy: { createdAt: "desc" }
		})
	);
}

export function getUserDefinitionsById(id: User["id"]) {
	return useAwait(() =>
		db.definition.findMany({
			where: { userId: id },
			select: { id: true, name: true, definition: true, user: { select: { displayName: true } } },
			orderBy: { createdAt: "desc" }
		})
	);
}

export function getUserExamples(uid: User["id"]) {
	return useAwait(() =>
		db.example.findMany({
			where: { userId: uid },
			select: {
				id: true,
				text: true,
				source: true,
				createdAt: true,
				definition: { select: { definition: true, name: true } }
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
				collections: {
					select: { id: true, name: true, createdAt: true, description: true },
					orderBy: { createdAt: "desc" }
				},
				definitions: {
					select: { id: true, name: true, definition: true },
					orderBy: { createdAt: "desc" }
				},
				examples: {
					select: {
						id: true,
						text: true,
						source: true,
						createdAt: true,
						definition: { select: { name: true } }
					},
					take: 4,
					orderBy: { createdAt: "desc" }
				}
			}
		});

		if (foundUser) {
			return {
				foundUser: {
					id: foundUser.id,
					name: foundUser.name,
					displayName,
					createdAt: foundUser.createdAt
				},
				definitions: foundUser.definitions.map((definition) => {
					return { ...definition, user: { displayName } };
				}),
				examples: foundUser.examples,
				collections: foundUser.collections
			};
		}

		return null;
	});
}

export async function handleAuth(
	cookies: Cookies,
	displayName: User["displayName"],
	isAction = false
) {
	const currentUser = await handleAuthState(cookies);

	const message = isAction ? "Action Denied" : "Access Denied";

	const [targetUser, err] = await findUserCoreData(displayName);
	if (err) throw error(500, { message: "Unable to Verify Authorisation" });
	if (isNullish(targetUser)) throw error(404, { message: "User not Found" });
	if (currentUser.displayName !== targetUser.displayName) throw error(403, { message });
	return targetUser;
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

export async function handleClientUser(id: User["id"]) {
	const [currentUser, err] = await useAwait(() => db.user.findUnique({ where: { id } }));
	if (err) throw error(500, { message: "Unable to Find User" });
	if (currentUser) return exclude(currentUser, "email", "password");
	throw error(404, { message: "User Not Found" });
}

export function updateUser(id: User["id"], data: Partial<Omit<User, "id">>) {
	return useAwait<ClientUser>(async () => {
		const updatedUser = await db.user.update({ where: { id }, data });
		return exclude(updatedUser, "email", "password");
	});
}

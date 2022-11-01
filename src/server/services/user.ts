import type { User } from "@prisma/client";
import type { ClientUser } from "@root/app";
import db from "$lib/db";
import { useAwait } from "$lib/hooks";
import { exclude, groupExamplesByDefinition } from "$lib/utils";
import { error } from "@sveltejs/kit";

export function findUserCoreData(displayName: string) {
	return useAwait(() =>
		db.user.findFirst({ where: { displayName }, select: { id: true, displayName: true } })
	);
}

export function findUser(id: User["id"]) {
	return useAwait(() => db.user.findFirst({ where: { id } }));
}

export function findUserExamples(displayName: User["displayName"]) {
	return useAwait(() =>
		db.example.findMany({
			where: { user: { displayName } },
			include: { definition: { select: { definition: true, name: true } } },
			orderBy: { createdAt: "desc" }
		})
	);
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
						definition: { select: { name: true, definition: true } }
					},
					take: 4,
					orderBy: { createdAt: "desc" }
				}
			}
		})
	);
}

export function getUserProfileData(displayName: string) {
	return useAwait(async () => {
		const foundUser = await db.user.findFirst({
			where: { displayName },
			select: {
				id: true,
				name: true,
				displayName: true,
				description: true,
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
						definition: { select: { name: true, definition: true } }
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
					description: foundUser.description,
					createdAt: foundUser.createdAt
				},
				definitions: foundUser.definitions.map((definition) => {
					return { ...definition, user: { displayName } };
				}),
				examples: groupExamplesByDefinition(foundUser.examples),
				collections: foundUser.collections
			};
		}

		return null;
	});
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

import type { Definition } from "@prisma/client";
import type { GameDefinition } from "@root/app";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { shuffle } from "$lib/utils";
import { useAwait } from "@root/lib/hooks";
import db from "@root/lib/db";

function findSession(collection_id: bigint, user_id: number) {
	return useAwait(() =>
		db.session.findFirst({
			where: { collection_id, user_id },
			include: {
				definitions: {
					include: { definition: true }
				}
			}
		})
	);
}

export const load: PageServerLoad = async ({ parent }) => {
	const { collection, foundUser } = await parent();

	const [session, err] = await findSession(collection.id, foundUser.id);
	if (session) return { session };
	if (err) throw error(500, { message: "Unable to Load Game." });

	const [newSession] = await useAwait(() => {
		db.session.create({
			data: {
				collection_id: collection.id,
				user_id: foundUser.id,
				current_definition_id: collection.definitions[0].definitionId,
				definitions: {
					createMany: {
						data: collection.definitions.map(({ definition }) => {
							return { definition_id: definition.id, initial_definition: definition.definition };
						})
					}
				}
			}
		});
	});

	if (collection.definitions.length < 5)
		throw error(400, { message: "Collection must contain at least 5 definitions." });
	return { session: createSession(collection.definitions) };
};

function createSession(items: { definition: Definition }[]) {
	const options = items.map(({ definition: { definition } }) => definition);
	const gameDefinitions: GameDefinition[] = [];

	for (let index = 0; index < items.length; index++) {
		const { definition } = items[index];
		const clearedOptions = options.filter((option) => option !== definition.definition).slice(0, 3);
		clearedOptions.push(definition.definition);
		(definition as GameDefinition).options = shuffle(clearedOptions);
		gameDefinitions.push(definition as GameDefinition);
	}

	return gameDefinitions;
}
